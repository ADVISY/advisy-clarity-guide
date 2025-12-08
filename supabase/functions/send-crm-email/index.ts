import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  contractDetails?: string;
  companyName?: string;
  agentName?: string;
  temporaryPassword?: string;
  loginUrl?: string;
  clientEmail?: string;
}

interface EmailRequest {
  type: "welcome" | "contract_signed" | "mandat_signed" | "account_created";
  clientEmail: string;
  clientName: string;
  data?: EmailData;
}

// Send email via Resend API
const sendEmail = async (to: string, subject: string, html: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Advisy <noreply@advisy.ch>",
      to: [to],
      subject,
      html,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
  
  return await response.json();
};

// Email templates
const getEmailContent = (type: string, clientName: string, data?: EmailData) => {
  switch (type) {
    case "welcome":
      return {
        subject: "Bienvenue chez Advisy - Votre partenaire assurance",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: linear-gradient(135deg, #1800AD 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #1800AD; margin-bottom: 20px; }
              .content p { margin-bottom: 15px; color: #555; }
              .highlight-box { background: #f0f4ff; border-left: 4px solid #1800AD; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
              .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; }
              .footer a { color: #1800AD; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Bienvenue chez Advisy</h1>
              </div>
              <div class="content">
                <h2>Bonjour ${clientName},</h2>
                <p>Nous sommes ravis de vous accueillir parmi nos clients !</p>
                <div class="highlight-box">
                  <strong>Votre conseiller Advisy</strong> est désormais à votre disposition pour vous accompagner dans toutes vos démarches d'assurance en Suisse.
                </div>
                <p>Chez Advisy, nous nous engageons à :</p>
                <ul>
                  <li>Analyser vos besoins en assurance</li>
                  <li>Comparer les meilleures offres du marché</li>
                  <li>Vous accompagner dans vos démarches administratives</li>
                  <li>Optimiser vos primes d'assurance</li>
                </ul>
                <p>Votre conseiller vous contactera prochainement pour planifier un premier entretien.</p>
                <p>À très bientôt,</p>
                <p><strong>L'équipe Advisy</strong></p>
              </div>
              <div class="footer">
                <p>Advisy Sàrl - Votre partenaire assurance en Suisse</p>
                <p><a href="https://advisy.ch">www.advisy.ch</a> | contact@advisy.ch</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    case "contract_signed":
      return {
        subject: "Confirmation de signature - Votre contrat Advisy",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: linear-gradient(135deg, #1800AD 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #1800AD; margin-bottom: 20px; }
              .content p { margin-bottom: 15px; color: #555; }
              .success-box { background: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
              .details-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; }
              .details-box h3 { margin-top: 0; color: #1800AD; }
              .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; }
              .footer a { color: #1800AD; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✓ Contrat signé avec succès</h1>
              </div>
              <div class="content">
                <h2>Bonjour ${clientName},</h2>
                <div class="success-box">
                  <strong>Félicitations !</strong> Votre contrat a été signé avec succès.
                </div>
                ${data?.contractDetails ? `
                <div class="details-box">
                  <h3>Détails du contrat</h3>
                  <p>${data.contractDetails}</p>
                  ${data.companyName ? `<p><strong>Compagnie :</strong> ${data.companyName}</p>` : ''}
                </div>
                ` : ''}
                <p>Votre contrat est maintenant actif. Vous recevrez prochainement votre police d'assurance par courrier.</p>
                <p>Si vous avez des questions, n'hésitez pas à contacter votre conseiller${data?.agentName ? ` <strong>${data.agentName}</strong>` : ''}.</p>
                <p>Cordialement,</p>
                <p><strong>L'équipe Advisy</strong></p>
              </div>
              <div class="footer">
                <p>Advisy Sàrl - Votre partenaire assurance en Suisse</p>
                <p><a href="https://advisy.ch">www.advisy.ch</a> | contact@advisy.ch</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    case "mandat_signed":
      return {
        subject: "Mandat de gestion signé - Bienvenue dans votre espace client Advisy",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: linear-gradient(135deg, #1800AD 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #1800AD; margin-bottom: 20px; }
              .content p { margin-bottom: 15px; color: #555; }
              .success-box { background: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
              .credentials-box { background: #fff3cd; border: 2px solid #ffc107; padding: 25px; border-radius: 8px; margin: 25px 0; }
              .credentials-box h3 { margin-top: 0; color: #856404; }
              .credentials-box .credential { background: white; padding: 10px 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; font-size: 16px; }
              .cta-button { display: inline-block; background: #1800AD; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
              .warning { color: #856404; font-size: 13px; margin-top: 15px; }
              .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; }
              .footer a { color: #1800AD; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Mandat de gestion activé</h1>
              </div>
              <div class="content">
                <h2>Bonjour ${clientName},</h2>
                <div class="success-box">
                  <strong>Votre mandat de gestion a été signé avec succès !</strong><br>
                  Advisy est désormais mandaté pour gérer votre portefeuille d'assurances.
                </div>
                <p>Nous avons créé votre espace client personnel. Vous pouvez désormais :</p>
                <ul>
                  <li>Consulter tous vos contrats d'assurance</li>
                  <li>Télécharger vos documents</li>
                  <li>Contacter votre conseiller</li>
                  <li>Suivre vos demandes en cours</li>
                </ul>
                <div class="credentials-box">
                  <h3>🔐 Vos identifiants de connexion</h3>
                  <p><strong>Email :</strong></p>
                  <div class="credential">${data?.clientEmail || ''}</div>
                  <p><strong>Mot de passe temporaire :</strong></p>
                  <div class="credential">${data?.temporaryPassword || 'Voir email séparé'}</div>
                  <p class="warning">⚠️ Pour votre sécurité, veuillez changer votre mot de passe lors de votre première connexion.</p>
                </div>
                <center>
                  <a href="${data?.loginUrl || 'https://advisy.ch/connexion'}" class="cta-button">Accéder à mon espace client</a>
                </center>
                <p>Si vous avez des questions, notre équipe est à votre disposition.</p>
                <p>Cordialement,</p>
                <p><strong>L'équipe Advisy</strong></p>
              </div>
              <div class="footer">
                <p>Advisy Sàrl - Votre partenaire assurance en Suisse</p>
                <p><a href="https://advisy.ch">www.advisy.ch</a> | contact@advisy.ch</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    case "account_created":
      return {
        subject: "Votre compte Advisy a été créé",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: linear-gradient(135deg, #1800AD 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #1800AD; margin-bottom: 20px; }
              .credentials-box { background: #e8f4fd; border: 2px solid #1800AD; padding: 25px; border-radius: 8px; margin: 25px 0; }
              .credentials-box h3 { margin-top: 0; color: #1800AD; }
              .credentials-box .credential { background: white; padding: 10px 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; font-size: 16px; border: 1px solid #ddd; }
              .cta-button { display: inline-block; background: #1800AD; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
              .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; }
              .footer a { color: #1800AD; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Votre compte est prêt</h1>
              </div>
              <div class="content">
                <h2>Bonjour ${clientName},</h2>
                <p>Votre compte client Advisy a été créé avec succès.</p>
                <div class="credentials-box">
                  <h3>🔐 Vos identifiants</h3>
                  <p><strong>Email :</strong></p>
                  <div class="credential">${data?.clientEmail || ''}</div>
                  <p><strong>Mot de passe temporaire :</strong></p>
                  <div class="credential">${data?.temporaryPassword || ''}</div>
                </div>
                <center>
                  <a href="${data?.loginUrl || 'https://advisy.ch/connexion'}" class="cta-button">Se connecter</a>
                </center>
                <p>Changez votre mot de passe après votre première connexion pour sécuriser votre compte.</p>
                <p>Cordialement,</p>
                <p><strong>L'équipe Advisy</strong></p>
              </div>
              <div class="footer">
                <p>Advisy Sàrl - Votre partenaire assurance en Suisse</p>
                <p><a href="https://advisy.ch">www.advisy.ch</a> | contact@advisy.ch</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    default:
      return {
        subject: "Notification Advisy",
        html: `<p>Bonjour ${clientName},</p><p>Vous avez une nouvelle notification d'Advisy.</p>`,
      };
  }
};

// Generate secure temporary password
const generateTemporaryPassword = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, clientEmail, clientName, data }: EmailRequest = await req.json();

    console.log(`Processing email request: type=${type}, email=${clientEmail}, name=${clientName}`);

    if (!clientEmail || !clientName || !type) {
      throw new Error("Missing required fields: type, clientEmail, clientName");
    }

    let emailData: EmailData = data || {};
    let createdUserId: string | null = null;

    // If mandat signed, create user account first
    if (type === "mandat_signed" && !data?.temporaryPassword) {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { autoRefreshToken: false, persistSession: false } }
      );

      const temporaryPassword = generateTemporaryPassword();
      
      // Check if user already exists
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find((u: { email?: string }) => u.email === clientEmail);

      if (!existingUser) {
        // Create new user account
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: clientEmail,
          password: temporaryPassword,
          email_confirm: true,
          user_metadata: {
            first_name: clientName.split(' ')[0],
            last_name: clientName.split(' ').slice(1).join(' ') || '',
          },
        });

        if (createError) {
          console.error("Error creating user:", createError);
          throw new Error(`Failed to create user account: ${createError.message}`);
        }

        createdUserId = newUser?.user?.id || null;

        // Assign 'client' role
        if (createdUserId) {
          const { error: roleError } = await supabaseAdmin
            .from('user_roles')
            .insert({ user_id: createdUserId, role: 'client' });

          if (roleError) {
            console.error("Error assigning role:", roleError);
          }

          // Link to existing client record if exists
          const { data: clientRecord } = await supabaseAdmin
            .from('clients')
            .select('id')
            .eq('email', clientEmail)
            .single();

          if (clientRecord) {
            await supabaseAdmin
              .from('clients')
              .update({ user_id: createdUserId })
              .eq('id', clientRecord.id);
          }
        }

        emailData = {
          ...emailData,
          temporaryPassword,
          clientEmail,
          loginUrl: `${Deno.env.get("SITE_URL") || "https://advisy.ch"}/connexion`,
        };

        console.log(`User account created for ${clientEmail}`);
      } else {
        console.log(`User already exists for ${clientEmail}, skipping account creation`);
        emailData = {
          ...emailData,
          clientEmail,
          loginUrl: `${Deno.env.get("SITE_URL") || "https://advisy.ch"}/connexion`,
        };
      }
    }

    // Get email content
    const { subject, html } = getEmailContent(type, clientName, emailData);

    // Send email via Resend
    const emailResponse = await sendEmail(clientEmail, subject, html);

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.id,
        userCreated: createdUserId !== null,
        userId: createdUserId,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error in send-crm-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
