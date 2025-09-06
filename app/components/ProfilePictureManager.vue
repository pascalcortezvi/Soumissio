<script setup>
const props = defineProps({
  account: {
    type: Object,
    required: true,
  },
  isOwnAccount: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["picture-updated"]);

// Local reactive state
const isUploading = ref(false);
const uploadProgress = ref(0);
const error = ref(null);
const fileInput = ref(null);
const showDeleteConfirm = ref(false);

// Get default avatar URL or generate placeholder
const getDefaultAvatarUrl = (name) => {
  if (!name) return null;

  // Generate a simple placeholder based on initials
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&size=150&background=1a365d&color=fff`;
};

// Computed for current picture URL
const currentPictureUrl = computed(() => {
  if (props.account.pic_url) {
    return props.account.pic_url;
  }
  return getDefaultAvatarUrl(props.account.name);
});

// Get user initials for fallback
const getUserInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

// Handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadImage(file);
  }
};

// Upload image via API
const uploadImage = async (file) => {
  if (!file || !props.account.uuid) {
    error.value = "Fichier ou UUID utilisateur manquant";
    return;
  }

  // Client-side validation for better UX
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    error.value = "Format d'image non supporté. Utilisez JPG ou PNG.";
    return;
  }

  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    error.value = "L'image est trop volumineuse. Maximum 2MB.";
    return;
  }

  try {
    isUploading.value = true;
    uploadProgress.value = 0;
    error.value = null;

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userUuid", props.account.uuid);

    uploadProgress.value = 25;

    // Call our server-side API endpoint
    const response = await $fetch("/api/profile-picture-upload", {
      method: "POST",
      body: formData,
    });

    uploadProgress.value = 100;

    emit("picture-updated", response.url);
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  } catch (err) {
    console.error("Error uploading profile picture:", err);
    error.value =
      err.data?.statusMessage ||
      err.message ||
      "Erreur lors de l'upload de l'image";
  } finally {
    isUploading.value = false;
    setTimeout(() => {
      uploadProgress.value = 0;
    }, 2000);
  }
};

// Trigger file selection
const selectImage = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Delete image
const confirmDelete = () => {
  showDeleteConfirm.value = true;
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
};

const handleDelete = async () => {
  if (!props.account.uuid) {
    error.value = "UUID utilisateur manquant";
    return;
  }

  try {
    isUploading.value = true;
    error.value = null;

    // Call our server-side API endpoint
    await $fetch("/api/profile-picture-delete", {
      method: "POST",
      body: {
        userUuid: props.account.uuid,
        currentPicUrl: props.account.pic_url,
      },
    });

    emit("picture-updated", null);
    showDeleteConfirm.value = false;
  } catch (err) {
    console.error("Error deleting profile picture:", err);
    error.value =
      err.data?.statusMessage ||
      err.message ||
      "Erreur lors de la suppression de l'image";
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="relative group">
    <!-- Profile Picture Display -->
    <div class="relative w-20 h-20">
      <!-- Image or Avatar -->
      <div
        v-if="currentPictureUrl && !currentPictureUrl.includes('ui-avatars')"
        class="w-20 h-20 rounded-full overflow-hidden"
      >
        <img
          :src="currentPictureUrl"
          :alt="account.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Fallback Avatar with Initials -->
      <div
        v-else
        class="w-20 h-20 bg-main text-white rounded-full flex items-center justify-center text-2xl font-bold"
      >
        {{ getUserInitials(account.name) }}
      </div>

      <!-- Upload Progress Overlay -->
      <div
        v-if="isUploading"
        class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"
      >
        <div class="text-center text-white">
          <div class="text-xs font-medium">{{ uploadProgress }}%</div>
          <div class="w-8 h-1 bg-white/30 rounded-full mt-1">
            <div
              class="h-full bg-white rounded-full transition-all duration-300"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Edit Overlay (only for own account) -->
      <div
        v-if="isOwnAccount && !isUploading"
        class="absolute inset-0 bg-black/0 group-hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
        @click="selectImage"
      >
        <Icon
          name="heroicons:camera"
          class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>

    <!-- Action Buttons (only for own account) -->
    <div v-if="isOwnAccount && !isUploading" class="mt-2">
      <!-- Single "Ajouter" button when no picture -->
      <button
        v-if="!account.pic_url"
        @click="selectImage"
        class="text-xs text-neutral-700 hover:underline transition-all duration-200 flex items-center"
      >
        <Icon name="heroicons:camera" class="w-3 h-3 mr-1" />
        Ajouter
      </button>

      <!-- Stacked "Changer" and "Supprimer" when picture exists -->
      <div v-else class="flex flex-col gap-1">
        <button
          @click="selectImage"
          class="text-xs text-neutral-700 hover:underline transition-all duration-200 flex items-center"
        >
          <Icon name="heroicons:camera" class="w-3 h-3 mr-1" />
          Changer
        </button>

        <button
          @click="confirmDelete"
          class="text-xs text-red-500 hover:underline transition-all duration-200 flex items-center"
        >
          <Icon name="heroicons:trash" class="w-3 h-3 mr-1" />
          Supprimer
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-2 text-xs text-red-600">
      {{ error }}
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/jpg,image/png"
      class="hidden"
      @change="handleFileSelect"
    />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="cancelDelete"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 class="text-lg font-bold text-black mb-2">Supprimer la photo</h3>
        <p class="text-sm text-neutral-600 mb-4">
          Êtes-vous sûr de vouloir supprimer votre photo de profil ? Cette
          action ne peut pas être annulée.
        </p>

        <div class="flex gap-2 justify-end">
          <button
            @click="cancelDelete"
            class="px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="handleDelete"
            class="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
