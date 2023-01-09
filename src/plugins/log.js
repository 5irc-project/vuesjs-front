if (!document.env.VUE_APP_LOG || document.env.VUE_APP_LOG === "false") {
  // disable logs
  ["log", "warn", "error", "group", "info"].forEach((type) => {
    console[type] = (...args) => ({ ...args });
  });
}

export default {
  install() {
  },
};
