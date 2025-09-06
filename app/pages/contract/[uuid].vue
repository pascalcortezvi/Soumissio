<script setup>
const route = useRoute();
const contractId = route.params.uuid;

// Mock data - in real app, fetch by ID
const contract = ref({
  id: contractId,
  title: "Développement d'une application mobile de e-commerce",
  company: "TechCorp Inc.",
  jobType: "Développeur Mobile",
  budget: "15,000$ - 25,000$",
  duration: "3 mois",
  postedDate: "2024-01-15",
  deadline: "2024-01-30",
  isUrgent: false,
  description: `Nous recherchons un développeur mobile expérimenté pour créer une application e-commerce complète pour iOS et Android.

L'application devra inclure:
- Interface utilisateur moderne et intuitive
- Système de paiement sécurisé
- Gestion des commandes et livraisons  
- Système de notifications push
- Intégration avec notre API existante
- Tests et déploiement sur les stores

Nous offrons un environnement de travail collaboratif et flexible. Le projet est critique pour notre expansion digitale.`,
  requirements: [
    "React Native",
    "API Integration",
    "Payment Gateway",
    "Push Notifications",
    "App Store Deployment",
  ],
  proposals: 12,
  companyDescription:
    "TechCorp Inc. est une entreprise technologique établie depuis 2015, spécialisée dans les solutions e-commerce pour les PME québécoises.",
  location: "Montréal, Québec",
  companySize: "50-100 employés",
  industry: "Commerce électronique",
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

const submitProposal = () => {
  alert("Fonctionnalité de soumission en développement!");
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Page Header Section -->
    <PageHeader
      :title="contract.title"
      icon="material-symbols:document-search"
      :description="`${contract.company} • ${contract.location} • ${contract.duration} • ${contract.budget}`"
    />

    <div class="x-container py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Contract Details -->
          <div class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <h2 class="text-2xl font-bold text-black">
                  Détails du contrat
                </h2>
                <span
                  v-if="contract.isUrgent"
                  class="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-md"
                >
                  Urgent
                </span>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-black">
                  {{ contract.budget }}
                </div>
                <div class="text-sm text-neutral-600">
                  {{ contract.jobType }}
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-6">
              <h3 class="text-lg font-bold text-black mb-3">Description</h3>
              <div class="text-neutral-700 whitespace-pre-line">
                {{ contract.description }}
              </div>
            </div>

            <!-- Requirements -->
            <div class="mb-6">
              <h3 class="text-lg font-bold text-black mb-3">
                Compétences requises
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="requirement in contract.requirements"
                  :key="requirement"
                  class="px-3 py-2 bg-neutral-100 text-neutral-700 text-sm rounded-md font-medium"
                >
                  {{ requirement }}
                </span>
              </div>
            </div>

            <!-- Timeline -->
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-lg"
            >
              <div class="text-center">
                <div class="text-sm font-medium text-neutral-600">
                  Publié le
                </div>
                <div class="text-lg font-bold text-black">
                  {{ formatDate(contract.postedDate) }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-sm font-medium text-neutral-600">Échéance</div>
                <div class="text-lg font-bold text-black">
                  {{ formatDate(contract.deadline) }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-sm font-medium text-neutral-600">
                  Temps restant
                </div>
                <div
                  class="text-lg font-bold"
                  :class="
                    daysRemaining(contract.deadline) <= 3
                      ? 'text-red-600'
                      : 'text-black'
                  "
                >
                  {{ daysRemaining(contract.deadline) }} jour{{
                    daysRemaining(contract.deadline) > 1 ? "s" : ""
                  }}
                </div>
              </div>
            </div>
          </div>

          <!-- Company Info -->
          <div class="bg-white border border-neutral-200 rounded-lg p-6">
            <h3 class="text-lg font-bold text-black mb-4">
              À propos de l'entreprise
            </h3>
            <div class="space-y-3">
              <p class="text-neutral-700">{{ contract.companyDescription }}</p>
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100"
              >
                <div>
                  <span class="text-sm font-medium text-neutral-600"
                    >Industrie:</span
                  >
                  <span class="ml-2 text-black">{{ contract.industry }}</span>
                </div>
                <div>
                  <span class="text-sm font-medium text-neutral-600"
                    >Taille:</span
                  >
                  <span class="ml-2 text-black">{{
                    contract.companySize
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Proposal Actions -->
          <div class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="text-center mb-4">
              <div class="text-sm text-neutral-600 mb-2">
                {{ contract.proposals }} propositions reçues
              </div>
              <div class="text-2xl font-bold text-black mb-4">
                {{ contract.budget }}
              </div>
            </div>

            <button
              @click="submitProposal"
              class="w-full black-button py-4 text-lg mb-4"
            >
              Soumettre une proposition
            </button>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-600">Type de projet:</span>
                <span class="font-medium">{{ contract.jobType }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Durée:</span>
                <span class="font-medium">{{ contract.duration }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Localisation:</span>
                <span class="font-medium">{{ contract.location }}</span>
              </div>
            </div>
          </div>

          <!-- Safety Tips -->
          <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
            <h4 class="font-bold text-black mb-3 flex items-center gap-2">
              <Icon
                name="heroicons:shield-check"
                class="w-5 h-5 text-green-600"
              />
              Conseils de sécurité
            </h4>
            <ul class="space-y-2 text-sm text-neutral-700">
              <li>• Communiquez toujours via la plateforme</li>
              <li>• Ne partagez jamais d'informations bancaires</li>
              <li>• Demandez des références si nécessaire</li>
              <li>• Établissez des jalons clairs</li>
            </ul>
          </div>

          <!-- Back to Contracts -->
          <NuxtLink
            to="/contracts"
            class="flex items-center justify-center gap-2 w-full outline-button py-3"
          >
            <Icon name="heroicons:arrow-left" class="w-4 h-4" />
            Retour aux contrats
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
