import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    // Get the service role client (bypasses RLS)
    const supabaseServiceRole = serverSupabaseServiceRole(event);

    // Parse the request body
    const body = await readBody(event);
    const { userUuid, currentPicUrl } = body;

    if (!userUuid) {
      throw createError({
        statusCode: 400,
        statusMessage: "userUuid is required",
      });
    }

    // Verify user exists
    const { data: userData, error: userError } = await supabaseServiceRole
      .from("accounts")
      .select("uuid, email, pic_url")
      .eq("uuid", userUuid)
      .single();

    if (userError || !userData) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    // Remove pic_url from accounts table
    const { error: updateError } = await supabaseServiceRole
      .from("accounts")
      .update({ pic_url: null })
      .eq("uuid", userUuid);

    if (updateError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Database update failed: ${updateError.message}`,
      });
    }

    // Extract filename from URL if it's a Supabase Storage URL
    let fileName = null;
    const urlToCheck = currentPicUrl || userData.pic_url;

    if (urlToCheck && urlToCheck.includes("account-pictures")) {
      const urlParts = urlToCheck.split("/");
      fileName = urlParts[urlParts.length - 1];
    }

    // Delete from storage if it's a storage file
    if (fileName) {
      const { error: deleteError } = await supabaseServiceRole.storage
        .from("account-pictures")
        .remove([fileName]);

      // Don't fail the whole operation if storage delete fails
      if (deleteError) {
        console.warn("Could not delete file from storage:", deleteError);
      }
    }

    return {
      success: true,
      message: "Profile picture deleted successfully",
    };
  } catch (error) {
    console.error("Profile picture delete error:", error);

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
