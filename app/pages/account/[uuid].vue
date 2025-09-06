<script setup>
const route = useRoute();
const supabase = useSupabaseClient();
const { userEmail, isAuthenticated, logout } = useUser();
const { showSuccess, showError } = useToast();

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
    3: "",
    4: "Senior",
  };
  return tarifLabels[tarif] || `Niveau ${tarif}`;
};

// Get tarif symbols
const getTarifSymbols = (tarif) => {
  const symbols = {
    1: "$",
    2: "$$",
    3: "$$$",
  };
  return symbols[tarif] || "";
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
    showSuccess("Sauvegardé!");
  }
};

// Handle account deletion
const handleAccountDeleted = async () => {
  // Redirect to home page after account deletion
  await navigateTo("/");
};

// Edit modals state
const showEditName = ref(false);
const showEditBio = ref(false);
const showEditDetails = ref(false);

// Edit form data
const editForm = ref({
  name: "",
  bio: "",
  gender: "",
  specialization: "",
});

// Open edit modals
const openEditName = () => {
  editForm.value.name = account.value.name || "";
  showEditName.value = true;
};

const openEditBio = () => {
  editForm.value.bio = account.value.bio || "";
  showEditBio.value = true;
};

const openEditDetails = () => {
  editForm.value.gender = account.value.gender || "";
  editForm.value.specialization = account.value.specialization || "";
  showEditDetails.value = true;
};

// Close edit modals
const closeEditModals = () => {
  showEditName.value = false;
  showEditBio.value = false;
  showEditDetails.value = false;
};

// Handle form submissions
const handleNameUpdate = async () => {
  if (!editForm.value.name.trim()) {
    showError("Le nom ne peut pas être vide");
    return;
  }

  try {
    const response = await $fetch("/api/account-name-update", {
      method: "POST",
      body: {
        userUuid: account.value.uuid,
        name: editForm.value.name.trim(),
      },
    });

    if (response.success) {
      account.value.name = response.name;
      closeEditModals();
      showSuccess("Sauvegardé!");
    }
  } catch (error) {
    console.error("Error updating name:", error);
    showError(
      "Erreur lors de la mise à jour du nom: " +
        (error.data?.statusMessage || error.message)
    );
  }
};

const handleBioUpdate = async () => {
  try {
    const response = await $fetch("/api/account-bio-update", {
      method: "POST",
      body: {
        userUuid: account.value.uuid,
        bio: editForm.value.bio,
      },
    });

    if (response.success) {
      account.value.bio = response.bio;
      closeEditModals();
      showSuccess("Sauvegardé!");
    }
  } catch (error) {
    console.error("Error updating bio:", error);
    showError(
      "Erreur lors de la mise à jour de la bio: " +
        (error.data?.statusMessage || error.message)
    );
  }
};

const handleDetailsUpdate = async () => {
  try {
    const response = await $fetch("/api/account-details-update", {
      method: "POST",
      body: {
        userUuid: account.value.uuid,
        gender: editForm.value.gender,
        specialization: editForm.value.specialization,
      },
    });

    if (response.success) {
      account.value.gender = response.gender;
      account.value.specialization = response.specialization;
      closeEditModals();
      showSuccess("Sauvegardé!");
    }
  } catch (error) {
    console.error("Error updating details:", error);
    showError(
      "Erreur lors de la mise à jour des détails: " +
        (error.data?.statusMessage || error.message)
    );
  }
};

