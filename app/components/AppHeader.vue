<script setup>
import Login from "./Login.vue";

const { user, userEmail, logout: userLogout, isAuthenticated } = useUser();
const route = useRoute();
const supabase = useSupabaseClient();

// Modal state management
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Handle main button action (Connexion/Compte)
const handleMainButton = async () => {
  if (isAuthenticated.value && userEmail.value) {
    // User is logged in - get account UUID by email and navigate
    try {
      const { data: accountData, error } = await supabase
        .from("accounts")
        .select("uuid")
        .eq("email", userEmail.value)
        .maybeSingle();

      if (error) throw error;

      if (accountData?.uuid) {
        navigateTo(`/account/${accountData.uuid}`);
      } else {
        console.warn("No account record found for email:", userEmail.value);
      }
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  } else {
    // User is not logged in - open login modal
    openModal();
  }
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
        <!-- Single button that changes text and action based on auth state -->
        <button
          class="white-button flex items-center gap-2"
          @click="handleMainButton"
        >
          <Icon name="material-symbols:account-circle" class="text-lg" />
          {{ isAuthenticated ? "Votre Compte" : "Connexion" }}
        </button>
      </div>
    </div>
  </header>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <Login @close="closeModal" />
  </Modal>
</template>
