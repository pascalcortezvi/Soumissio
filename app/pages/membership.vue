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
      "Soumettez un nombre illimité de contrats",
      "Support technique prioritaire",
    ],
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
  <!-- Page Header Section -->
  <PageHeader
    title="Accès membre"
    icon="simple-icons:magic"
    description="Débloquez toutes les fonctionnalités de Soumissio et accélérez votre croissance professionnelle. Accès illimité aux experts et contrats."
  />

  <div class="x-container y-container">
    <div class="bg-blue-50 rounded-2xl p-8">
      <!-- Pricing Section -->
      <div class="text-center flex flex-col items-center">
        <h3 class="text-lg font-bold text-black mb-2">Abonnement Mensuel</h3>
        <div class="text-4xl font-bold text-black">CAD 24.99$</div>
      </div>

      <!-- Features Section -->
      <div class="my-8">
        <div class="flex flex-col items-center justify-center gap-4">
          <div
            v-for="feature in plans[0].features"
            :key="feature"
            class="flex items-start gap-3 p-4 bg-white w-fit rounded-xl"
          >
            <div
              class="w-5 h-5 bg-black rounded-full flex items-center justify-center mt-0.5"
            >
              <Icon name="heroicons:check" class="w-3 h-3 text-white" />
            </div>
            <span class="text-neutral-700 leading-relaxed">{{ feature }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Button -->
      <div class="flex justify-center mb-6">
        <button
          @click="handlePayment"
          :disabled="isProcessing"
          class="dark-button"
        >
          <span v-if="!isProcessing">Je veux m'abonner maintenant</span>
          <span v-else>Traitement en cours...</span>
        </button>
      </div>

      <!-- Terms -->
      <div class="text-center text-sm text-neutral-600">
        <p class="flex items-center justify-center gap-1 mb-1">
          <Icon name="heroicons:shield-check" class="w-4 h-4" />
          Se renouvelle automatiquement
        </p>
        <p>Vous annulez votre abonnement à tout temps</p>
      </div>
    </div>
  </div>
</template>
