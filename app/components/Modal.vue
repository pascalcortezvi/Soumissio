<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  component: {
    type: [Object, String],
    default: null,
  },
  componentProps: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

// Control body scrolling
const toggleBodyScroll = (disable) => {
  if (process.client) {
    if (disable) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
};

// Watch for modal open/close to toggle body scroll
watch(
  () => props.isOpen,
  (newValue) => {
    toggleBodyScroll(newValue);
  }
);

// Cleanup on component unmount
onBeforeUnmount(() => {
  toggleBodyScroll(false);
});
</script>

<template>
  <transition
    enter-active-class="transition ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="$emit('close')"
    >
      <transition
        enter-active-class="transition ease-out transform"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in transform"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
        appear
      >
        <div
          v-if="isOpen"
          class="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4"
        >
          <!-- Render dynamic component if provided -->
          <component v-if="component" :is="component" v-bind="componentProps" />
          <!-- Fallback slot content -->
          <slot v-else>
            <h1 class="text-xl font-bold mb-4">Modal</h1>
            <p class="text-gray-600">This is a modal content.</p>
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
