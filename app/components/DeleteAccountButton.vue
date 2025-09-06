<template>
  <div>
    <!-- Delete Account Button -->
    <button
      @click="openModal"
      class="dark-button py-3 px-6 flex items-center gap-2"
    >
      <Icon name="heroicons:trash" class="w-4 h-4" />
      Supprimer le compte
    </button>

    <!-- Confirmation Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
        <div class="text-center">
          <!-- Warning Icon -->
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              class="h-6 w-6 text-red-600"
            />
          </div>

          <!-- Modal Title -->
          <h3 class="text-lg font-bold text-black mb-2">Supprimer le compte</h3>

          <!-- Modal Description -->
          <p class="text-sm text-neutral-600 mb-6">
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
            irréversible et toutes vos données seront définitivement perdues.
          </p>

          <!-- Action Buttons -->
          <div class="flex gap-3 justify-center">
            <button
              @click="closeModal"
              class="px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
            >
              Annuler
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { showError, showSuccess } = useToast();

// Modal state
const showModal = ref(false);

// Props
const props = defineProps({
  accountUuid: {
    type: String,
    required: true,
  },
});

// Emits
const emit = defineEmits(["account-deleted"]);

// Open modal
const openModal = () => {
  showModal.value = true;
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Confirm deletion
const confirmDelete = async () => {
  try {
    // TODO: Implement actual account deletion API call
    // For now, just show a message
    showError("Fonctionnalité de suppression de compte en développement");
    closeModal();

    // When implemented, it would look like:
    // const response = await $fetch("/api/account-delete", {
    //   method: "POST",
    //   body: {
    //     userUuid: props.accountUuid
    //   }
    // });
    //
    // if (response.success) {
    //   showSuccess("Compte supprimé avec succès");
    //   emit('account-deleted');
    //   await navigateTo("/");
    // }
  } catch (error) {
    console.error("Error deleting account:", error);
    showError("Erreur lors de la suppression du compte");
  }
};
</script>
