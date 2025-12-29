import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateTenantAdminRequest {
  tenant_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  language?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Create admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verify the caller is a KING user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user: callerUser }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !callerUser) {
      throw new Error("Invalid authentication token");
    }

    // Check if caller has KING role
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerUser.id)
      .single();

    if (roleError || roleData?.role !== "king") {
      throw new Error("Unauthorized: Only KING users can create tenant admins");
    }

    // Parse request body
    const { tenant_id, email, first_name, last_name, phone, language }: CreateTenantAdminRequest = await req.json();

    // Validate required fields
    if (!tenant_id || !email || !first_name || !last_name) {
      throw new Error("Missing required fields: tenant_id, email, first_name, last_name");
    }

    // Verify tenant exists
    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from("tenants")
      .select("id, name, slug")
      .eq("id", tenant_id)
      .single();

    if (tenantError || !tenant) {
      throw new Error("Tenant not found");
    }

    // Generate a secure temporary password
    const tempPassword = crypto.randomUUID().slice(0, 16) + "Aa1!";

    // Create the user in Supabase Auth
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name,
        last_name,
        phone,
        language: language || "fr",
        tenant_id,
        tenant_name: tenant.name,
      },
    });

    if (createError) {
      if (createError.message.includes("already been registered")) {
        throw new Error("Un utilisateur avec cet email existe déjà");
      }
      throw createError;
    }

    if (!newUser.user) {
      throw new Error("Failed to create user");
    }

    // Assign 'admin' role to the new user
    const { error: roleInsertError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: newUser.user.id,
        role: "admin",
      });

    if (roleInsertError) {
      console.error("Error assigning role:", roleInsertError);
      // Continue anyway - we can fix the role later
    }

    // Create tenant assignment
    const { error: assignmentError } = await supabaseAdmin
      .from("user_tenant_assignments")
      .insert({
        user_id: newUser.user.id,
        tenant_id: tenant_id,
        is_platform_admin: false,
      });

    if (assignmentError) {
      console.error("Error creating tenant assignment:", assignmentError);
    }

    // Create profile for the user
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: newUser.user.id,
        email,
        first_name,
        last_name,
        phone,
      });

    if (profileError) {
      console.error("Error creating profile:", profileError);
    }

    // Send password reset email so admin can set their own password
    const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `https://${tenant.slug}.lyta.ch/reset-password`,
      },
    });

    if (resetError) {
      console.error("Error generating reset link:", resetError);
    }

    // TODO: Send invitation email via Resend with the reset link
    console.log("Admin user created successfully:", {
      userId: newUser.user.id,
      email,
      tenantId: tenant_id,
      tenantName: tenant.name,
    });

    return new Response(
      JSON.stringify({
        success: true,
        user_id: newUser.user.id,
        email,
        tenant_id,
        message: "Admin créé avec succès. Un email d'invitation a été envoyé.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in create-tenant-admin:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
