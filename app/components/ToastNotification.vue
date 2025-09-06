<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-2 scale-95"
  >
    <div
      v-if="toast.show"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4"
    >
      <div class="relative">
        <!-- Toast Content -->
        <div
          class="bg-main text-white rounded-lg shadow-lg p-4 flex items-center gap-3"
        >
          <!-- Icon -->
          <div class="flex-shrink-0">
            <Icon :name="getToastIcon(toast.type)" class="text-lg" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium">
              {{ toast.message }}
            </p>
          </div>

          <!-- Close Button -->
          <button
            @click="closeToast"
            class="flex-shrink-0 text-white/70 hover:text-white transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>

        <!-- Loading Bar -->
        <div
          class="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden"
        >
          <div
            class="h-full bg-white transition-all ease-linear"
            :style="{ width: loadingProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { toast, closeToast } = useToast();

// Loading progress for the bar
const loadingProgress = ref(100);

// Watch for toast changes to reset progress
watch(
  () => toast.value.show,
  (newShow) => {
    if (newShow) {
      // Reset progress to 100% and animate down
      loadingProgress.value = 100;

      // Animate the loading bar from 100% to 0% over 8 seconds
      const interval = setInterval(() => {
        loadingProgress.value -= 1.25; // 100 / 80 = 1.25% every 100ms
        if (loadingProgress.value <= 0) {
          loadingProgress.value = 0;
          clearInterval(interval);
        }
      }, 100);
    }
  }
);

// Get toast icon based on type
const getToastIcon = (type) => {
  const icons = {
    success: "heroicons:check-circle",
    error: "heroicons:x-circle",
    warning: "heroicons:exclamation-triangle",
    info: "heroicons:information-circle",
  };
  return icons[type] || icons.info;
};
</script>
