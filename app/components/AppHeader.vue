<script setup>
import Login from "./Login.vue";

const emit = defineEmits(["openModal"]);
const route = useRoute();

// Modal state management
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Check if route is active
const isActiveRoute = (path) => {
  return route.path === path;
};
</script>

<template>
  <header class="bg-main text-white flex items-center justify-center py-8">
    <div class="x-container flex items-center justify-between w-full">
      <div class="flex items-center gap-x-2">
        <NuxtLink
          class="mr-10 flex items-center gap-2 text-3xl font-bold select-none"
          to="/"
        >
          <Icon name="game-icons:fleur-de-lys" class="text-2xl" />
          <p>SOUMISSIO</p>
        </NuxtLink>
        <div class="flex items-center gap-8">
          <NuxtLink
            class="nav-link"
            :class="{
              active: isActiveRoute('/experts'),
              'text-accent': isActiveRoute('/experts'),
            }"
            to="/experts"
          >
            <Icon
              name="material-symbols:person-search-rounded"
              class="text-lg"
              :class="{ 'text-white': isActiveRoute('/experts') }"
            />
            <p :class="{ 'text-white': isActiveRoute('/experts') }">
              Trouver un expert
            </p>
          </NuxtLink>
          <NuxtLink
            class="nav-link"
            :class="{
              active: isActiveRoute('/contracts'),
              'text-accent': isActiveRoute('/contracts'),
            }"
            to="/contracts"
          >
            <Icon
              name="material-symbols:document-search"
              :class="{ 'text-white': isActiveRoute('/contracts') }"
            />
            <p :class="{ 'text-white': isActiveRoute('/contracts') }">
              Trouver un contrat
            </p>
          </NuxtLink>
          <NuxtLink
            class="nav-link"
            :class="{
              active: isActiveRoute('/membership'),
              'text-accent': isActiveRoute('/membership'),
            }"
            to="/membership"
          >
            <Icon
              name="simple-icons:magic"
              :class="{ 'text-white': isActiveRoute('/membership') }"
            />
            <p :class="{ 'text-white': isActiveRoute('/membership') }">
              Devenir membre
            </p>
          </NuxtLink>
        </div>
      </div>

      <div class="flex items-center gap-5">
        <div class="flex items-center justify-center cursor-pointer p-1">
          <Icon name="heroicons:bell" class="text-2xl text-white/40" />
        </div>
        <button class="white-button" @click="openModal">Connexion</button>
      </div>
    </div>
  </header>
  <Modal :isOpen="isModalOpen" @close="closeModal" :component="Login" />
</template>
