<script setup>
const searchQuery = ref("");
const selectedJobType = ref("all");
const sortBy = ref("recent");

// Mock data for contracts
const contracts = ref([
  {
    id: 1,
    title: "Développement d'une application mobile de e-commerce",
    company: "TechCorp Inc.",
    jobType: "Développeur Mobile",
    budget: "15,000$ - 25,000$",
    duration: "3 mois",
    postedDate: "2024-01-15",
    deadline: "2024-01-30",
    isUrgent: false,
    description:
      "Nous recherchons un développeur mobile expérimenté pour créer une application e-commerce complète pour iOS et Android.",
    requirements: ["React Native", "API Integration", "Payment Gateway"],
    proposals: 12,
  },
  {
    id: 2,
    title: "Refonte complète du site web corporatif",
    company: "Solutions Digitales Québec",
    jobType: "Développeur Full-Stack",
    budget: "8,000$ - 12,000$",
    duration: "6 semaines",
    postedDate: "2024-01-12",
    deadline: "2024-01-25",
    isUrgent: true,
    description:
      "Refonte moderne d'un site web corporatif avec CMS et optimisations SEO.",
    requirements: ["Vue.js", "WordPress", "SEO"],
    proposals: 8,
  },
  {
    id: 3,
    title: "Migration vers le cloud AWS",
    company: "InnovateTech",
    jobType: "DevOps Engineer",
    budget: "20,000$ - 35,000$",
    duration: "4 mois",
    postedDate: "2024-01-10",
    deadline: "2024-02-01",
    isUrgent: false,
    description:
      "Migration complète de l'infrastructure on-premise vers AWS avec mise en place de CI/CD.",
    requirements: ["AWS", "Docker", "Terraform", "CI/CD"],
    proposals: 5,
  },
  {
    id: 4,
    title: "Design UX/UI pour application fintech",
    company: "FinanceMax",
    jobType: "Designer UX/UI",
    budget: "5,000$ - 8,000$",
    duration: "4 semaines",
    postedDate: "2024-01-08",
    deadline: "2024-01-20",
    isUrgent: true,
    description:
      "Conception complète de l'interface utilisateur pour une application de gestion financière.",
    requirements: ["Figma", "User Research", "Prototyping"],
    proposals: 15,
  },
  {
    id: 5,
    title: "Analyse de données et tableau de bord BI",
    company: "DataVision Pro",
    jobType: "Data Scientist",
    budget: "12,000$ - 18,000$",
    duration: "8 semaines",
    postedDate: "2024-01-05",
    deadline: "2024-01-28",
    isUrgent: false,
    description:
      "Création d'un système d'analyse de données avec tableaux de bord interactifs.",
    requirements: ["Python", "Power BI", "SQL", "Machine Learning"],
    proposals: 7,
  },
  {
    id: 6,
    title: "Audit de sécurité et conformité",
    company: "SecureBank",
    jobType: "Cybersécurité",
    budget: "10,000$ - 15,000$",
    duration: "6 semaines",
    postedDate: "2024-01-03",
    deadline: "2024-01-18",
    isUrgent: true,
    description:
      "Audit complet de sécurité informatique et mise en conformité réglementaire.",
    requirements: ["Penetration Testing", "Compliance", "Risk Assessment"],
    proposals: 4,
  },
]);

const jobTypes = [
  "all",
  "Développeur Full-Stack",
  "Développeur Front-End",
  "Développeur Back-End",
  "Développeur Mobile",
  "Designer UX/UI",
  "DevOps Engineer",
  "Data Scientist",
  "Cybersécurité",
  "Chef de projet IT",
  "Administrateur système",
];

const sortOptions = [
  { value: "recent", label: "Plus récent" },
  { value: "oldest", label: "Plus ancien" },
  { value: "budget_high", label: "Budget élevé" },
  { value: "budget_low", label: "Budget faible" },
  { value: "deadline", label: "Échéance proche" },
  { value: "proposals", label: "Moins de propositions" },
];

// Helper function to parse budget
const parseBudget = (budgetString) => {
  const match = budgetString.match(/(\d+,?\d*)/);
  return match ? parseInt(match[1].replace(",", "")) : 0;
};

