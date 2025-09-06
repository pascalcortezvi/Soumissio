export const useVerifyOtp = () => {
  const supabase = useSupabaseClient();
  const isLoading = ref(false);
  const error = ref(null);

  const verifyOtp = async (email, token) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: "email",
      });

      if (verifyError) throw verifyError;

      // Get account UUID for navigation
      try {
        const { data: accountData, error: accountError } = await supabase
          .from("accounts")
          .select("uuid")
          .eq("email", email)
          .maybeSingle();

        if (accountError) throw accountError;

        if (accountData?.uuid) {
          // Navigate to account page
          await navigateTo(`/account/${accountData.uuid}`);
        }
      } catch (accountErr) {
        console.warn("Could not redirect to account page:", accountErr);
        // Still return success even if navigation fails
      }

      return { success: true, user: data.user, session: data.session };
    } catch (err) {
      error.value = err.message || "Code OTP invalide";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    verifyOtp,
    isLoading: readonly(isLoading),
    error: readonly(error),
  };
};
