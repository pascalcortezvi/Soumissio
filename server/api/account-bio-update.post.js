import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    // Get the service role client (bypasses RLS)
    const supabaseServiceRole = serverSupabaseServiceRole(event);

    // Parse the request body
    const body = await readBody(event);
    const { userUuid, bio } = body;

    if (!userUuid) {
      throw createError({
        statusCode: 400,
        statusMessage: "userUuid is required",
      });
    }

    // Validate bio
    const trimmedBio = bio ? bio.trim() : null;
    if (trimmedBio && trimmedBio.length > 1000) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bio must be less than 1000 characters",
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

    // Update the account bio
    const { data: updatedData, error: updateError } = await supabaseServiceRole
      .from("accounts")
      .update({ bio: trimmedBio })
      .eq("uuid", userUuid)
      .select("bio")
      .single();

    if (updateError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Update failed: ${updateError.message}`,
      });
    }

    return {
      success: true,
      bio: updatedData.bio,
      message: "Bio updated successfully",
    };
  } catch (error) {
    console.error("Bio update error:", error);

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
