<script setup>
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-neutral-700 mb-2">
      Code OTP
    </label>
    <input
      :value="modelValue"
      @input="updateValue"
      type="text"
      maxlength="6"
      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors text-center text-2xl tracking-widest"
      placeholder="000000"
      required
    />
  </div>
</template>
