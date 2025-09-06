<script setup>
const route = useRoute();
const accountId = route.params.uuid;

// Mock data - in real app, fetch by ID
const account = ref({
  id: accountId,
  name: "Marie Tremblay",
  email: "marie.tremblay@email.com",
  accountType: "Expert Premium",
  joinDate: "2023-03-15",
  avatar: "MT",
  city: "Québec",
  province: "Québec",
  isVerified: true,
  membershipStatus: "Premium",
  totalProjects: 34,
  totalEarnings: "127,450$",
  responseRate: "98%",
  completionRate: "100%",
  bio: `Expert passionnée spécialisée en développement web et design UX/UI. Membre Premium depuis 2023 avec un excellent historique de projets réussis.

Je travaille principalement avec des PME québécoises pour créer des solutions digitales sur mesure qui répondent à leurs besoins spécifiques.`,
  skills: ["Vue.js", "React", "UX/UI Design", "Figma", "Node.js"],
  recentProjects: [
    {
      id: 1,
      title: "Site web e-commerce",
      client: "Boutique ABC",
      status: "Complété",
      amount: "4,500$",
      date: "2024-01-20",
    },
    {
      id: 2,
      title: "Application mobile",
      client: "StartupXYZ",
      status: "En cours",
      amount: "8,200$",
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "Dashboard analytique",
      client: "TechCorp",
      status: "Complété",
      amount: "6,800$",
      date: "2024-01-05",
    },
  ],
  activities: [
    {
      id: 1,
      type: "project_completed",
      description: "Projet 'Site web e-commerce' terminé",
      date: "2024-01-20",
    },
    {
      id: 2,
      type: "proposal_sent",
      description: "Proposition envoyée pour 'App mobile finance'",
      date: "2024-01-18",
    },
    {
      id: 3,
      type: "payment_received",
      description: "Paiement reçu - 4,500$ CAD",
      date: "2024-01-20",
    },
  ],
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-CA");
};

const getStatusColor = (status) => {
  switch (status) {
    case "Complété":
      return "bg-green-100 text-green-800";
    case "En cours":
      return "bg-blue-100 text-blue-800";
    case "En attente":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-neutral-100 text-neutral-800";
  }
};

const editProfile = () => {
  alert("Fonctionnalité d'édition en développement!");
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Page Header Section -->
    <PageHeader
      :title="account.name"
      icon="heroicons:user"
      :description="`${account.accountType} • ${account.city}, ${
        account.province
      } • Membre depuis ${formatDate(account.joinDate)} • ${
        account.membershipStatus
      }`"
    />

    <div class="x-container py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ account.totalProjects }}
          </div>
          <div class="text-sm text-neutral-600">Projets complétés</div>
        </div>
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ account.totalEarnings }}
          </div>
          <div class="text-sm text-neutral-600">Revenus totaux</div>
        </div>
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ account.responseRate }}
          </div>
          <div class="text-sm text-neutral-600">Taux de réponse</div>
        </div>
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ account.completionRate }}
          </div>
          <div class="text-sm text-neutral-600">Taux de completion</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Section -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:user" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">À propos</h2>
            </div>
            <div class="text-neutral-700 leading-relaxed whitespace-pre-line">
              {{ account.bio }}
            </div>
          </section>

          <!-- Skills -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:code-bracket" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">Compétences</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in account.skills"
                :key="skill"
                class="px-3 py-1 bg-main text-white text-sm rounded-full font-medium"
              >
                {{ skill }}
              </span>
            </div>
          </section>

          <!-- Recent Projects -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:briefcase" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">Projets récents</h2>
            </div>
            <div class="space-y-4">
              <div
                v-for="project in account.recentProjects"
                :key="project.id"
                class="border border-neutral-200 rounded-lg p-4 bg-neutral-50"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="text-lg font-bold text-black">
                      {{ project.title }}
                    </h3>
                    <p class="text-sm text-neutral-600">{{ project.client }}</p>
                  </div>
                  <div class="text-right">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getStatusColor(project.status)"
                    >
                      {{ project.status }}
                    </span>
                    <div class="text-sm font-bold text-black mt-1">
                      {{ project.amount }}
                    </div>
                  </div>
                </div>
                <div class="text-sm text-neutral-500">
                  {{ formatDate(project.date) }}
                </div>
              </div>
            </div>
          </section>

          <!-- Recent Activity -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:clock" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">Activité récente</h2>
            </div>
            <div class="space-y-4">
              <div
                v-for="activity in account.activities"
                :key="activity.id"
                class="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg"
              >
                <div class="w-2 h-2 bg-main rounded-full mt-2"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-black">
                    {{ activity.description }}
                  </p>
                  <p class="text-xs text-neutral-500">
                    {{ formatDate(activity.date) }}
                  </p>
                </div>
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
              <div class="text-lg font-bold text-black mb-2">Mon compte</div>
              <div class="text-sm text-neutral-600">{{ account.email }}</div>
            </div>

            <div class="space-y-3">
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
            </div>
          </div>

          <!-- Account Info -->
          <div class="bg-white border border-neutral-200 rounded-lg p-6">
            <h3 class="flex items-center gap-2 font-bold text-black mb-4">
              <Icon
                name="heroicons:information-circle"
                class="w-5 h-5 text-accent"
              />
              Informations du compte
            </h3>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:envelope"
                  class="w-5 h-5 text-neutral-400 mt-0.5"
                />
                <div>
                  <div class="text-sm text-neutral-600">Email</div>
                  <div class="font-medium">{{ account.email }}</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:calendar"
                  class="w-5 h-5 text-neutral-400 mt-0.5"
                />
                <div>
                  <div class="text-sm text-neutral-600">Membre depuis</div>
                  <div class="font-medium">
                    {{ formatDate(account.joinDate) }}
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:shield-check"
                  class="w-5 h-5 text-neutral-400 mt-0.5"
                />
                <div>
                  <div class="text-sm text-neutral-600">Statut</div>
                  <div class="font-medium text-accent">
                    {{ account.membershipStatus }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Membership Status -->
          <div
            class="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6"
          >
            <h3 class="flex items-center gap-2 font-bold text-black mb-4">
              <Icon name="heroicons:star" class="w-5 h-5 text-accent" />
              Membership Premium
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
</template>
