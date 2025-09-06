<script setup>
const activeTab = ref("connexion");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="px-6 pb-8 pt-4 h-[340px]">
    <!-- Tabs -->
    <div class="flex border-b border-neutral-200 mb-6">
      <button
        @click="setActiveTab('connexion')"
        :class="[
          'flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors',
          activeTab === 'connexion'
            ? 'border-black text-black'
            : 'border-transparent text-neutral-600 hover:text-neutral-800',
        ]"
      >
        Connexion
      </button>
      <button
        @click="setActiveTab('register')"
        :class="[
          'flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors',
          activeTab === 'register'
            ? 'border-black text-black'
            : 'border-transparent text-neutral-600 hover:text-neutral-800',
        ]"
      >
        Créer un compte
      </button>
    </div>

    <!-- Connexion Form -->
    <div v-if="activeTab === 'connexion'">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            Courriel
          </label>
          <input
            type="email"
            class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="votre@email.com"
          />
        </div>

        <!-- Info section pour égaliser la hauteur -->
        <div class="bg-neutral-100 rounded-md p-4">
          <div class="flex items-center gap-2">
            <Icon name="heroicons:lock-closed" />

            <h3 class="text-sm font-medium text-neutral-800">
              Connexion sécurisée
            </h3>
          </div>
        </div>

        <button type="submit" class="w-full black-button">
          Envoyer le code OTP
        </button>
      </form>
    </div>

    <!-- Register Form -->
    <div v-if="activeTab === 'register'">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Jean"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            Email
          </label>
          <input
            type="email"
            class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="votre@email.com"
          />
        </div>
        <button type="submit" class="w-full black-button">
          Créer le compte
        </button>
      </form>
    </div>
  </div>
</template>
