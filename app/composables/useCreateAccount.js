export const useCreateAccount = () => {
  const supabase = useSupabaseClient();
  const isLoading = ref(false);
  const error = ref(null);

  const createAccount = async (user, name) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: createError } = await supabase
        .from("accounts")
        .upsert(
          {
            uuid: user.id,
            email: user.email,
            name: name,
            tarif: 1,
            is_member: false,
            is_ban: false,
          },
          {
            onConflict: "uuid",
          }
        )
        .select()
        .single();

      if (createError) throw createError;

      return { success: true, account: data };
    } catch (err) {
      error.value = err.message || "Erreur lors de la création du compte";
      console.error("Error creating account record:", err);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    createAccount,
    isLoading: readonly(isLoading),
    error: readonly(error),
  };
};
