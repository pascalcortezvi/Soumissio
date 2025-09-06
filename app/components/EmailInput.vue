<script setup>
const props = defineProps({
  modelValue: String,
  disabled: Boolean,
  label: {
    type: String,
    default: "Adresse courriel",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-neutral-700 mb-2">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      @input="updateValue"
      type="email"
      :disabled="disabled"
      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors disabled:bg-neutral-50"
      placeholder="votre@email.com"
      required
    />
  </div>
</template>
