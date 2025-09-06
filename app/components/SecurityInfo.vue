<script setup>
const props = defineProps({
  showOtpInput: Boolean,
});
</script>

<template>
  <div class="bg-main/5 border border-accent/20 rounded-lg p-4">
    <div class="flex items-center gap-3">
      <div
        class="w-8 h-8 bg-main/20 rounded-full flex items-center justify-center"
      >
        <Icon name="heroicons:shield-check" class="w-4 h-4 text-accent" />
      </div>
      <div>
        <h4 class="text-sm font-medium text-neutral-800">
          Connexion sécurisée
        </h4>
        <p class="text-xs text-neutral-600">
          {{
            showOtpInput
              ? "Entrez le code reçu par email"
              : "Nous vous enverrons un code OTP par email"
          }}
        </p>
      </div>
    </div>
  </div>
</template>
