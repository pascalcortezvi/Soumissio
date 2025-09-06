<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="bg-blue-50 to-white flex items-center justify-center py-12 mb-5">
    <div class="x-container text-center">
      <div class="flex items-center justify-center gap-x-3 mb-4">
        <Icon :name="icon" class="text-3xl" />
        <h1 class="text-3xl font-bold">{{ title }}</h1>
      </div>
      <p v-if="description" class="max-w-2xl mx-auto text-neutral-700">
        {{ description }}
      </p>
    </div>
  </div>
</template>
