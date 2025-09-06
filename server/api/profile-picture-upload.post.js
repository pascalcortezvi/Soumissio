import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    // Get the service role client (bypasses RLS)
    const supabaseServiceRole = serverSupabaseServiceRole(event);

    // Parse the form data
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file provided",
      });
    }

    // Find file and userUuid from form data
    let file = null;
    let userUuid = null;

    formData.forEach((item) => {
      if (item.name === "file") {
        file = {
          data: item.data,
          filename: item.filename,
          type: item.type,
        };
      } else if (item.name === "userUuid") {
        userUuid = new TextDecoder().decode(item.data);
      }
    });

    if (!file || !userUuid) {
      throw createError({
        statusCode: 400,
        statusMessage: "File and userUuid are required",
      });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid file type. Only JPG and PNG are allowed.",
      });
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: "File too large. Maximum 2MB allowed.",
      });
    }

    // Verify user exists and get current profile picture info
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

    // Delete old profile picture from storage if it exists
    if (userData.pic_url && userData.pic_url.includes("account-pictures")) {
      const urlParts = userData.pic_url.split("/");
      const oldFileName = urlParts[urlParts.length - 1];

      // Try to delete old file (don't fail if it doesn't exist)
      await supabaseServiceRole.storage
        .from("account-pictures")
        .remove([oldFileName]);
    }

    // Generate unique filename
    const extension = file.filename.split(".").pop();
    const timestamp = Date.now();
    const fileName = `${userUuid}_${timestamp}.${extension}`;

    // Upload to Supabase Storage using service role
    const { data: uploadData, error: uploadError } =
      await supabaseServiceRole.storage
        .from("account-pictures")
        .upload(fileName, file.data, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        });

    if (uploadError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Upload failed: ${uploadError.message}`,
      });
    }

    // Get public URL
    const { data: publicUrlData } = supabaseServiceRole.storage
      .from("account-pictures")
      .getPublicUrl(fileName);

    if (!publicUrlData.publicUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to get public URL",
      });
    }

    // Update user's profile picture URL in database
    const { error: updateError } = await supabaseServiceRole
      .from("accounts")
      .update({ pic_url: publicUrlData.publicUrl })
      .eq("uuid", userUuid);

    if (updateError) {
      // Try to clean up the uploaded file if database update fails
      await supabaseServiceRole.storage
        .from("account-pictures")
        .remove([fileName]);

      throw createError({
        statusCode: 500,
        statusMessage: `Database update failed: ${updateError.message}`,
      });
    }

    return {
      success: true,
      url: publicUrlData.publicUrl,
      fileName: fileName,
    };
  } catch (error) {
    console.error("Profile picture upload error:", error);

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
