const translations = {
  en: {
    "nav.home": "Home", "nav.expertise": "Expertise", "nav.partners": "Partners", "nav.network": "Network", "nav.about": "About", "nav.contact": "Contact us", "nav.platform": "View the solution",
    "hero.eyebrow": "Pharmaceutical distribution · Tunisia", "hero.title": "Dermocosmetic excellence, distributed nationwide.", "hero.lead": "Since 2013, New Medica has represented leading European laboratories, bringing their innovations closer to Tunisian healthcare professionals and consumers.", "hero.ctaPartners": "Discover our partners", "hero.ctaStory": "Our story", "hero.since": "Year founded", "hero.labs": "Partner laboratories", "hero.pharmacies": "of pharmacies covered", "hero.stamp": "A strong presence in the field",
    "intro.eyebrow": "Our mission", "intro.title": "Share innovation. Create lasting value.", "intro.copy": "New Medica puts its medical, commercial and logistics expertise at the service of ambitious brands. Our role goes beyond distribution: we build each brand with an in-depth understanding of the Tunisian market.", "intro.link": "Talk to our team",
    "expertise.dermoTitle": "Dermocosmetics", "expertise.dermoText": "Targeted solutions combining scientific research, sensory appeal and dermatological standards.", "expertise.healthTitle": "Intimate health", "expertise.healthText": "Specialized ranges designed to precisely address gynecological needs.", "expertise.pediaTitle": "Pediatric care", "expertise.pediaText": "Care designed for the most delicate skin, supported by a network of professionals.",
    "partners.eyebrow": "Partner laboratories", "partners.title": "Recognized brands. A shared vision.", "partners.copy": "In Tunisia, we represent Spanish laboratories selected for their rigor, capacity for innovation and quality formulations.", "partners.featureLabel": "International partnerships", "partners.featureTitle": "A bridge between European expertise and the Tunisian market.", "partners.featureText": "Carefully selected partners, structured market development and continuous local support: every collaboration is built to grow over time.", "partners.featureCta": "Become a partner",
    "network.eyebrow": "Nationwide coverage", "network.title": "A measurable, close-to-market field force.", "network.copy": "Our network connects brands with pharmacies, parapharmacies and healthcare professionals throughout Tunisia.", "network.pharmacies": "of pharmacies covered", "network.para": "of parapharmacies covered", "network.profLabel": "Professional network", "network.profTitle": "A strong presence among prescribers and experts.", "network.derm": "Dermatologists", "network.aesthetic": "Aesthetic doctors", "network.gyne": "Gynecologists", "network.pedia": "Pediatricians", "network.spa": "Luxury spas",
    "about.eyebrow": "Since 2013", "about.title": "Growing through trust, acting responsibly.", "about.copy": "Founded by Mr. Karim Dakhlaoui, New Medica was built around a simple ambition: making innovative health and care solutions accessible in Tunisia through strong human relationships.", "about.quote": "Together Towards Excellence", "about.valueTitle": "Customer value", "about.valueText": "Creating value through listening, expertise and support tailored to each partner.", "about.humanTitle": "Humanity", "about.humanText": "Working through sharing, responsibility and respect for others.", "about.commitTitle": "Commitment", "about.commitText": "Building close relationships and keeping our promises over time.",
    "contact.eyebrow": "Let’s discuss your projects", "contact.title": "Let’s build the next success together.", "contact.copy": "Are you a laboratory, healthcare professional or commercial partner? Our team is ready to listen.", "contact.phoneLabel": "Phone", "contact.emailLabel": "Email", "contact.hoursLabel": "Business hours", "contact.hours": "Monday – Friday · 08:00 – 18:00", "contact.addressLabel": "Address", "contact.address": "Nour Subdivision No. 26, GP1 Road<br />2023 Mégrine, Ben Arous",
    "form.name": "Full name", "form.email": "Professional email", "form.subject": "You are", "form.choose": "Choose a profile", "form.lab": "A laboratory", "form.pro": "A healthcare professional", "form.partner": "A commercial partner", "form.other": "Other", "form.message": "Your message", "form.submit": "Send my request", "form.note": "By sending this form, you agree to be contacted by New Medica.", "form.error": "Please complete all required fields.", "form.success": "Your email application is opening.",
    "footer.tagline": "Together Towards Excellence", "footer.location": "Mégrine · Tunisia"
  },
  fr: {
    "form.error": "Merci de compléter correctement tous les champs.",
    "form.success": "Votre messagerie va s’ouvrir pour finaliser l’envoi."
  }
};

const originalFrench = {};
document.querySelectorAll("[data-i18n]").forEach((element) => {
  originalFrench[element.dataset.i18n] = element.innerHTML;
});

const setLanguage = (lang) => {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = lang === "fr" ? originalFrench[key] : translations.en[key];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll(".lang-button").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  localStorage.setItem("newmedica-language", lang);
};

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

const preferredLanguage = localStorage.getItem("newmedica-language");
if (preferredLanguage === "en") setLanguage("en");

const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");

const onScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
  backToTop.classList.toggle("visible", window.scrollY > 700);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

menuToggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.forEach((link) => link.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -35px" });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-45% 0px -50%", threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const form = document.querySelector("#contact-form");
const toast = document.querySelector("#toast");
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll("[required]")];
  fields.forEach((field) => field.classList.toggle("invalid", !field.checkValidity()));
  const lang = document.documentElement.lang;
  if (!form.checkValidity()) {
    showToast(translations[lang]["form.error"]);
    fields.find((field) => !field.checkValidity())?.focus();
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Contact site — ${data.get("profile")}`);
  const body = encodeURIComponent(`Nom : ${data.get("name")}\nE-mail : ${data.get("email")}\nProfil : ${data.get("profile")}\n\n${data.get("message")}`);
  showToast(translations[lang]["form.success"]);
  setTimeout(() => { window.location.href = `mailto:contact@newmedica.tn?subject=${subject}&body=${body}`; }, 500);
});

form.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => field.classList.remove("invalid"));
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
