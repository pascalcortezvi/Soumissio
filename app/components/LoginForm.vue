<script setup>
const { sendOtp } = useSendOtp();
const { verifyOtp } = useVerifyOtp();

const props = defineProps({
  email: String,
  otpCode: String,
  showOtpInput: Boolean,
  isLoading: Boolean,
  message: String,
  messageType: String,
});

const emit = defineEmits([
  "update:email",
  "update:otpCode",
  "update:showOtpInput",
  "success",
  "error",
  "loading",
  "close",
]);

const handleSendOtp = async () => {
  if (!props.email) {
    emit("error", "Veuillez entrer votre adresse email");
    return;
  }

  emit("loading", true);
  const result = await sendOtp(props.email);

  if (result.success) {
    emit("update:showOtpInput", true);
    emit("success", "Code OTP envoyé ! Vérifiez votre email.");
  } else {
    emit("error", result.error);
  }

  emit("loading", false);
};

const handleVerifyOtp = async () => {
  if (!props.otpCode) {
    emit("error", "Veuillez entrer le code OTP");
    return;
  }

  emit("loading", true);
  const result = await verifyOtp(props.email, props.otpCode);

  if (result.success) {
    emit("success", "Connexion réussie !");
    setTimeout(() => {
      emit("close");
    }, 1000);
  } else {
    emit("error", result.error);
  }

  emit("loading", false);
};

const resetForm = () => {
  emit("update:showOtpInput", false);
  emit("update:otpCode", "");
};
</script>

<template>
  <div>
    <div class="text-center mb-6">
      <h3 class="text-lg font-bold text-neutral-800 mb-2">Se connecter</h3>
      <p class="text-sm text-neutral-600">Accédez à votre compte Soumissio</p>
    </div>

    <MessageDisplay :message="message" :type="messageType" />

    <form
      @submit.prevent="showOtpInput ? handleVerifyOtp() : handleSendOtp()"
      class="space-y-5"
    >
      <EmailInput
        :model-value="email"
        @update:model-value="$emit('update:email', $event)"
        :disabled="showOtpInput"
      />

      <OtpInput
        v-if="showOtpInput"
        :model-value="otpCode"
        @update:model-value="$emit('update:otpCode', $event)"
      />

      <SecurityInfo :show-otp-input="showOtpInput" />

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full accent-button py-3 text-base font-medium disabled:opacity-50"
      >
        <span v-if="isLoading">Chargement...</span>
        <span v-else>{{
          showOtpInput ? "Valider le code" : "Envoyer le code OTP"
        }}</span>
      </button>

      <button
        v-if="showOtpInput"
        type="button"
        @click="resetForm"
        class="w-full text-neutral-600 hover:text-neutral-800 text-sm py-2"
      >
        ← Changer d'email
      </button>
    </form>
  </div>
</template>
