<script setup>
const activeTab = ref("connexion");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="h-[550px] rounded-lg overflow-hidden">
    <!-- Header with Tabs -->
    <div class="bg-main text-white">
      <div class="text-center p-6">
        <h2 class="text-xl font-bold mb-4">Bienvenue sur Soumissio</h2>
        <div class="flex bg-white/10 rounded-lg p-1">
          <button
            @click="setActiveTab('connexion')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all',
              activeTab === 'connexion'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10',
            ]"
          >
            Connexion
          </button>
          <button
            @click="setActiveTab('register')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all',
              activeTab === 'register'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10',
            ]"
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="bg-white px-6 py-6">
      <!-- Connexion Form -->
      <div v-if="activeTab === 'connexion'">
        <div class="text-center mb-6">
          <h3 class="text-lg font-bold text-neutral-800 mb-2">Se connecter</h3>
          <p class="text-sm text-neutral-600">
            Accédez à votre compte Soumissio
          </p>
        </div>

        <form class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Adresse courriel
            </label>
            <input
              type="email"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div class="bg-main/5 border border-accent/20 rounded-lg p-4">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-main/20 rounded-full flex items-center justify-center"
              >
                <Icon
                  name="heroicons:shield-check"
                  class="w-4 h-4 text-accent"
                />
              </div>
              <div>
                <h4 class="text-sm font-medium text-neutral-800">
                  Connexion sécurisée
                </h4>
                <p class="text-xs text-neutral-600">
                  Nous vous enverrons un code OTP par email
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full accent-button py-3 text-base font-medium"
          >
            Envoyer le code OTP
          </button>
        </form>
      </div>

      <!-- Register Form -->
      <div v-if="activeTab === 'register'">
        <div class="text-center mb-6">
          <h3 class="text-lg font-bold text-neutral-800 mb-2">
            Créer un compte
          </h3>
          <p class="text-sm text-neutral-600">
            Rejoignez la communauté Soumissio
          </p>
        </div>

        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Prénom
            </label>
            <input
              type="text"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              placeholder="Jean"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Adresse courriel
            </label>
            <input
              type="email"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <button
            type="submit"
            class="w-full accent-button py-3 text-base font-medium"
          >
            Créer mon compte
          </button>

          <p class="text-xs text-center text-neutral-500 mt-4">
            En créant un compte, vous acceptez nos conditions d'utilisation
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
