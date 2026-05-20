// =========================
// INITIALIZE ICONS
// =========================

lucide.createIcons();

// =========================
// DOM ELEMENTS
// =========================

const themeToggleButton = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem("theme");

const modalOverlay = document.getElementById('modalOverlay');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');

const showToastButton = document.getElementById('showToastButton');
const toast = document.getElementById('toast');
const closeToastButton = document.getElementById('closeToastButton');

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const accordions = document.querySelectorAll('.accordion');

const dropdowns = document.querySelectorAll('[data-dropdown]');

const copyButtons = document.querySelectorAll(".copy-button");

const componentSearchInput = document.getElementById("componentSearch");
const feedbackCards = document.querySelectorAll(".feedback-card");

const previewTabs = document.querySelectorAll(".preview-tab");

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

// =========================
// MODAL
// =========================

const openModal = () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// =========================
// TOAST NOTIFICATION
// =========================

let toastTimeout;

const showToast = () => {
    toast.classList.add('active');

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
};

const closeToast = () => {
    toast.classList.remove('active');
    clearTimeout(toastTimeout);
};

showToastButton.addEventListener('click', showToast);
closeToastButton.addEventListener('click', closeToast);

// =========================
// INTERACTIVE TABS
// =========================

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedTab = button.dataset.tab;

        tabButtons.forEach((tabButton) => {
            tabButton.classList.remove('active');
            tabButton.setAttribute('aria-selected', 'false');
        });

        tabContents.forEach((content) => {
            content.classList.remove('active');
        });

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        document.getElementById(selectedTab).classList.add('active');
    });
});

// =========================
// ACCORDION
// =========================

accordions.forEach((accordion) => {
    const header = accordion.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        const isActive = accordion.classList.toggle('active');

        header.setAttribute('aria-expanded', isActive);
    });
});

// =========================
// DROPDOWN MENU
// =========================

dropdowns.forEach((dropdown) => {
    const toggleButton = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (!toggleButton || !menu) return;

    toggleButton.addEventListener('click', () => {
        const isOpen = dropdown.classList.contains('open');

        closeAllDropdowns();

        if (!isOpen) {
            dropdown.classList.add('open');

            toggleButton.setAttribute('aria-expanded', 'true');

            menu.hidden = false;
        }
    });
});

const closeAllDropdowns = () => {
    dropdowns.forEach((dropdown) => {
        const toggleButton = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        dropdown.classList.remove('open');

        toggleButton.setAttribute('aria-expanded', 'false');

        menu.hidden = true;
    });
};

// =========================
// CLICK OUTSIDE
// =========================

document.addEventListener('click', (event) => {
    const clickedDropdown = event.target.closest('[data-dropdown]');

    if (!clickedDropdown) {
        closeAllDropdowns();
    }
});

// =========================
// ESCAPE KEY ACCESSIBILITY
// =========================

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeAllDropdowns();
    }
});

// =========================
// PREVIEW / CODE TOGGLE
// =========================

previewTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const card = tab.closest(".feedback-card");

        const tabs = card.querySelectorAll(".preview-tab");
        const previewContent = card.querySelector(".preview-content");
        const codeContent = card.querySelector(".code-content");

        const selectedView = tab.dataset.view;

        tabs.forEach((tab) => {
            tab.classList.remove("active");
        });

        tab.classList.add("active");

        previewContent.hidden = selectedView !== "preview";
        codeContent.hidden = selectedView !== "code";
    });
});

// =========================
// COPY TO CLIPBOARD
// =========================

copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const codeBlock = button.closest(".code-example").querySelector("code");

        if (!codeBlock) return;

        try {
            await navigator.clipboard.writeText(codeBlock.textContent);

            button.textContent = "Copied!";

            button.disabled = true;

            setTimeout(() => {
                button.textContent = "Copy";

                button.disabled = false;
            }, 1500);

        } catch (error) {
            button.textContent = "Failed";

            setTimeout(() => {
                button.textContent = "Copy";
            }, 1500);
        }
    });
});

// =========================
// COMPONENT SEARCH FILTER
// =========================

if (componentSearchInput) {
    componentSearchInput.addEventListener("input", () => {
        const searchValue = componentSearchInput.value.toLowerCase().trim();

        feedbackCards.forEach((card) => {
            const cardTitle = card.querySelector("h3").textContent.toLowerCase();

            const isMatch = cardTitle.includes(searchValue);

            card.classList.toggle("hidden", !isMatch);
        });
    });

}