// Fetch data on mount
onMounted(() => {
  fetchAccount();
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading State with Skeleton -->
    <div v-if="isLoading">
      <!-- Page Header Skeleton -->
      <div
        class="bg-gradient-to-b from-[#CEDFFF] to-white flex items-center justify-center h-[200px] shadow-sm mb-5"
      >
        <div class="x-container text-center">
          <div class="flex items-center justify-center gap-x-3 mb-4">
            <div class="w-8 h-8 bg-neutral-300 rounded animate-pulse"></div>
            <div class="h-9 bg-neutral-300 rounded w-48 animate-pulse"></div>
          </div>
          <div class="max-w-2xl mx-auto">
            <div
              class="h-5 bg-neutral-300 rounded w-96 animate-pulse mx-auto"
            ></div>
          </div>
        </div>
      </div>

      <div class="x-container y-container">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content Skeleton -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Profile Overview Skeleton -->
            <section class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="flex items-start gap-6">
                <!-- Profile Picture Skeleton -->
                <div
                  class="w-20 h-20 bg-neutral-200 rounded-full animate-pulse"
                ></div>

                <!-- Profile Info Skeleton -->
                <div class="flex-1 space-y-3">
                  <div
                    class="h-6 bg-neutral-200 rounded w-48 animate-pulse"
                  ></div>
                  <div
                    class="h-4 bg-neutral-200 rounded w-64 animate-pulse"
                  ></div>
                  <div
                    class="h-6 bg-neutral-200 rounded w-32 animate-pulse"
                  ></div>
                </div>
              </div>
            </section>

            <!-- Bio Section Skeleton -->
            <section class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-6 h-6 bg-neutral-200 rounded animate-pulse"></div>
                <div
                  class="h-6 bg-neutral-200 rounded w-24 animate-pulse"
                ></div>
              </div>
              <div class="space-y-3">
                <div
                  class="h-4 bg-neutral-200 rounded w-full animate-pulse"
                ></div>
                <div
                  class="h-4 bg-neutral-200 rounded w-5/6 animate-pulse"
                ></div>
                <div
                  class="h-4 bg-neutral-200 rounded w-4/5 animate-pulse"
                ></div>
                <div
                  class="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"
                ></div>
              </div>
            </section>

            <!-- Account Details Skeleton -->
            <section class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-6 h-6 bg-neutral-200 rounded animate-pulse"></div>
                <div
                  class="h-6 bg-neutral-200 rounded w-48 animate-pulse"
                ></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="i in 6" :key="i" class="space-y-2">
                  <div
                    class="h-3 bg-neutral-200 rounded w-24 animate-pulse"
                  ></div>
                  <div
                    class="h-4 bg-neutral-200 rounded w-32 animate-pulse"
                  ></div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar Skeleton -->
          <div class="space-y-6">
            <!-- Profile Actions Skeleton -->
            <div class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="text-center space-y-4">
                <div class="space-y-2">
                  <div
                    class="h-5 bg-neutral-200 rounded w-24 animate-pulse mx-auto"
                  ></div>
                  <div
                    class="h-3 bg-neutral-200 rounded w-32 animate-pulse mx-auto"
                  ></div>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="h-10 bg-neutral-200 rounded animate-pulse"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Quick Info Skeleton -->
            <div class="bg-white border border-neutral-200 rounded-lg p-6">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-5 h-5 bg-neutral-200 rounded animate-pulse"></div>
                <div
                  class="h-5 bg-neutral-200 rounded w-40 animate-pulse"
                ></div>
              </div>

              <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="flex items-start gap-3">
                  <div
                    class="w-5 h-5 bg-neutral-200 rounded animate-pulse mt-0.5"
                  ></div>
                  <div class="space-y-1">
                    <div
                      class="h-3 bg-neutral-200 rounded w-20 animate-pulse"
                    ></div>
                    <div
                      class="h-4 bg-neutral-200 rounded w-24 animate-pulse"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Membership Card Skeleton -->
            <div
              class="bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 rounded-lg p-6"
            >
              <div class="flex items-center gap-2 mb-4">
                <div class="w-5 h-5 bg-neutral-200 rounded animate-pulse"></div>
                <div
                  class="h-5 bg-neutral-200 rounded w-32 animate-pulse"
                ></div>
              </div>
              <div class="space-y-3">
                <div v-for="i in 3" :key="i" class="flex items-center gap-2">
                  <div
                    class="w-4 h-4 bg-neutral-200 rounded animate-pulse"
                  ></div>
                  <div
                    class="h-3 bg-neutral-200 rounded w-36 animate-pulse"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        :title="'Bonjour ' + (account.name || 'Compte sans nom')"
        icon="tdesign:wave-bye-filled"
        :description="`C'est ici que vous pouvez modifier vos informations personnelles et votre profil.`"
      />

      <div class="x-container y-container">
        <div class="max-w-4xl mx-auto">
          <!-- Main Content -->
          <div class="space-y-6">
            <!-- Profile Overview -->
            <section class="bg-blue-50 rounded-md p-6 relative">
              <!-- Logout Button -->
              <button
                v-if="isOwnAccount"
                @click="handleLogout"
                class="absolute top-6 right-6 dark-button py-2 px-4 flex items-center gap-2"
              >
                <Icon
                  name="heroicons:arrow-right-on-rectangle"
                  class="w-4 h-4"
                />
                Déconnexion
              </button>

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
                  <div class="flex items-center gap-2 mb-2">
                    <h1 class="text-2xl font-bold text-black">
                      {{ account.name || "Nom non renseigné" }}
                    </h1>
                    <button
                      v-if="isOwnAccount"
                      @click="openEditName"
                      class="text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      <Icon
                        name="material-symbols:edit-rounded"
                        class="w-4 h-4"
                      />
                    </button>
                  </div>
                  <p class="text-neutral-600 mb-4">{{ account.email }}</p>

                  <!-- Member Badge -->
                  <div v-if="account.is_member">
                    <span
                      class="inline-flex items-center gap-2 px-3 py-1 bg-main text-white text-sm rounded-md font-medium"
                    >
                      <Icon name="simple-icons:magic" />
                      Membre
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Bio Section -->
            <section
              v-if="account.bio || isOwnAccount"
              class="bg-blue-50 rounded-md p-6"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <Icon
                    name="heroicons:user-circle"
                    class="w-6 h-6 text-accent"
                  />
                  <h2 class="text-xl font-bold text-black">À propos</h2>
                </div>
                <button
                  v-if="isOwnAccount"
                  @click="openEditBio"
                  class="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <Icon name="material-symbols:edit-rounded" class="w-4 h-4" />
                </button>
              </div>
              <div class="prose prose-neutral max-w-none">
                <p
                  v-if="account.bio"
                  class="text-neutral-700 leading-relaxed whitespace-pre-wrap"
                >
                  {{ account.bio }}
                </p>
                <p v-else class="text-neutral-500 italic">
                  Aucune bio renseignée. Cliquez sur l'icône crayon pour en
                  ajouter une.
                </p>
              </div>
            </section>

            <!-- Account Details -->
            <section class="bg-blue-50 rounded-md p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <Icon
                    name="heroicons:information-circle"
                    class="w-6 h-6 text-accent"
                  />
                  <h2 class="text-xl font-bold text-black">
                    Détails du compte
                  </h2>
                </div>
                <button
                  v-if="isOwnAccount"
                  @click="openEditDetails"
                  class="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <Icon name="material-symbols:edit-rounded" class="w-4 h-4" />
                </button>
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
                    <span class="text-neutral-800 font-bold">{{
                      getTarifSymbols(account.tarif)
                    }}</span>
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

            <!-- Delete Account Section -->
            <section v-if="isOwnAccount">
              <div class="flex items-center justify-center mt-10">
                <DeleteAccountButton
                  :account-uuid="account.uuid"
                  @account-deleted="handleAccountDeleted"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Name Modal -->
    <div
      v-if="showEditName"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
        <h3 class="text-lg font-bold text-black mb-4">Modifier le nom</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2"
              >Nom</label
            >
            <input
              v-model="editForm.name"
              type="text"
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Entrez votre nom"
            />
          </div>
          <div class="flex gap-2 justify-end">
            <button
              @click="closeEditModals"
              class="px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
            >
              Annuler
            </button>
            <button
              @click="handleNameUpdate"
              class="px-4 py-2 text-sm bg-black hover:bg-neutral-800 rounded text-white transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Bio Modal -->
    <div
      v-if="showEditBio"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
        <h3 class="text-lg font-bold text-black mb-4">Modifier la bio</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2"
              >Bio</label
            >
            <textarea
              v-model="editForm.bio"
              rows="4"
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Parlez-nous de vous..."
            ></textarea>
            <p class="text-xs text-neutral-500 mt-1">
              {{ editForm.bio.length }}/1000 caractères
            </p>
          </div>
          <div class="flex gap-2 justify-end">
            <button
              @click="closeEditModals"
              class="px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
            >
              Annuler
            </button>
            <button
              @click="handleBioUpdate"
              class="px-4 py-2 text-sm bg-black hover:bg-neutral-800 rounded text-white transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Details Modal -->
    <div
      v-if="showEditDetails"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
        <h3 class="text-lg font-bold text-black mb-4">Modifier les détails</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2"
              >Genre</label
            >
            <select
              v-model="editForm.gender"
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Sélectionner...</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="prefere_ne_pas_dire">Préfère ne pas dire</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2"
              >Spécialisation</label
            >
            <select
              v-model="editForm.specialization"
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Sélectionner...</option>
              <option value="developpement_web">Développement Web</option>
              <option value="developpement_mobile">Développement Mobile</option>
              <option value="developpement_full_stack">
                Développement Full Stack
              </option>
              <option value="developpement_front_end">
                Développement Front End
              </option>
              <option value="developpement_back_end">
                Développement Back End
              </option>
              <option value="devops">DevOps</option>
              <option value="cybersecurite">Cybersécurité</option>
              <option value="data_science">Data Science</option>
              <option value="intelligence_artificielle">
                Intelligence Artificielle
              </option>
              <option value="machine_learning">Machine Learning</option>
              <option value="designer_ux_ui">Designer UX/UI</option>
              <option value="administrateur_systeme">
                Administrateur Système
              </option>
              <option value="chef_de_projet_it">Chef de Projet IT</option>
              <option value="architecture_logicielle">
                Architecture Logicielle
              </option>
              <option value="cloud_computing">Cloud Computing</option>
              <option value="bases_de_donnees">Bases de Données</option>
              <option value="reseaux_telecommunications">
                Réseaux & Télécommunications
              </option>
              <option value="business_intelligence">
                Business Intelligence
              </option>
              <option value="marketing_digital">Marketing Digital</option>
              <option value="seo_sem">SEO/SEM</option>
              <option value="e_commerce">E-commerce</option>
              <option value="developpement_jeux_video">
                Développement Jeux Vidéo
              </option>
              <option value="support_technique">Support Technique</option>
              <option value="consultant_it">Consultant IT</option>
              <option value="formation_it">Formation IT</option>
              <option value="analyseur_affaires">Analysieur d'Affaires</option>
              <option value="testeur_qa">Testeur QA</option>
              <option value="securite_informatique">
                Sécurité Informatique
              </option>
              <option value="integration_systemes">Intégration Systèmes</option>
            </select>
          </div>
          <div class="flex gap-2 justify-end">
            <button
              @click="closeEditModals"
              class="px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
            >
              Annuler
            </button>
            <button
              @click="handleDetailsUpdate"
              class="px-4 py-2 text-sm bg-black hover:bg-neutral-800 rounded text-white transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
