<script setup>
const { sendOtp } = useSendOtp();
const { verifyOtp } = useVerifyOtp();
const { createAccount } = useCreateAccount();

const props = defineProps({
  email: String,
  name: String,
  otpCode: String,
  showOtpInput: Boolean,
  isLoading: Boolean,
  message: String,
  messageType: String,
});

const emit = defineEmits([
  "update:email",
  "update:name",
  "update:otpCode",
  "update:showOtpInput",
  "success",
  "error",
  "loading",
  "close",
]);

const handleSendOtp = async () => {
  if (!props.name) {
    emit("error", "Veuillez entrer votre nom");
    return;
  }

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

const handleCreateAccount = async () => {
  if (!props.otpCode) {
    emit("error", "Veuillez entrer le code OTP");
    return;
  }

  emit("loading", true);

  try {
    const otpResult = await verifyOtp(props.email, props.otpCode);

    if (!otpResult.success) {
      emit("error", otpResult.error);
      return;
    }

    // Create account record
    const accountResult = await createAccount(otpResult.user, props.name);

    if (accountResult.success) {
      emit("success", "Compte créé avec succès !");
      setTimeout(() => {
        emit("close");
      }, 1000);
    } else {
      emit("error", accountResult.error);
    }
  } catch (error) {
    emit("error", "Erreur lors de la création du compte");
  } finally {
    emit("loading", false);
  }
};

const resetForm = () => {
  emit("update:showOtpInput", false);
  emit("update:otpCode", "");
};
</script>

<template>
  <div>
    <div class="text-center mb-6">
      <h3 class="text-lg font-bold text-neutral-800 mb-2">Créer un compte</h3>
      <p class="text-sm text-neutral-600">Rejoignez la communauté Soumissio</p>
    </div>

    <MessageDisplay :message="message" :type="messageType" />

    <form
      @submit.prevent="showOtpInput ? handleCreateAccount() : handleSendOtp()"
      class="space-y-4"
    >
      <div>
        <label class="block text-sm font-medium text-neutral-700 mb-2">
          Nom complet
        </label>
        <input
          :value="name"
          @input="$emit('update:name', $event.target.value)"
          type="text"
          :disabled="showOtpInput"
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors disabled:bg-neutral-50"
          placeholder="Jean Tremblay"
          required
        />
      </div>

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

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full accent-button py-3 text-base font-medium disabled:opacity-50"
      >
        <span v-if="isLoading">Chargement...</span>
        <span v-else>{{
          showOtpInput ? "Créer mon compte" : "Envoyer le code OTP"
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

      <p class="text-xs text-center text-neutral-500 mt-4">
        En créant un compte, vous acceptez nos conditions d'utilisation
      </p>
    </form>
  </div>
</template>
