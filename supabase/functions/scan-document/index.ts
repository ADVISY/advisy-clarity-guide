import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Document types we can detect
const DOC_TYPES = ['police', 'offre', 'avenant', 'resiliation', 'attestation', 'autre'] as const;

// Fields to extract based on form type
const EXTRACTION_FIELDS = {
  client: ['nom', 'prenom', 'date_naissance', 'email', 'telephone', 'adresse', 'npa', 'localite', 'canton', 'nationalite'],
  contract: ['compagnie', 'numero_police', 'type_produit', 'categorie', 'date_debut', 'date_fin', 'duree_contrat'],
  premium: ['prime_mensuelle', 'prime_annuelle', 'franchise'],
  guarantees: ['garanties_principales'],
};

interface ExtractionResult {
  field_category: string;
  field_name: string;
  extracted_value: string | null;
  confidence: 'high' | 'medium' | 'low';
  confidence_score: number;
  extraction_notes?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const body = await req.json();
    const { scanId, formType, tenantId, batchMode, files, fileKey, fileName, mimeType } = body;

    if (!scanId) {
      throw new Error("Missing required parameter: scanId");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update scan status to processing
    await supabase
      .from("document_scans")
      .update({ status: "processing", updated_at: new Date().toISOString() })
      .eq("id", scanId);

    // Determine files to process
    const filesToProcess: { path: string; fileName: string; mimeType: string }[] = batchMode && files 
      ? files 
      : [{ path: fileKey, fileName, mimeType }];

    console.log(`Processing ${filesToProcess.length} files in ${batchMode ? 'batch' : 'single'} mode`);

    // Download and encode all files
    const fileContents: { fileName: string; base64: string; mimeType: string }[] = [];
    
    for (const fileInfo of filesToProcess) {
      const { data: fileData, error: downloadError } = await supabase.storage
        .from("documents")
        .download(fileInfo.path);

      if (downloadError || !fileData) {
        console.error(`Failed to download ${fileInfo.fileName}:`, downloadError);
        continue;
      }

      const arrayBuffer = await fileData.arrayBuffer();
      const base64File = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      
      fileContents.push({
        fileName: fileInfo.fileName,
        base64: base64File,
        mimeType: fileInfo.mimeType || 'application/pdf'
      });
    }

    if (fileContents.length === 0) {
      throw new Error("No files could be processed");
    }

    // Build the prompt for document analysis
    const systemPrompt = `Tu es un expert en analyse de documents d'assurance suisses. Tu reçois un dossier complet de ${fileContents.length} document(s). Tu dois:

1. Analyser TOUS les documents ensemble comme un dossier unique
2. Classifier le type principal de dossier parmi: ${DOC_TYPES.join(', ')}
3. Extraire et CONSOLIDER toutes les informations de TOUS les documents
4. Pour chaque champ, indiquer la source (quel document) si pertinent
5. Retourner les données dans un format JSON structuré

RÈGLES IMPORTANTES:
- Si une information apparaît dans plusieurs documents, prendre la plus récente ou la plus complète
- Croiser les informations pour valider (ex: nom du client doit être cohérent)
- Signaler les incohérences détectées entre documents

Pour chaque champ extrait, indique:
- La valeur trouvée (consolidée si plusieurs sources)
- Le niveau de confiance (high si clairement lisible et cohérent, medium si partiellement visible, low si incertain ou incohérent)
- Le document source principal
- Une note explicative si nécessaire

Types de produits d'assurance suisses:
- LAMal: Assurance maladie obligatoire
- LCA: Assurance complémentaire
- VIE: Assurance vie/prévoyance/3e pilier
- NON-VIE: RC, ménage, auto, etc.
- LAA: Assurance accidents
- LPP: Prévoyance professionnelle

Réponds UNIQUEMENT en JSON valide avec cette structure:
{
  "document_type": "police|offre|avenant|resiliation|attestation|autre",
  "document_type_confidence": 0.95,
  "quality_score": 0.9,
  "documents_analyzed": ["police.pdf", "attestation.pdf"],
  "inconsistencies": ["Adresse différente entre police et attestation"],
  "fields": [
    {
      "category": "client|contract|premium|guarantees",
      "name": "nom",
      "value": "Dupont",
      "confidence": "high",
      "confidence_score": 0.95,
      "source_document": "police.pdf",
      "notes": "Nom confirmé sur 2 documents"
    }
  ]
}`;

    const documentsDescription = fileContents.map((f, i) => 
      `Document ${i + 1}: ${f.fileName}`
    ).join('\n');

    const userPrompt = `Analyse ce dossier d'assurance complet${formType ? ` (formulaire ${formType.toUpperCase()})` : ''} et extrait TOUTES les informations en les consolidant.

DOCUMENTS DU DOSSIER:
${documentsDescription}

Champs à extraire et consolider:
- Client: nom, prénom, date de naissance, email, téléphone, adresse, NPA, localité, canton, nationalité
- Contrat: compagnie d'assurance, numéro de police, type de produit (LAMal/LCA/VIE/NON-VIE/LAA/LPP), date début, date fin, durée
- Primes: prime mensuelle, prime annuelle, franchise
- Garanties: liste des garanties principales

IMPORTANT: Consolide les informations de TOUS les documents. Signale les incohérences.

Retourne UNIQUEMENT le JSON, sans texte additionnel.`;

    // Build messages with all document images
    const userContent: any[] = [
      { type: "text", text: userPrompt }
    ];

    for (const fileContent of fileContents) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: `data:${fileContent.mimeType};base64,${fileContent.base64}`,
        },
      });
    }

    // Call Lovable AI Gateway with vision
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        max_tokens: 8000,
        temperature: 0.1,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        throw new Error("Trop de requêtes. Réessayez dans quelques instants.");
      }
      if (aiResponse.status === 402) {
        throw new Error("Crédits IA insuffisants. Contactez l'administrateur.");
      }
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;

    if (!aiContent) {
      throw new Error("No response from AI");
    }

    // Parse AI response
    let parsedResult: {
      document_type: string;
      document_type_confidence: number;
      quality_score: number;
      documents_analyzed?: string[];
      inconsistencies?: string[];
      fields: Array<{
        category: string;
        name: string;
        value: string;
        confidence: 'high' | 'medium' | 'low';
        confidence_score: number;
        source_document?: string;
        notes?: string;
      }>;
    };

    try {
      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = aiContent;
      const jsonMatch = aiContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      parsedResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiContent);
      throw new Error("Failed to parse AI analysis result");
    }

    // Calculate overall confidence
    const confidenceScores = parsedResult.fields.map(f => f.confidence_score);
    const overallConfidence = confidenceScores.length > 0
      ? confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length
      : 0;

    const processingTime = Date.now() - startTime;

    // Update scan record with results
    const { error: updateError } = await supabase
      .from("document_scans")
      .update({
        status: "completed",
        detected_doc_type: parsedResult.document_type,
        doc_type_confidence: parsedResult.document_type_confidence,
        quality_score: parsedResult.quality_score,
        overall_confidence: overallConfidence,
        ocr_required: true,
        processing_time_ms: processingTime,
        ai_model_used: "google/gemini-2.5-flash",
        updated_at: new Date().toISOString(),
      })
      .eq("id", scanId);

    if (updateError) {
      console.error("Failed to update scan:", updateError);
    }

    // Insert extracted fields
    const fieldsToInsert = parsedResult.fields.map(field => ({
      scan_id: scanId,
      field_category: field.category,
      field_name: field.name,
      extracted_value: field.value,
      confidence: field.confidence,
      confidence_score: field.confidence_score,
      extraction_notes: [
        field.source_document ? `Source: ${field.source_document}` : null,
        field.notes
      ].filter(Boolean).join(' | ') || null,
    }));

    if (fieldsToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from("document_scan_results")
        .insert(fieldsToInsert);

      if (insertError) {
        console.error("Failed to insert results:", insertError);
      }
    }

    // Create audit log
    await supabase.rpc("create_scan_audit_log", {
      p_scan_id: scanId,
      p_action: "extracted",
      p_ai_snapshot: {
        ...parsedResult,
        batch_mode: batchMode,
        files_count: fileContents.length
      },
    });

    // Increment tenant AI docs usage
    if (tenantId) {
      await supabase.rpc("increment_tenant_consumption", {
        p_tenant_id: tenantId,
        p_type: "ai_docs",
        p_amount: fileContents.length, // Count each document
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        scanId,
        documentType: parsedResult.document_type,
        documentTypeConfidence: parsedResult.document_type_confidence,
        qualityScore: parsedResult.quality_score,
        overallConfidence,
        documentsProcessed: fileContents.length,
        inconsistencies: parsedResult.inconsistencies || [],
        fieldsExtracted: fieldsToInsert.length,
        processingTimeMs: processingTime,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Scan document error:", error);

    // Try to update scan status to failed
    try {
      const { scanId } = await req.clone().json();
      if (scanId) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        await supabase
          .from("document_scans")
          .update({
            status: "failed",
            error_message: error instanceof Error ? error.message : "Unknown error",
            updated_at: new Date().toISOString(),
          })
          .eq("id", scanId);
      }
    } catch (e) {
      console.error("Failed to update scan status:", e);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
