<script setup>
const props = defineProps({
  activeTab: String,
});

const emit = defineEmits(["tabChange"]);

const setActiveTab = (tab) => {
  emit("tabChange", tab);
};
</script>

<template>
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
</template>