// Filter and sort contracts
const filteredContracts = computed(() => {
  let filtered = contracts.value.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      contract.company.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesJobType =
      selectedJobType.value === "all" ||
      contract.jobType === selectedJobType.value;

    return matchesSearch && matchesJobType;
  });

  // Sort contracts
  switch (sortBy.value) {
    case "recent":
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
      break;
    case "budget_high":
      filtered.sort((a, b) => parseBudget(b.budget) - parseBudget(a.budget));
      break;
    case "budget_low":
      filtered.sort((a, b) => parseBudget(a.budget) - parseBudget(b.budget));
      break;
    case "deadline":
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      break;
    case "proposals":
      filtered.sort((a, b) => a.proposals - b.proposals);
      break;
  }

  return filtered;
});

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-CA");
};

// Calculate days remaining
const daysRemaining = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Page Header Section -->
    <PageHeader
      title="Contrats"
      icon="material-symbols:document-search"
      description="Explorez les opportunités de contrats IT au Québec. Filtrez par type d'emploi, budget et échéance pour trouver le projet parfait pour vos compétences."
    />

    <div class="x-container py-8">
      <!-- Search and Filters -->
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Rechercher
            </label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Titre ou entreprise..."
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <!-- Job Type Filter -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Type d'emploi IT
            </label>
            <select
              v-model="selectedJobType"
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">Tous les types</option>
              <option
                v-for="jobType in jobTypes.slice(1)"
                :key="jobType"
                :value="jobType"
              >
                {{ jobType }}
              </option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Trier par
            </label>
            <select
              v-model="sortBy"
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-neutral-600">
          {{ filteredContracts.length }} contrat{{
            filteredContracts.length > 1 ? "s" : ""
          }}
          trouvé{{ filteredContracts.length > 1 ? "s" : "" }}
        </p>
      </div>

      <!-- Contracts Grid -->
      <div class="space-y-6">
        <NuxtLink
          v-for="contract in filteredContracts"
          :key="contract.id"
          :to="`/contract/${contract.id}`"
          class="block bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <!-- Header -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-lg font-bold text-black">
                  {{ contract.title }}
                </h3>
                <span
                  v-if="contract.isUrgent"
                  class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-md"
                >
                  Urgent
                </span>
              </div>
              <p class="text-neutral-600 font-medium">{{ contract.company }}</p>
              <p class="text-sm text-neutral-500">{{ contract.jobType }}</p>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-black">{{ contract.budget }}</p>
              <p class="text-sm text-neutral-600">{{ contract.duration }}</p>
            </div>
          </div>

          <!-- Description -->
          <p class="text-neutral-700 mb-4 line-clamp-2">
            {{ contract.description }}
          </p>

          <!-- Requirements -->
          <div class="mb-4">
            <p class="text-sm font-medium text-neutral-700 mb-2">
              Compétences requises:
            </p>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="requirement in contract.requirements"
                :key="requirement"
                class="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
              >
                {{ requirement }}
              </span>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex justify-between items-center pt-4 border-t border-neutral-100"
          >
            <div class="flex items-center gap-4 text-sm text-neutral-600">
              <span>Publié le {{ formatDate(contract.postedDate) }}</span>
              <span
                >{{ contract.proposals }} proposition{{
                  contract.proposals > 1 ? "s" : ""
                }}</span
              >
              <span
                :class="[
                  'font-medium',
                  daysRemaining(contract.deadline) <= 3
                    ? 'text-red-600'
                    : 'text-neutral-600',
                ]"
              >
                {{ daysRemaining(contract.deadline) }} jour{{
                  daysRemaining(contract.deadline) > 1 ? "s" : ""
                }}
                restant{{ daysRemaining(contract.deadline) > 1 ? "s" : "" }}
              </span>
            </div>
            <div class="accent-button inline-block">Voir les détails</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-if="filteredContracts.length === 0" class="text-center py-12">
        <Icon
          name="heroicons:document-text"
          class="w-12 h-12 text-neutral-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-neutral-900 mb-2">
          Aucun contrat trouvé
        </h3>
        <p class="text-neutral-600">
          Essayez de modifier vos filtres de recherche.
        </p>
      </div>
    </div>
  </div>
</template>
