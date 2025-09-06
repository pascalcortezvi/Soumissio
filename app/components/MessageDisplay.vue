<script setup>
const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "info",
  },
});

// Computed property to handle empty/invalid type values
const messageType = computed(() => {
  const validTypes = ["success", "error", "info"];
  return validTypes.includes(props.type) ? props.type : "info";
});
</script>

<template>
  <div
    v-if="message"
    :class="[
      'mb-4 p-3 rounded-lg text-sm',
      messageType === 'success'
        ? 'bg-green-50 text-green-700 border border-green-200'
        : messageType === 'error'
        ? 'bg-red-50 text-red-700 border border-red-200'
        : 'bg-blue-50 text-blue-700 border border-blue-200',
    ]"
  >
    {{ message }}
  </div>
</template>
