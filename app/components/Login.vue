<script setup>
const user = useSupabaseUser();
const emit = defineEmits(["close"]);

// State management
const activeTab = ref("connexion");
const email = ref("");
const otpCode = ref("");
const name = ref("");
const isLoading = ref(false);
const showOtpInput = ref(false);
const message = ref("");
const messageType = ref("");

const handleTabChange = (tab) => {
  activeTab.value = tab;
  resetForm();
};

const resetForm = () => {
  email.value = "";
  otpCode.value = "";
  name.value = "";
  showOtpInput.value = false;
  message.value = "";
  messageType.value = "";
};

const handleSuccess = (msg) => {
  setMessage(msg, "success");
};

const handleError = (msg) => {
  setMessage(msg, "error");
};

const handleLoading = (loading) => {
  isLoading.value = loading;
};

const handleClose = () => {
  emit("close");
};

const setMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = "";
    messageType.value = "";
  }, 5000);
};

// Watch for user changes and close modal when logged in
watch(user, (newUser) => {
  if (newUser) {
    setTimeout(() => {
      emit("close");
    }, 500);
  }
});
</script>

<template>
  <div class="rounded-lg overflow-hidden">
    <!-- Header with Tabs -->
    <LoginTabs :active-tab="activeTab" @tab-change="handleTabChange" />

    <!-- Content Area -->
    <div class="bg-white px-6 py-6">
      <!-- Connexion Form -->
      <LoginForm
        v-if="activeTab === 'connexion'"
        :email="email"
        :otp-code="otpCode"
        :show-otp-input="showOtpInput"
        :is-loading="isLoading"
        :message="message"
        :message-type="messageType"
        @update:email="email = $event"
        @update:otp-code="otpCode = $event"
        @update:show-otp-input="showOtpInput = $event"
        @success="handleSuccess"
        @error="handleError"
        @loading="handleLoading"
        @close="handleClose"
      />

      <!-- Register Form -->
      <RegisterForm
        v-if="activeTab === 'register'"
        :email="email"
        :name="name"
        :otp-code="otpCode"
        :show-otp-input="showOtpInput"
        :is-loading="isLoading"
        :message="message"
        :message-type="messageType"
        @update:email="email = $event"
        @update:name="name = $event"
        @update:otp-code="otpCode = $event"
        @update:show-otp-input="showOtpInput = $event"
        @success="handleSuccess"
        @error="handleError"
        @loading="handleLoading"
        @close="handleClose"
      />
    </div>
  </div>
</template>
