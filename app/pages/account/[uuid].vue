<script setup>
const route = useRoute();
const supabase = useSupabaseClient();
const { userEmail, isAuthenticated, logout } = useUser();

const accountUuid = route.params.uuid;

// Reactive state
const account = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Check if current user is viewing their own account
const isOwnAccount = computed(() => {
  return (
    account.value && userEmail.value && account.value.email === userEmail.value
  );
});

// Fetch account data
const fetchAccount = async () => {
  if (!accountUuid) {
    // Redirect to home if no UUID
    await navigateTo("/");
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;

    const { data, error: fetchError } = await supabase
      .from("accounts")
      .select("*")
      .eq("uuid", accountUuid)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!data) {
      // No account found - redirect to home
      await navigateTo("/");
      return;
    }

    account.value = data;
  } catch (err) {
    console.error("Error fetching account:", err);
    // For any other errors, also redirect to home
    await navigateTo("/");
  } finally {
    isLoading.value = false;
  }
};

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return "Non renseigné";
  return new Date(dateString).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get membership status text
const getMembershipStatus = (isMember) => {
  return isMember ? "Membre Premium" : "Membre Standard";
};

// Get account status text
const getAccountStatus = (isBan) => {
  return isBan ? "Compte suspendu" : "Compte actif";
};

// Get tarif display
const getTarifDisplay = (tarif) => {
  const tarifLabels = {
    1: "Débutant",
    2: "Intermédiaire",
    3: "Expert",
    4: "Senior",
  };
  return tarifLabels[tarif] || `Niveau ${tarif}`;
};

// Get user initials for avatar
const getUserInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

// Edit profile action
const editProfile = () => {
  alert("Fonctionnalité d'édition en développement!");
};

// Logout action
const handleLogout = async () => {
  const result = await logout();
  if (result.success) {
    await navigateTo("/");
  }
};

// Handle picture update
const handlePictureUpdate = (newPictureUrl) => {
  if (account.value) {
    account.value.pic_url = newPictureUrl;
  }
};

