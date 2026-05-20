// =========================
// INITIALIZE ICONS
// =========================

lucide.createIcons();

// =========================
// DOM ELEMENTS
// =========================

// Navigation Elements
const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
// Theme Toggle Elements
const themeToggleButton = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem("theme");
// Modal Elements
const modalOverlay = document.getElementById('modalOverlay');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
// Toast Elements
const showToastButton = document.getElementById('showToastButton');
const toast = document.getElementById('toast');
const closeToastButton = document.getElementById('closeToastButton');
// Tab Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
// Accordion Elements
const accordions = document.querySelectorAll('.accordion');
// Dropdown Elements
const dropdowns = document.querySelectorAll('[data-dropdown]');
// Copy to Clipboard Elements
const copyButtons = document.querySelectorAll(".copy-button");
// Component Search Elements
const componentSearchInput = document.getElementById("componentSearch");
const feedbackCards = document.querySelectorAll(".feedback-card");
// Preview / Code Toggle Elements
const previewTabs = document.querySelectorAll(".preview-tab");
// Global Category Filter Elements
const categoryButtons = document.querySelectorAll(".category-button");
const designSections = document.querySelectorAll(".design-section");

// =========================
// MOBILE / DROPDOWN MENU
// =========================

const closeMenu = () => {
    if (!menuButton || !navMenu) return;

    menuButton.classList.remove("active");
    navMenu.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
};

const openMenu = () => {
    if (!menuButton || !navMenu) return;

    menuButton.classList.add("active");
    navMenu.classList.add("active");
    menuButton.setAttribute("aria-expanded", "true");
};

if (menuButton && navMenu) {
    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = navMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        const clickedButton = menuButton.contains(event.target);
        const clickedNav = navMenu.contains(event.target);

        if (!clickedButton && !clickedNav) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

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

// =========================
// GLOBAL CATEGORY FILTER
// =========================

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;

        categoryButtons.forEach((button) => {
            button.classList.remove("active");
        });

        button.classList.add("active");

        designSections.forEach((section) => {
            const sectionCategory = section.dataset.category;

            const shouldShow = selectedCategory === "all" || sectionCategory === selectedCategory;

            section.style.display = shouldShow ? "block" : "none";
        });
    });
});