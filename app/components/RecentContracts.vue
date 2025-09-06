<script setup>
// Mock data for recent contracts
const recentContracts = ref([
  {
    id: 1,
    title: "Application mobile de livraison",
    company: "DeliveryTech",
    jobType: "Développeur Mobile",
    budget: "8,000$ - 12,000$",
    location: "Montréal, Québec",
    postedDate: "2024-01-21",
    proposals: 8,
    isUrgent: false,
    description:
      "Développement d'une application mobile pour service de livraison avec géolocalisation en temps réel.",
  },
  {
    id: 2,
    title: "Refonte site web e-commerce",
    company: "ShopPlus Inc.",
    jobType: "Développeur Full-Stack",
    budget: "15,000$ - 20,000$",
    location: "Québec, Québec",
    postedDate: "2024-01-20",
    proposals: 12,
    isUrgent: true,
    description:
      "Refonte complète d'un site e-commerce avec système de paiement et gestion d'inventaire.",
  },
  {
    id: 3,
    title: "Dashboard analytique BI",
    company: "DataCorp",
    jobType: "Data Scientist",
    budget: "10,000$ - 15,000$",
    location: "Laval, Québec",
    postedDate: "2024-01-19",
    proposals: 5,
    isUrgent: false,
    description:
      "Création d'un dashboard pour visualiser les données de vente et performances business.",
  },
  {
    id: 4,
    title: "App gestion de projet",
    company: "ProjectFlow",
    jobType: "Développeur Full-Stack",
    budget: "12,000$ - 18,000$",
    location: "Gatineau, Québec",
    postedDate: "2024-01-18",
    proposals: 15,
    isUrgent: false,
    description:
      "Application web de gestion de projet avec collaboration en temps réel et suivi des tâches.",
  },
]);

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-CA");
};

// Calculate days ago
const getDaysAgo = (dateString) => {
  const today = new Date();
  const postedDate = new Date(dateString);
  const diffTime = today - postedDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  return `Il y a ${diffDays} jours`;
};
</script>

<template>
  <section class="py-16 bg-white">
    <div class="x-container">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-black mb-4">
          Les contrats les plus récents
        </h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
          Les nouvelles opportunités publiées récemment sur la plateforme
        </p>
      </div>

      <!-- Contracts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <NuxtLink
          v-for="contract in recentContracts"
          :key="contract.id"
          :to="`/contract/${contract.id}`"
          class="block bg-blue-50 rounded-lg p-5 group"
        >
          <!-- Header -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h3
                  class="font-bold text-lg text-black line-clamp-2 group-hover:underline"
                >
                  {{ contract.title }}
                </h3>
                <span
                  v-if="contract.isUrgent"
                  class="px-2 py-1 bg-main text-white text-xs font-medium rounded-md flex-shrink-0"
                >
                  Urgent
                </span>
              </div>
              <p class="text-neutral-600 font-medium mb-1">
                {{ contract.company }}
              </p>
              <p class="text-sm text-neutral-500">{{ contract.location }}</p>
            </div>
          </div>

          <!-- Description -->
          <p class="text-neutral-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            {{ contract.description }}
          </p>

          <!-- Details Grid -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span class="text-xs text-neutral-500">Type d'emploi</span>
              <p class="font-medium text-sm">{{ contract.jobType }}</p>
            </div>
            <div>
              <span class="text-xs text-neutral-500">Budget</span>
              <p class="font-bold text-sm text-accent">{{ contract.budget }}</p>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex justify-between items-center pt-4 border-t border-neutral-100"
          >
            <div class="flex items-center gap-4 text-sm text-neutral-500">
              <span>{{ contract.proposals }} propositions</span>
              <span>{{ getDaysAgo(contract.postedDate) }}</span>
            </div>
            <div class="accent-button py-1 px-4 text-sm">Voir les détails</div>
          </div>
        </NuxtLink>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-14">
        <NuxtLink to="/contracts" class="accent-button py-3 px-8">
          Voir tous les contrats
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
