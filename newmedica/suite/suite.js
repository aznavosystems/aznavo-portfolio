const navItems = [...document.querySelectorAll(".nav-item")];
const views = [...document.querySelectorAll("[data-view-panel]")];
const pageTitle = document.querySelector("#page-title");
const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector("#sidebar-overlay");
const mobileMenu = document.querySelector("#mobile-menu");
const notificationsButton = document.querySelector("#notifications-button");
const notifications = document.querySelector("#notification-drawer");
const closeNotifications = document.querySelector("#close-notifications");
const orderModal = document.querySelector("#order-modal");
const toast = document.querySelector("#suite-toast");
const globalSearch = document.querySelector("#global-search");
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3400);
};

const closeSidebar = () => {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("open");
  document.body.classList.remove("locked");
};

const setView = (name) => {
  const item = navItems.find((entry) => entry.dataset.view === name);
  if (!item) return;
  navItems.forEach((entry) => entry.classList.toggle("active", entry === item));
  views.forEach((view) => view.classList.toggle("active", view.dataset.viewPanel === name));
  pageTitle.textContent = item.dataset.title;
  globalSearch.value = "";
  document.querySelectorAll(".searchable-table tbody tr").forEach((row) => row.hidden = false);
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", `#${name}`);
  closeSidebar();
};

navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
document.querySelectorAll("[data-nav-target]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.navTarget)));

mobileMenu.addEventListener("click", () => {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("open");
  document.body.classList.add("locked");
});
sidebarOverlay.addEventListener("click", closeSidebar);

const toggleNotifications = (open) => {
  notifications.classList.toggle("open", open);
  notifications.setAttribute("aria-hidden", String(!open));
};
notificationsButton.addEventListener("click", () => toggleNotifications(true));
closeNotifications.addEventListener("click", () => toggleNotifications(false));

const toggleModal = (open) => {
  orderModal.classList.toggle("open", open);
  orderModal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("locked", open);
  if (open) setTimeout(() => orderModal.querySelector("select")?.focus(), 120);
};
document.querySelectorAll("[data-modal-open]").forEach((button) => button.addEventListener("click", () => toggleModal(true)));
document.querySelector(".modal-close").addEventListener("click", () => toggleModal(false));
document.querySelector(".modal-cancel").addEventListener("click", () => toggleModal(false));
orderModal.addEventListener("click", (event) => { if (event.target === orderModal) toggleModal(false); });

document.querySelector("#order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) { event.currentTarget.reportValidity(); return; }
  toggleModal(false);
  event.currentTarget.reset();
  showToast("Commande de démonstration créée avec succès.");
});

document.querySelectorAll("[data-demo-action]").forEach((button) => button.addEventListener("click", () => showToast("Action disponible dans la solution complète.")));
document.querySelectorAll(".row-action,.stock-alerts button,.filter-button,.table-tools button,.ghost-icon").forEach((button) => button.addEventListener("click", () => showToast("Détail interactif disponible dans la version personnalisée.")));

globalSearch.addEventListener("input", () => {
  const term = globalSearch.value.trim().toLocaleLowerCase("fr");
  const activeView = document.querySelector(".view.active");
  const rows = [...activeView.querySelectorAll(".searchable-table tbody tr")];
  rows.forEach((row) => row.hidden = Boolean(term) && !row.textContent.toLocaleLowerCase("fr").includes(term));
  if (term && rows.length === 0) showToast("Utilisez la recherche dans un module contenant un tableau.");
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    globalSearch.focus();
  }
  if (event.key === "Escape") {
    toggleModal(false);
    toggleNotifications(false);
    closeSidebar();
  }
});

const initialView = location.hash.slice(1);
if (navItems.some((item) => item.dataset.view === initialView)) setView(initialView);
