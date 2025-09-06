<script setup>
const selectedPlan = ref("annual");
const isProcessing = ref(false);

const plans = [
  {
    id: "annual",
    name: "Abonnement Annuel",
    price: 99,
    period: "par année",
    popular: true,
    savings: "Économisez 20%",
    features: [
      "Contactez un nombre illimité d'experts",
      "Soumettez un nombre illimité de propositions",
      "Accès prioritaire aux nouveaux contrats",
      'Badge "Membre Premium" sur votre profil',
      "Support client prioritaire",
      "Statistiques détaillées sur vos propositions",
      "Alertes personnalisées par email",
      "Accès aux experts vérifiés",
    ],
  },
];

const benefits = [
  {
    icon: "heroicons:user-group",
    title: "Contactez les experts",
    description:
      "Contactez directement tous les experts de la plateforme sans limitation.",
  },
  {
    icon: "heroicons:document-text",
    title: "Soumettez vos propositions",
    description:
      "Répondez à tous les appels d'offres et soumettez vos propositions sans restriction.",
  },
  {
    icon: "heroicons:star",
    title: "Statut Premium",
    description:
      "Votre profil sera mis en avant avec un badge premium visible par tous les clients.",
  },
  {
    icon: "heroicons:bell",
    title: "Alertes prioritaires",
    description:
      "Recevez des notifications en temps réel pour les nouveaux contrats correspondant à vos compétences.",
  },
];

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Développeuse Full-Stack",
    content:
      "Grâce à mon abonnement premium, j'ai pu décrocher 3 contrats majeurs en 2 mois. L'investissement s'est amorti rapidement!",
    avatar: "MD",
  },
  {
    name: "Pierre Tremblay",
    role: "Designer UX/UI",
    content:
      "L'accès prioritaire aux contrats m'a permis d'être parmi les premiers à soumissionner. Excellent retour sur investissement.",
    avatar: "PT",
  },
  {
    name: "Sophie Gagnon",
    role: "Chef de projet IT",
    content:
      "Le statut premium donne confiance aux clients. J'ai remarqué une nette amélioration dans mes taux de conversion.",
    avatar: "SG",
  },
];

const handlePayment = async () => {
  isProcessing.value = true;

  // Simulate payment processing
  setTimeout(() => {
    isProcessing.value = false;
    // Here you would integrate with a real payment processor
    alert("Paiement réussi! Bienvenue dans le programme Premium.");
  }, 2000);
};

const calculateMonthly = (annualPrice) => {
  return Math.round((annualPrice / 12) * 100) / 100;
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Page Header Section -->
    <PageHeader
      title="Accès membre"
      icon="simple-icons:magic"
      description="Débloquez toutes les fonctionnalités de Soumissio et accélérez votre croissance professionnelle. Accès illimité aux experts et contrats."
    />

    <div class="x-container py-12">
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left Side - Features -->
        <div>
          <h2 class="text-2xl font-bold text-black mb-6">
            Ce que vous obtenez
          </h2>

          <div class="space-y-4">
            <div
              v-for="feature in plans[0].features"
              :key="feature"
              class="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl"
            >
              <div
                class="w-5 h-5 bg-black rounded-full flex items-center justify-center mt-0.5"
              >
                <Icon name="heroicons:check" class="w-3 h-3 text-white" />
              </div>
              <span class="text-neutral-700 leading-relaxed">{{
                feature
              }}</span>
            </div>
          </div>
        </div>

        <!-- Right Side - Pricing & CTA -->
        <div class="lg:pl-8">
          <!-- Pricing Card -->
          <div class="bg-white border border-neutral-200 rounded-2xl p-8 mb-6">
            <div class="text-center mb-6">
              <h3 class="text-lg font-bold text-black mb-2">
                Abonnement Annuel
              </h3>
              <div class="text-4xl font-bold text-black mb-2">99$</div>
              <div class="text-neutral-600 mb-1">CAD par année</div>
              <div class="text-sm text-neutral-500">≈ 8,25$ par mois</div>
            </div>

            <button
              @click="handlePayment"
              :disabled="isProcessing"
              class="w-full black-button py-4 text-lg rounded-xl mb-4"
            >
              <span v-if="!isProcessing">Souscrire maintenant</span>
              <span v-else>Traitement en cours...</span>
            </button>

            <div class="text-center text-sm text-neutral-600">
              <p class="flex items-center justify-center gap-1 mb-1">
                <Icon name="heroicons:shield-check" class="w-4 h-4" />
                Garantie de remboursement 30 jours
              </p>
              <p>Annulation facile à tout moment</p>
            </div>
          </div>

          <!-- Benefits Highlights -->
          <div class="bg-neutral-50 rounded-2xl p-6">
            <h3 class="font-bold text-black mb-4">Pourquoi choisir Premium?</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:user-group" class="w-5 h-5 text-black" />
                <span class="text-sm text-neutral-700"
                  >Contactez tous les experts</span
                >
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:document-text"
                  class="w-5 h-5 text-black"
                />
                <span class="text-sm text-neutral-700"
                  >Soumettez sans limite</span
                >
              </div>
              <div class="flex items-center gap-3">
                <Icon name="heroicons:star" class="w-5 h-5 text-black" />
                <span class="text-sm text-neutral-700"
                  >Badge Premium visible</span
                >
              </div>
              <div class="flex items-center gap-3">
                <Icon name="heroicons:bell" class="w-5 h-5 text-black" />
                <span class="text-sm text-neutral-700"
                  >Alertes prioritaires</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Full Width Stats Section -->
      <div class="mt-16 bg-neutral-50 rounded-3xl p-12">
        <h2 class="text-3xl font-bold text-center text-black mb-8">
          Plateforme en croissance
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div
              class="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="heroicons:user-group" class="w-10 h-10" />
            </div>
            <div class="text-4xl font-bold text-black mb-2">500+</div>
            <div class="text-lg text-neutral-600 font-medium">
              Experts actifs
            </div>
            <p class="text-sm text-neutral-500 mt-2">
              Professionnels vérifiés et qualifiés
            </p>
          </div>
          <div class="text-center">
            <div
              class="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="heroicons:document-text" class="w-10 h-10" />
            </div>
            <div class="text-4xl font-bold text-black mb-2">200+</div>
            <div class="text-lg text-neutral-600 font-medium">
              Nouveaux contrats / mois
            </div>
            <p class="text-sm text-neutral-500 mt-2">
              Opportunités dans tous les secteurs IT
            </p>
          </div>
          <div class="text-center">
            <div
              class="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="heroicons:heart" class="w-10 h-10" />
            </div>
            <div class="text-4xl font-bold text-black mb-2">95%</div>
            <div class="text-lg text-neutral-600 font-medium">
              Taux de satisfaction
            </div>
            <p class="text-sm text-neutral-500 mt-2">
              Clients et experts satisfaits
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
