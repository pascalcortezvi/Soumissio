export const useUser = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // Simple computed properties for authentication status and email
  const isAuthenticated = computed(() => !!user.value);
  const userEmail = computed(() => user.value?.email || null);

  // Simple logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    // State
    user: readonly(user),

    // Computed
    isAuthenticated,
    userEmail,

    // Methods
    logout,
  };
};
