// Global toast state
const globalToast = ref({
  show: false,
  message: "",
  type: "info", // success, error, warning, info
});

// Global auto-hide timer
let globalAutoHideTimer = null;

export const useToast = () => {
  // Use global toast state
  const toast = globalToast;
  let autoHideTimer = globalAutoHideTimer;

  // Show toast function
  const showToast = (message, type = "info", duration = 8000) => {
    // Clear existing timer
    if (globalAutoHideTimer) {
      clearTimeout(globalAutoHideTimer);
    }

    // Set toast data
    globalToast.value = {
      show: true,
      message,
      type,
    };

    // Auto-hide after duration
    globalAutoHideTimer = setTimeout(() => {
      closeToast();
    }, duration);
  };

  // Close toast function
  const closeToast = () => {
    globalToast.value.show = false;

    // Clear timer
    if (globalAutoHideTimer) {
      clearTimeout(globalAutoHideTimer);
      globalAutoHideTimer = null;
    }
  };

  // Convenience methods
  const showSuccess = (message, duration = 8000) => {
    showToast(message, "success", duration);
  };

  const showError = (message, duration = 8000) => {
    showToast(message, "error", duration);
  };

  const showWarning = (message, duration = 8000) => {
    showToast(message, "warning", duration);
  };

  const showInfo = (message, duration = 8000) => {
    showToast(message, "info", duration);
  };

  return {
    // State
    toast: readonly(toast),

    // Methods
    showToast,
    closeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
