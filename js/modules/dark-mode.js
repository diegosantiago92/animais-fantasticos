export default function initDarkMode() {
  const btn = document.querySelector('[data-theme]');
  if (!btn) return;

  const html = document.documentElement;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    html.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return mediaQuery.matches ? "dark" : "light";
  }

function toggleTheme() {
  const current = html.classList.contains("dark") ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";

  html.classList.toggle("dark");

  localStorage.setItem("theme", next);

  showToast(
    next === "dark"
      ? "🌙 Modo escuro ativado"
      : "☀ Modo claro ativado"
  );
}

  let toastTimeout;

function showToast(message) {
  let toast = document.querySelector(".theme-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "theme-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

  // Inicializa
  applyTheme(getPreferredTheme());

  // Botão
  btn.addEventListener("click", toggleTheme);

  // Shift + D
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key.toLowerCase() === "d") {
      toggleTheme();
    }
  });

  // Detecta mudança do sistema em tempo real
  mediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

}