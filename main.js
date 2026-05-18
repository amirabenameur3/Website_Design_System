// =========================
// INITIALIZE ICONS
// =========================

lucide.createIcons();

// =========================
// DOM ELEMENTS
// =========================

const themeToggleButton = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem("theme");

// =========================
// THEME TOGGLE
// =========================

if (!savedTheme) {
    document.documentElement.setAttribute("data-theme", "dark");
}

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggleButton.innerHTML = savedTheme === "light" ? `<i data-lucide="moon"></i>` : `<i data-lucide="sun"></i>`;
    lucide.createIcons();
}

themeToggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeToggleButton.innerHTML = newTheme === "light" ? `<i data-lucide="moon"></i>` : `<i data-lucide="sun"></i>`;
    lucide.createIcons();
});