// Fetch data on mount
onMounted(() => {
  fetchAccount();
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"
        ></div>
        <p class="mt-4 text-neutral-600">Chargement du compte...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <Icon
          name="heroicons:exclamation-triangle"
          class="w-16 h-16 text-red-500 mx-auto mb-4"
        />
        <h2 class="text-2xl font-bold text-black mb-2">Erreur</h2>
        <p class="text-neutral-600 mb-4">{{ error }}</p>
        <button @click="fetchAccount" class="accent-button px-6 py-2">
          Réessayer
        </button>
      </div>
    </div>

    <!-- Account Data -->
    <div v-else-if="account">
      <!-- Page Header Section -->
      <PageHeader
        :title="account.name || 'Compte sans nom'"
        icon="material-symbols:account-circle"
        :description="`${getTarifDisplay(
          account.tarif
        )} • ${getMembershipStatus(
          account.is_member
        )} • Membre depuis ${formatDate(account.created_at)}`"
      />

      <div class="x-container py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Profile Overview -->
            <section class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="flex items-start gap-6">
                <!-- Profile Picture Manager -->
                <div class="flex-shrink-0">
                  <ProfilePictureManager
                    :account="account"
                    :is-own-account="isOwnAccount"
                    @picture-updated="handlePictureUpdate"
                  />
                </div>

                <!-- Profile Info -->
                <div class="flex-1">
                  <h1 class="text-2xl font-bold text-black mb-2">
                    {{ account.name || "Nom non renseigné" }}
                  </h1>
                  <p class="text-neutral-600 mb-4">{{ account.email }}</p>

                  <!-- Member Badge -->
                  <div v-if="account.is_member">
                    <span
                      class="inline-flex items-center gap-2 px-3 py-1 bg-main text-white text-sm rounded-full font-medium"
                    >
                      <Icon name="simple-icons:magic" class="w-4 h-4" />
                      Membre Premium
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Account Details -->
            <section class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="flex items-center gap-3 mb-4">
                <Icon
                  name="heroicons:information-circle"
                  class="w-6 h-6 text-accent"
                />
                <h2 class="text-xl font-bold text-black">Détails du compte</h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div class="text-sm text-neutral-600 mb-1">Nom</div>
                  <div class="font-medium">
                    {{ account.name || "Non renseigné" }}
                  </div>
                </div>

                <div>
                  <div class="text-sm text-neutral-600 mb-1">Email</div>
                  <div class="font-medium">{{ account.email }}</div>
                </div>

                <div>
                  <div class="text-sm text-neutral-600 mb-1">Genre</div>
                  <div class="font-medium">
                    {{ account.gender || "Non renseigné" }}
                  </div>
                </div>

                <div>
                  <div class="text-sm text-neutral-600 mb-1">
                    Spécialisation
                  </div>
                  <div class="font-medium">
                    {{ account.specialization || "Non renseignée" }}
                  </div>
                </div>

                <div>
                  <div class="text-sm text-neutral-600 mb-1">
                    Niveau tarifaire
                  </div>
                  <div class="font-medium">
                    {{ getTarifDisplay(account.tarif) }}
                  </div>
                </div>

                <div>
                  <div class="text-sm text-neutral-600 mb-1">Membre depuis</div>
                  <div class="font-medium">
                    {{ formatDate(account.created_at) }}
                  </div>
                </div>
              </div>
            </section>

            <!-- Account Status -->
            <section class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="flex items-center gap-3 mb-4">
                <Icon
                  name="heroicons:shield-check"
                  class="w-6 h-6 text-accent"
                />
                <h2 class="text-xl font-bold text-black">Statut du compte</h2>
              </div>

              <div class="space-y-4">
                <div
                  class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <div class="font-medium">Statut du compte</div>
                    <div class="text-sm text-neutral-600">
                      État général du compte
                    </div>
                  </div>
                  <span
                    :class="[
                      'px-3 py-1 text-sm rounded-full font-medium',
                      account.is_ban
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800',
                    ]"
                  >
                    {{ getAccountStatus(account.is_ban) }}
                  </span>
                </div>

                <div
                  class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <div class="font-medium">Membership</div>
                    <div class="text-sm text-neutral-600">
                      Niveau d'adhésion
                    </div>
                  </div>
                  <span
                    :class="[
                      'px-3 py-1 text-sm rounded-full font-medium',
                      account.is_member
                        ? 'bg-accent text-white'
                        : 'bg-neutral-200 text-neutral-700',
                    ]"
                  >
                    {{ getMembershipStatus(account.is_member) }}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Profile Actions -->
            <div
              class="bg-white border border-neutral-200 rounded-lg p-6 text-center"
            >
              <div class="mb-4">
                <div class="text-lg font-bold text-black mb-2">
                  {{ isOwnAccount ? "Mon compte" : "Profil" }}
                </div>
                <div class="text-sm text-neutral-600">{{ account.email }}</div>
              </div>

              <div v-if="isOwnAccount" class="space-y-3">
                <button @click="editProfile" class="w-full accent-button py-3">
                  <Icon name="heroicons:pencil" class="w-4 h-4 inline mr-2" />
                  Modifier le profil
                </button>
                <button class="w-full outline-button py-3">
                  <Icon
                    name="heroicons:cog-6-tooth"
                    class="w-4 h-4 inline mr-2"
                  />
                  Paramètres
                </button>
                <button
                  @click="handleLogout"
                  class="w-full outline-button py-3 text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                >
                  <Icon
                    name="heroicons:arrow-right-on-rectangle"
                    class="w-4 h-4 inline mr-2"
                  />
                  Déconnexion
                </button>
              </div>
            </div>

            <!-- Quick Info -->
            <div class="bg-white border border-neutral-200 rounded-lg p-6">
              <h3 class="flex items-center gap-2 font-bold text-black mb-4">
                <Icon
                  name="heroicons:identification"
                  class="w-5 h-5 text-accent"
                />
                Informations rapides
              </h3>

              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <Icon
                    name="heroicons:calendar"
                    class="w-5 h-5 text-neutral-400 mt-0.5"
                  />
                  <div>
                    <div class="text-sm text-neutral-600">Compte créé</div>
                    <div class="font-medium">
                      {{ formatDate(account.created_at) }}
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <Icon
                    name="heroicons:star"
                    class="w-5 h-5 text-neutral-400 mt-0.5"
                  />
                  <div>
                    <div class="text-sm text-neutral-600">Niveau</div>
                    <div class="font-medium">
                      {{ getTarifDisplay(account.tarif) }}
                    </div>
                  </div>
                </div>

                <div
                  v-if="account.specialization"
                  class="flex items-start gap-3"
                >
                  <Icon
                    name="heroicons:academic-cap"
                    class="w-5 h-5 text-neutral-400 mt-0.5"
                  />
                  <div>
                    <div class="text-sm text-neutral-600">Spécialisation</div>
                    <div class="font-medium">{{ account.specialization }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Membership Card -->
            <div
              v-if="account.is_member"
              class="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6"
            >
              <h3 class="flex items-center gap-2 font-bold text-black mb-4">
                <Icon name="heroicons:star" class="w-5 h-5 text-accent" />
                Membre Premium
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-sm">
                  <Icon name="heroicons:check" class="w-4 h-4 text-green-600" />
                  <span>Accès illimité aux experts</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <Icon name="heroicons:check" class="w-4 h-4 text-green-600" />
                  <span>Propositions sans limite</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <Icon name="heroicons:check" class="w-4 h-4 text-green-600" />
                  <span>Support prioritaire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
