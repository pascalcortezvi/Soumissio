export const useSendOtp = () => {
  const supabase = useSupabaseClient();
  const isLoading = ref(false);
  const error = ref(null);

  const sendOtp = async (email) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin,
        },
      });

      if (otpError) throw otpError;

      return { success: true };
    } catch (err) {
      error.value = err.message || "Erreur lors de l'envoi du code OTP";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    sendOtp,
    isLoading: readonly(isLoading),
    error: readonly(error),
  };
};
