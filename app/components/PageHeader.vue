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
  <div class="bg-light flex items-center justify-center h-[250px]">
    <div class="x-container text-center">
      <div class="flex items-center justify-center gap-x-3 mb-6">
        <Icon :name="icon" class="text-4xl" />
        <h1 class="text-4xl font-bold">{{ title }}</h1>
      </div>
      <p v-if="description" class="max-w-2xl mx-auto text-neutral-700">
        {{ description }}
      </p>
    </div>
  </div>
</template>
