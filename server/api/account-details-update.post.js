import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    // Get the service role client (bypasses RLS)
    const supabaseServiceRole = serverSupabaseServiceRole(event);

    // Parse the request body
    const body = await readBody(event);
    const { userUuid, gender, specialization } = body;

    if (!userUuid) {
      throw createError({
        statusCode: 400,
        statusMessage: "userUuid is required",
      });
    }

    // Validate gender if provided
    const validGenders = ["homme", "femme", "prefere_ne_pas_dire"];
    if (gender && !validGenders.includes(gender)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid gender value",
      });
    }

    // Validate specialization if provided
    const validSpecializations = [
      "developpement_web",
      "developpement_mobile",
      "developpement_full_stack",
      "developpement_front_end",
      "developpement_back_end",
      "devops",
      "cybersecurite",
      "data_science",
      "intelligence_artificielle",
      "machine_learning",
      "designer_ux_ui",
      "administrateur_systeme",
      "chef_de_projet_it",
      "architecture_logicielle",
      "cloud_computing",
      "bases_de_donnees",
      "reseaux_telecommunications",
      "business_intelligence",
      "marketing_digital",
      "seo_sem",
      "e_commerce",
      "developpement_jeux_video",
      "support_technique",
      "consultant_it",
      "formation_it",
      "analyseur_affaires",
      "testeur_qa",
      "securite_informatique",
      "integration_systemes",
    ];

    if (specialization && !validSpecializations.includes(specialization)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid specialization value",
      });
    }

    // Verify user exists
    const { data: userData, error: userError } = await supabaseServiceRole
      .from("accounts")
      .select("uuid, email")
      .eq("uuid", userUuid)
      .single();

    if (userError || !userData) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    // Prepare update data
    const updateData = {};
    if (gender !== undefined) updateData.gender = gender || null;
    if (specialization !== undefined)
      updateData.specialization = specialization || null;

    // Update the account details
    const { data: updatedData, error: updateError } = await supabaseServiceRole
      .from("accounts")
      .update(updateData)
      .eq("uuid", userUuid)
      .select("gender, specialization")
      .single();

    if (updateError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Update failed: ${updateError.message}`,
      });
    }

    return {
      success: true,
      gender: updatedData.gender,
      specialization: updatedData.specialization,
      message: "Account details updated successfully",
    };
  } catch (error) {
    console.error("Account details update error:", error);

    if (error.statusCode) {
      // Re-throw HTTP errors
      throw error;
    }

    // Generic server error
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Internal server error",
    });
  }
});
