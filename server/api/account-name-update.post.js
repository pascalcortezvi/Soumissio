import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    // Get the service role client (bypasses RLS)
    const supabaseServiceRole = serverSupabaseServiceRole(event);

    // Parse the request body
    const body = await readBody(event);
    const { userUuid, name } = body;

    if (!userUuid || !name) {
      throw createError({
        statusCode: 400,
        statusMessage: "userUuid and name are required",
      });
    }

    // Validate name
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      throw createError({
        statusCode: 400,
        statusMessage: "Name must be at least 2 characters long",
      });
    }

    if (trimmedName.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: "Name must be less than 100 characters",
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

    // Update the account name
    const { data: updatedData, error: updateError } = await supabaseServiceRole
      .from("accounts")
      .update({ name: trimmedName })
      .eq("uuid", userUuid)
      .select("name")
      .single();

    if (updateError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Update failed: ${updateError.message}`,
      });
    }

    return {
      success: true,
      name: updatedData.name,
      message: "Name updated successfully",
    };
  } catch (error) {
    console.error("Name update error:", error);

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
