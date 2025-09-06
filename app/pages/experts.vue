<script setup>
const searchQuery = ref("");
const selectedCity = ref("all");
const selectedJobType = ref("all");

// Mock data for experts
const experts = ref([
  {
    id: 1,
    name: "Jean D.",
    jobType: "Développeur Full-Stack",
    city: "Montréal",
    experience: "5 ans",
    hourlyRate: "65$/h",
    avatar: "JD",
    skills: ["Vue.js", "Node.js", "PostgreSQL"],
    description:
      "Développeur expérimenté spécialisé en applications web modernes.",
  },
  {
    id: 2,
    name: "Marie L.",
    jobType: "Designer UX/UI",
    city: "Québec",
    experience: "3 ans",
    hourlyRate: "55$/h",
    avatar: "ML",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    description:
      "Designer créative avec une passion pour l'expérience utilisateur.",
  },
  {
    id: 3,
    name: "Pierre M.",
    jobType: "DevOps Engineer",
    city: "Laval",
    experience: "7 ans",
    hourlyRate: "75$/h",
    avatar: "PM",
    skills: ["AWS", "Docker", "Kubernetes"],
    description:
      "Expert en infrastructure cloud et automatisation des déploiements.",
  },
  {
    id: 4,
    name: "Sophie R.",
    jobType: "Développeur Mobile",
    city: "Sherbrooke",
    experience: "4 ans",
    hourlyRate: "60$/h",
    avatar: "SR",
    skills: ["React Native", "iOS", "Android"],
    description:
      "Spécialiste du développement d'applications mobiles cross-platform.",
  },
  {
    id: 5,
    name: "Alexandre T.",
    jobType: "Data Scientist",
    city: "Gatineau",
    experience: "6 ans",
    hourlyRate: "80$/h",
    avatar: "AT",
    skills: ["Python", "Machine Learning", "SQL"],
    description:
      "Analyste de données avec expertise en intelligence artificielle.",
  },
  {
    id: 6,
    name: "Camille B.",
    jobType: "Cybersécurité",
    city: "Trois-Rivières",
    experience: "8 ans",
    hourlyRate: "90$/h",
    avatar: "CB",
    skills: ["Penetration Testing", "Network Security", "ISO 27001"],
    description: "Expert en sécurité informatique et conformité réglementaire.",
  },
]);

const cities = [
  "all",
  "Montréal",
  "Québec",
  "Laval",
  "Gatineau",
  "Sherbrooke",
  "Trois-Rivières",
  "Saguenay",
  "Lévis",
];

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

// Filter experts based on search and filters
const filteredExperts = computed(() => {
  return experts.value.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      expert.jobType.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCity =
      selectedCity.value === "all" || expert.city === selectedCity.value;
    const matchesJobType =
      selectedJobType.value === "all" ||
      expert.jobType === selectedJobType.value;

    return matchesSearch && matchesCity && matchesJobType;
  });
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Page Header Section -->
    <PageHeader
      title="Experts"
      icon="material-symbols:person-search-rounded"
      description="Découvrez des professionnels IT qualifiés au Québec. Parcourez les profils, consultez leurs compétences et contactez directement les."
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
              placeholder="Nom ou compétence..."
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <!-- City Filter -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Ville
            </label>
            <select
              v-model="selectedCity"
              class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">Toutes les villes</option>
              <option v-for="city in cities.slice(1)" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
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
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-neutral-600">
          {{ filteredExperts.length }} expert{{
            filteredExperts.length > 1 ? "s" : ""
          }}
          trouvé{{ filteredExperts.length > 1 ? "s" : "" }}
        </p>
      </div>

      <!-- Experts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="expert in filteredExperts"
          :key="expert.id"
          :to="`/expert/${expert.id}`"
          class="block bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <!-- Avatar and Header -->
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-medium"
            >
              {{ expert.avatar }}
            </div>
            <div class="ml-3">
              <h3 class="font-bold text-black">{{ expert.name }}</h3>
              <p class="text-sm text-neutral-600">{{ expert.jobType }}</p>
            </div>
          </div>

          <!-- Description -->
          <p class="text-neutral-700 text-sm mb-4 line-clamp-2">
            {{ expert.description }}
          </p>

          <!-- Details -->
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-neutral-600">Ville:</span>
              <span class="font-medium">{{ expert.city }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-neutral-600">Expérience:</span>
              <span class="font-medium">{{ expert.experience }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-neutral-600">Tarif:</span>
              <span class="font-bold text-black">{{ expert.hourlyRate }}</span>
            </div>
          </div>

          <!-- Skills -->
          <div class="mb-4">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="skill in expert.skills.slice(0, 3)"
                :key="skill"
                class="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- View Profile Button -->
          <div class="w-full accent-button text-center">Voir le profil</div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-if="filteredExperts.length === 0" class="text-center py-12">
        <Icon
          name="heroicons:magnifying-glass"
          class="w-12 h-12 text-neutral-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-neutral-900 mb-2">
          Aucun expert trouvé
        </h3>
        <p class="text-neutral-600">
          Essayez de modifier vos filtres de recherche.
        </p>
      </div>
    </div>
  </div>
</template>
