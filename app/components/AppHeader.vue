<script setup>
import Login from "./Login.vue";

const emit = defineEmits(["openModal"]);

// Modal state management
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <header class="flex items-center justify-center p-4 shadow-sm">
    <div class="x-container flex items-center justify-between w-full">
      <div class="flex items-center gap-8">
        <NuxtLink class="mr-10 text-2xl font-bold select-none" to="/">
          Soumissio
        </NuxtLink>
        <div class="flex items-center gap-8">
          <NuxtLink class="nav-link" to="/freelancers">
            <p>Trouver un freelancer</p>
            <div class="nav-underline"></div>
          </NuxtLink>
          <NuxtLink class="nav-link" to="/contracts">
            <p>Trouver un contrat</p>
            <div class="nav-underline"></div>
          </NuxtLink>
        </div>
      </div>

      <div class="flex items-center gap-5">
        <div class="flex items-center justify-center cursor-pointer p-1">
          <Icon name="heroicons:bell" class="text-2xl text-neutral-400" />
        </div>
        <button class="black-button" @click="openModal">Connexion</button>
      </div>
    </div>
  </header>
  <Modal :isOpen="isModalOpen" @close="closeModal" :component="Login" />
</template>
