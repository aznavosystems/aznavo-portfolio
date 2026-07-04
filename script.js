/* ==========================================================================
   AZNAVO SYSTEMS — script.js
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroCanvas();
  initStrip();
  initServices();
  initPortfolio();
  initProjModal();
  initStack();
  initIndustries();
  initProcess();
  initTestimonials();
  initPricing();
  initFaq();
  initReveal();
  initStats();
  initServiceGlow();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------------
   Sticky nav + mobile toggle
   -------------------------------------------------------------------------- */
function initNav(){
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-active', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   Hero canvas — animated network mesh (nodes + connecting lines)
   -------------------------------------------------------------------------- */
function initHeroCanvas(){
  const canvas = document.getElementById('meshCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w, h, nodes = [];
  const NODE_COUNT_BASE = 60;

  function resize(){
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    const count = Math.min(NODE_COUNT_BASE, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 18000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
    }));
  }

  function step(){
    ctx.clearRect(0, 0, w, h);
    const linkDist = 150 * devicePixelRatio;

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++){
      for (let j = i + 1; j < nodes.length; j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < linkDist){
          ctx.strokeStyle = `rgba(103, 232, 249, ${0.14 * (1 - dist / linkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.fillStyle = 'rgba(34, 211, 238, 0.55)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize);
  step();
}

/* --------------------------------------------------------------------------
   Tech strip marquee content
   -------------------------------------------------------------------------- */
const STRIP_ITEMS = ['Angular','TypeScript','Node.js','PHP','Docker','Linux','Nginx','MySQL','REST API','Cloud'];
function initStrip(){
  const track = document.getElementById('stripTrack');
  const build = () => STRIP_ITEMS.map(t => `
    <span class="strip__item">
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 12l4-4 4 4-4 4-4-4zM16 8l4 4-4 4-4-4 4-4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
      ${t}
    </span>`).join('');
  track.innerHTML = build() + build();
}

/* --------------------------------------------------------------------------
   Services
   -------------------------------------------------------------------------- */
const SERVICES = [
  ['Custom Software Development','Bespoke applications engineered around your exact workflow, not a generic template.'],
  ['Web Applications','Fast, responsive web apps built to handle real business traffic and logic.'],
  ['ERP & CRM Systems','Finance, resources and customer relationships consolidated into one platform.'],
  ['Business Management Systems','Internal platforms that unify operations across teams and locations.'],
  ['Cloud Infrastructure','Architecture on AWS, GCP or Azure sized correctly for your actual traffic.'],
  ['Linux Server Administration','Provisioning, patching and hardening of production servers built to stay up.'],
  ['VPS Hosting','Managed virtual private servers monitored and maintained around the clock.'],
  ['Docker Deployment','Containerized services for consistent, repeatable, rollback-safe deployments.'],
  ['Nginx Configuration','Reverse proxy, load balancing and SSL configured for speed and reliability.'],
  ['Network Solutions','Network design and configuration for offices, clinics and retail sites.'],
  ['Cybersecurity','Audits, hardening and monitoring that treat security as a first-class feature.'],
  ['Server Hardening','Lockdown of access, ports and services to reduce your attack surface.'],
  ['Backup & Monitoring','Automated backups and uptime monitoring so failures get caught before clients do.'],
  ['Shopify Development','Full store builds — theming, product pages and checkout tuned for conversion.'],
  ['Amazon Marketplace Services','Storefront configuration and listing structure for a proper marketplace launch.'],
  ['SEO Optimization','Technical and on-page SEO so the site your team builds actually gets found.'],
  ['Meta Ads & Google Ads','Campaign setup and optimization across Meta, Google Search and Display.'],
  ['Domain Registration','Domain sourcing and DNS configuration handled correctly from day one.'],
  ['Professional Email Setup','Business email on your own domain, configured for deliverability.'],
  ['Website Maintenance','Ongoing updates, backups and monitoring after launch — not a one-time handoff.'],
];
const SERVICE_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 6L2 12l6 6M16 6l6 6-6 6M14 4l-4 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function initServices(){
  const grid = document.querySelector('.services__grid');
  grid.innerHTML = SERVICES.map(([title, desc]) => `
    <div class="service-card reveal">
      <div class="service-card__icon">${SERVICE_ICON}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>`).join('');
}

/* --------------------------------------------------------------------------
   Portfolio
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: 'boreal-forest',
    badge: 'Healthcare Technology',
    title: 'Boreal Forest',
    summary: 'A complete digital ecosystem for a hyperbaric oxygen therapy company in Tunisia — corporate site plus a full multi-center patient management platform.',
    desc: 'A complete digital ecosystem developed for a hyperbaric oxygen therapy company in Tunisia, combining a public corporate website with an internal patient management system used across three treatment centers.',
    features: ['Corporate website','Patient management system (CRM)','Appointment scheduling','Financial dashboard','Billing & invoicing','Revenue & expense analytics','Marketing management','Multi-center administration'],
    stack: ['Angular','PHP','MySQL','TypeScript','Chart.js','HTML','CSS','JavaScript'],
    cover: 'img/img1.png',
    gallery: [
      { src: 'img/img1.png', label: 'Dashboard' },
      { src: 'img/img2.png', label: 'Appointments' },
      { src: 'img/img3.png', label: 'Billing' },
      { src: 'img/img4.png', label: 'Revenue analytics' },
      { src: 'img/img5.png', label: 'Corporate website' },
      { src: 'img/img6.png', label: 'Therapy page' },
      { src: 'img/img7.png', label: 'Contact page' },
    ],
  },
  {
    id: 'eternity-olive-oil',
    badge: 'E-Commerce',
    title: 'Eternity Olive Oil',
    summary: 'A premium Shopify storefront for a Tunisian olive oil brand — full catalog, recipes and brand storytelling, built mobile-first and SEO optimized.',
    desc: 'A premium Shopify e-commerce website developed for a Tunisian olive oil brand, built to present the product range, tell the brand story and convert visitors on any device.',
    features: ['Responsive store','Product catalog','Recipe pages','Product pages','Brand story','Mobile optimized','SEO optimized'],
    stack: ['Shopify','Liquid','HTML','CSS','JavaScript'],
    cover: 'img/eternity1.png',
    gallery: [
      { src: 'img/eternity1.png', label: 'Homepage' },
      { src: 'img/eternity12.png', label: 'Recipes & lifestyle' },
      { src: 'img/eternity3.png', label: 'Catalog' },
      { src: 'img/eternity4.png', label: 'Product page' },
      { src: 'img/eternity5.png', label: 'Recipes' },
    ],
  },
  {
  id: 'dermoil',
  badge: 'Amazon Brand Management',
  title: 'Dermoil',
  summary: 'End-to-end Amazon brand development — storefront, listings and A+ Content built for conversion and long-term marketplace growth.',
  desc: 'Amazon brand development and marketplace optimization including storefront creation, product listings, A+ Content, branding and conversion optimization.',
  features: [
    'Amazon Storefront',
    'Product Listings',
    'A+ Content',
    'Brand Registry',
    'Marketplace Optimization'
  ],
  stack: [
    'Amazon Seller Central',
    'Amazon Brand Registry',
    'A+ Content',
    'SEO'
  ],
  cover: 'img/amazon1.png',
  gallery: [
    { src: 'img/amazon1.png', label: 'Amazon Homepage' },
    { src: 'img/amazon2.png', label: 'Product Listing' },
    { src: 'img/amazon3.png', label: 'Product Details' },
    { src: 'img/amazon 4.png', label: 'Storefront' }
  ],
},

{
  id: 'dental-demo',
  badge: 'Demo SaaS',
  title: 'Cabinet Dentaire',
  summary: 'Démo interactive d’un logiciel de gestion pour cabinets dentaires.',
  desc: 'Gestion des patients, rendez-vous, traitements, factures, paiements et rapports.',
  features: ['Patients', 'Rendez-vous', 'Traitements', 'Facturation', 'Rapports'],
  stack: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
  cover: 'logo.png',
  gallery: [{ src: 'logo.png', label: 'Demo cabinet dentaire' }],
  demo: 'aznavo-dental-suite (1).html'
},
{
  id: 'medical-demo',
  badge: 'Demo SaaS',
  title: 'Cabinet Médical',
  summary: 'Démo interactive d’un logiciel de gestion pour cabinets médicaux.',
  desc: 'Gestion des consultations, dossiers patients, ordonnances, rendez-vous et facturation.',
  features: ['Consultations', 'Dossiers médicaux', 'Ordonnances', 'Rendez-vous', 'Facturation'],
  stack: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
  cover: 'logo.png',
  gallery: [{ src: 'logo.png', label: 'Demo cabinet médical' }],
  demo: 'cabinet-medical.html'
},
{
  id: 'erp-crm-demo',
  badge: 'Demo SaaS',
  title: 'ERP / CRM Entreprise',
  summary: 'Démo interactive d’une solution ERP/CRM pour entreprises.',
  desc: 'Gestion des clients, ventes, factures, stock, projets, employés et rapports.',
  features: ['CRM', 'Factures', 'Stock', 'Projets', 'Employés', 'Rapports'],
  stack: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
  cover: 'logo.png',
  gallery: [{ src: 'logo.png', label: 'Demo ERP / CRM' }],
demo: 'erp-crm.html.html'}

,{
  id: 'law-demo',
  badge: 'Demo SaaS',
  title: "Cabinet d'Avocats",
  summary: "Démo interactive d'un logiciel de gestion pour cabinets d'avocats.",
  desc: "Gestion des dossiers, clients, audiences, documents, honoraires et rapports.",
  features: [
    'Dossiers',
    'Clients',
    'Audiences',
    'Documents',
    'Honoraires',
    'Rapports'
  ],
  stack: [
    'HTML',
    'CSS',
    'JavaScript',
    'Chart.js'
  ],
  cover: 'logo.png',
  gallery: [
    {
      src: 'logo.png',
      label: "Cabinet d'Avocats"
    }
  ],
  demo: 'law-demo.html.html'
}

,{
  id: 'compta-demo',
  badge: 'Demo SaaS',
  title: 'Cabinet Comptable',
  summary: "Démo interactive d'un logiciel de gestion pour cabinets comptables.",
  desc: "Gestion des clients, déclarations fiscales, écritures comptables, factures, paie, documents et échéances.",
  features: ['Clients', 'Déclarations', 'Écritures', 'Factures', 'Paie', 'Rapports'],
  stack: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
  cover: 'logo.png',
  gallery: [{ src: 'logo.png', label: 'Cabinet Comptable' }],
  demo: 'compta.html.html'
}

,{
  id: 'immobilier-demo',
  badge: 'Demo SaaS',
  title: 'Agence Immobilière',
  summary: "Démo interactive d'un logiciel de gestion pour agences immobilières.",
  desc: "Gestion des biens, clients, propriétaires, visites, contrats, agents, commissions et rapports.",
  features: [
    'Biens immobiliers',
    'Clients',
    'Propriétaires',
    'Visites',
    'Contrats',
    'Rapports'
  ],
  stack: [
    'HTML',
    'CSS',
    'JavaScript',
    'Chart.js'
  ],
  cover: 'logo.png',
  gallery: [
    {
      src: 'logo.png',
      label: 'Agence Immobilière'
    }
  ],
  demo: 'immobilier-demo.html'
}

,{
  id: 'rentcar',
  title: 'Gestion de location de voitures',
  category: 'Logiciel de gestion',
  description:
    'Application moderne pour les agences de location de voitures permettant de gérer la flotte, les réservations, les clients, les contrats PDF, les paiements et la maintenance.',
  features: [
    'Gestion de la flotte',
    'Réservations',
    'Clients',
    'Contrats PDF',
    'Paiements',
    'Maintenance',
    'Retours',
    'Rapports'
  ],
  stack: [
    'HTML',
    'CSS',
    'JavaScript',
    'Chart.js'
  ],
  cover: 'logo.png',
  gallery: [
    {
      src: 'logo.png',
      label: 'Agence Rent Car'
    }
  ],
  demo: 'location.html'
},

,{
  id: 'pharmacie-demo',
  badge: 'Demo SaaS',
  title: 'Pharmacie',
  summary: "Démo interactive d'un logiciel de gestion pour pharmacies.",
  desc: "Gestion des ventes, stock, fournisseurs, achats, ordonnances, alertes de stock, facturation et rapports.",
  features: [
    'Stock',
    'Ventes',
    'Achats',
    'Fournisseurs',
    'Ordonnances',
    'Facturation',
    'Rapports'
  ],
  stack: [
    'HTML',
    'CSS',
    'JavaScript',
    'Chart.js'
  ],
  cover: 'logo.png',
  gallery: [
    {
      src: 'logo.png',
      label: 'Pharmacie'
    }
  ],
  demo: 'pharmacie.html'
}

];

function projPlaceholderSVG(label){
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
      <rect width="1200" height="750" fill="#0F1B3C"/>
      <rect width="1200" height="750" fill="url(#g)"/>
      <defs><linearGradient id="g" x1="0" y1="0" x2="1200" y2="750">
        <stop offset="0" stop-color="#0F1B3C"/><stop offset="1" stop-color="#0A1128"/>
      </linearGradient></defs>
      <g stroke="rgba(255,255,255,0.08)">
        ${Array.from({length:16}).map((_,i)=>`<line x1="${i*80}" y1="0" x2="${i*80}" y2="750"/>`).join('')}
        ${Array.from({length:10}).map((_,i)=>`<line x1="0" y1="${i*80}" x2="1200" y2="${i*80}"/>`).join('')}
      </g>
      <text x="600" y="385" font-family="monospace" font-size="28" fill="#67E8F9" text-anchor="middle">${label}</text>
      <text x="600" y="420" font-family="monospace" font-size="14" fill="#64759A" text-anchor="middle">preview coming soon</text>
    </svg>`);
}

function initPortfolio(){
  const grid = document.getElementById('portfolioGrid');
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card reveal" data-project="${p.id}">
      <div class="project-card__media">
        <img src="${p.cover || projPlaceholderSVG(p.title)}" alt="${p.title} preview" loading="lazy">
        <span class="project-card__badge">${p.badge}</span>
      </div>
      <div class="project-card__body">
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="project-card__stack">${p.stack.slice(0,4).map(s => `<span>${s}</span>`).join('')}</div>
        <button type="button" class="btn btn--ghost btn--sm project-card__cta" data-project-open="${p.id}">
          View project
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </article>`).join('');

  grid.querySelectorAll('[data-project-open]').forEach(btn => {
    btn.addEventListener('click', () => openProjectModal(btn.dataset.projectOpen));
  });
}

/* --------------------------------------------------------------------------
   Portfolio project modal
   -------------------------------------------------------------------------- */
let activeGallery = [];
function initProjModal(){
  const modal = document.getElementById('projModal');
  const backdrop = document.getElementById('projModalBackdrop');
  const closeBtn = document.getElementById('projModalClose');

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };
  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
}

function openProjectModal(id){
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  const modal = document.getElementById('projModal');

  document.getElementById('projModalBadge').textContent = p.badge;
  document.getElementById('projModalTitle').textContent = p.title;
  document.getElementById('projModalDesc').textContent = p.desc;

  document.getElementById('projModalFeatures').innerHTML = p.features.map(f => `
    <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>${f}</li>
  `).join('');

  document.getElementById('projModalStack').innerHTML =
    p.stack.map(s => `<span>${s}</span>`).join('');

  const demoBtn = document.getElementById('projModalDemo');

  if (p.demo) {
    demoBtn.href = p.demo;
    demoBtn.style.display = 'inline-flex';
  } else {
    demoBtn.style.display = 'none';
  }

  activeGallery = p.gallery.map(g => ({
    ...g,
    resolvedSrc: g.src || projPlaceholderSVG(g.label)
  }));

  setModalImage(0);

  const thumbs = document.getElementById('projModalThumbs');
  thumbs.innerHTML = activeGallery.map((g, i) => `
    <button type="button" class="proj-modal__thumb ${i === 0 ? 'is-active' : ''}" data-thumb="${i}">
      <img src="${g.resolvedSrc}" alt="${g.label}">
      <span>${g.label}</span>
    </button>
  `).join('');

  thumbs.querySelectorAll('[data-thumb]').forEach(t => {
    t.addEventListener('click', () => setModalImage(parseInt(t.dataset.thumb, 10)));
  });

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function setModalImage(index){
  const g = activeGallery[index];
  if (!g) return;
  const heroImg = document.getElementById('projModalHeroImg');
  heroImg.src = g.resolvedSrc;
  heroImg.alt = g.label;
  document.querySelectorAll('.proj-modal__thumb').forEach((t, i) => {
    t.classList.toggle('is-active', i === index);
  });
}

/* --------------------------------------------------------------------------
   Tech stack icons (monochrome, brand-consistent set)
   -------------------------------------------------------------------------- */
const STACK = [
  ['Angular', '<path d="M12 2l9 3.2-1.4 12L12 22l-7.6-4.8L3 5.2 12 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 6l4.8 11M12 6L7.2 17M9 13h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'],
  ['TypeScript', '<rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M8 9h5M10.5 9v7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15 12.5c0-.8.7-1.3 1.6-1.3.9 0 1.5.4 1.7 1-.2.5-.7.8-1.6 1-1 .2-1.9.6-1.9 1.7 0 .9.8 1.4 1.8 1.4 1 0 1.6-.4 1.8-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'],
  ['JavaScript', '<rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M9 9v6.3c0 1.2-.6 1.7-1.5 1.7S6 16.7 6 16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M13.5 9c-1 0-1.8.5-1.8 1.4 0 2 3.6 1.3 3.6 3.3 0 .9-.8 1.5-1.8 1.5s-1.7-.5-1.9-1.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'],
  ['PHP', '<ellipse cx="12" cy="12" rx="9" ry="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M7 10h1.6c.9 0 1.4.6 1.2 1.5-.2.9-1 1.5-1.9 1.5H6.7L7 10z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M13.4 10H15c.9 0 1.4.6 1.2 1.5-.2.9-1 1.5-1.9 1.5h-1.2M13.9 9.4l-.6 5.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>'],
  ['Node.js', '<path d="M12 2l8 4.6v10.8L12 22l-8-4.6V6.6L12 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9.5 14c0 1 .8 1.6 2 1.6s1.9-.5 1.9-1.3c0-2-4-1.1-4-3.1 0-.9.8-1.5 1.9-1.5s1.9.5 2 1.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'],
  ['MySQL', '<path d="M4 6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5-3.6-2.5-8-2.5S4 4.6 4 6z" stroke="currentColor" stroke-width="1.4"/><path d="M4 6v12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V6M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" stroke="currentColor" stroke-width="1.4"/>'],
  ['Docker', '<path d="M3 13.5h18c0 3.6-3.4 6.5-9 6.5s-9-2.9-9-6.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 13.5v-3h3v3M10.5 13.5v-3h3v3M6 9v-3h3v3M10.5 9v-3h3v3M15 13.5v-3h3v3" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'],
  ['Linux', '<circle cx="12" cy="9" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M8.5 12c-1.5 1.5-2.5 4-2 7.5 1.6-1 2.7-.6 3.5.5.9 1.2 3.1 1.2 4 0 .8-1.1 1.9-1.5 3.5-.5.5-3.5-.5-6-2-7.5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'],
  ['Nginx', '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4"/><path d="M8 8v8l8-8v8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>'],
  ['Git', '<circle cx="6" cy="6" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="18" cy="12" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M6 8v8M8 12h8M8 12c0-2.5 2-4 2-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'],
  ['GitHub', '<path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9 9 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.6 1 1.5 1 2.6 0 3.9-2.4 4.8-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0012 2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'],
  ['HTML5', '<path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 6.5h10l-.4 4.5H8.7M8.4 11l.3 4 3.3 1 3.3-1 .3-3.5" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'],
  ['CSS3', '<path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M17 6.5H7l.3 3.5h9l-.5 5-3.8 1.2-3.8-1.2-.2-2" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'],
  ['REST API', '<rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 9h4M7 12h7M7 15h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'],
  ['Cloud', '<path d="M7 17a4 4 0 010-8 5 5 0 019.6-1.5A4 4 0 0118 17H7z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'],
  ['Shopify', '<path d="M6 8l1-3 9-1 2 3v11l-12 1V8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 9.5c-1.6.3-2.4 1-2.4 1.8 0 1.6 3.4.9 3.4 3 0 1.1-1 1.7-2.2 1.7-.9 0-1.6-.3-2-.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'],
  ['WordPress', '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 10l3.3 8.8M6.2 6.7l5 12.7M13 7l3.6 9.2c.5-1.6 1.9-4.7 1.9-6.4 0-1-.4-1.7-.8-2.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>'],
];
function initStack(){
  const grid = document.getElementById('stackGrid');
  grid.innerHTML = STACK.map(([name, path]) => `
    <div class="stack__item reveal">
      <svg viewBox="0 0 24 24" fill="none">${path}</svg>
      <span>${name}</span>
    </div>`).join('');
}

/* --------------------------------------------------------------------------
   Industries
   -------------------------------------------------------------------------- */
const INDUSTRIES = [
  ['Medical', '<path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'],
  ['Healthcare', '<path d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0112 6.5 5.4 5.4 0 0121.3 12C19 16.4 12 21 12 21z" stroke="currentColor" stroke-width="1.5"/>'],
  ['Retail', '<path d="M4 8l1.5-4h13L20 8M4 8h16v11H4V8zM9 8v3a3 3 0 006 0V8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'],
  ['Restaurants', '<path d="M5 3v7a2 2 0 002 2v9M5 3v6M8 3v6M11 3v7a2 2 0 01-2 2M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>'],
  ['Education', '<path d="M2 9l10-5 10 5-10 5-10-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke="currentColor" stroke-width="1.5"/>'],
  ['Corporate', '<rect x="4" y="3" width="10" height="18" stroke="currentColor" stroke-width="1.5"/><path d="M14 8h6v13h-6M7 7h1M7 11h1M7 15h1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'],
  ['Logistics', '<rect x="2" y="7" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M14 10h4l3 3v3h-7v-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.4"/><circle cx="17" cy="18" r="1.6" stroke="currentColor" stroke-width="1.4"/>'],
  ['Hospitality', '<path d="M3 20V10l9-6 9 6v10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 20v-6h6v6" stroke="currentColor" stroke-width="1.5"/>'],
  ['E-commerce', '<circle cx="9" cy="20" r="1.3" stroke="currentColor" stroke-width="1.4"/><circle cx="17" cy="20" r="1.3" stroke="currentColor" stroke-width="1.4"/><path d="M3 4h2l2.2 11.4a2 2 0 002 1.6h7.6a2 2 0 002-1.6L20 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'],
];
function initIndustries(){
  const grid = document.getElementById('industriesGrid');
  grid.innerHTML = INDUSTRIES.map(([name, path]) => `
    <div class="industry-chip reveal">
      <span class="industry-chip__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none">${path}</svg></span>
      <span>${name}</span>
    </div>`).join('');
}

/* --------------------------------------------------------------------------
   Process
   -------------------------------------------------------------------------- */
const PROCESS = [
  ['01','Consultation','Understanding your business, goals and constraints before proposing anything.'],
  ['02','Planning','Scope, timeline and technical architecture defined and agreed in writing.'],
  ['03','Design','Interfaces and system flows designed around how your team actually works.'],
  ['04','Development','Senior engineers build the system in focused, reviewable increments.'],
  ['05','Testing','Functional, security and performance testing before anything ships.'],
  ['06','Deployment','Careful rollout to production with monitoring in place from minute one.'],
  ['07','Support','Ongoing maintenance, monitoring and a direct line to the people who built it.'],
];
function initProcess(){
  const track = document.getElementById('processTrack');
  track.innerHTML = PROCESS.map(([n, title, desc]) => `
    <div class="process__step reveal">
      <div class="process__num mono">${n}</div>
      <h4>${title}</h4>
      <p>${desc}</p>
    </div>`).join('');
}

/* --------------------------------------------------------------------------
   Testimonials
   -------------------------------------------------------------------------- */
const TESTIMONIALS = [
  ['This is the first agency that actually picked up the phone six months after launch.','Amine K.','Clinic Director, Medical Center'],
  ['They rebuilt our inventory system in weeks and it hasn\u2019t gone down once since.','Sarra B.','Operations Lead, Retail Chain'],
  ['Straightforward pricing, senior engineers, no juniors learning on our project.','Youssef T.','Founder, E-commerce Startup'],
];
function initTestimonials(){
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = TESTIMONIALS.map(([quote, name, role]) => `
    <div class="testimonial-card reveal">
      <div class="testimonial-card__stars">
        ${'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 .6-5.3 4.6 1.6 7-6.3-4-6.3 4 1.6-7L2 9.6 9 9z"/></svg>'.repeat(5)}
      </div>
      <p>&ldquo;${quote}&rdquo;</p>
      <div class="testimonial-card__who">
        <div class="testimonial-card__avatar">${name.split(' ').map(w=>w[0]).join('')}</div>
        <div><strong>${name}</strong><span>${role}</span></div>
      </div>
    </div>`).join('');
}

/* --------------------------------------------------------------------------
   Pricing
   -------------------------------------------------------------------------- */
const PRICING = [
  {
    name: 'Starter Digital Presence',
    tagline: 'Get a professional presence online, done right.',
    includes: ['Website design & build','Domain registration','Web hosting','Professional email setup','Basic SEO setup'],
    featured: false,
  },
  {
    name: 'Business System',
    tagline: 'A working system your team runs day to day.',
    includes: ['Everything in Starter','Client / appointments dashboard','Custom business logic','Ongoing maintenance plan','Priority support'],
    featured: true,
  },
  {
    name: 'E-commerce Growth',
    tagline: 'A store built to sell, not just to exist.',
    includes: ['Shopify store setup','Amazon marketplace prep','SEO optimization','Meta & Google Ads setup','Analytics & tracking'],
    featured: false,
  },
  {
    name: 'Cloud & Security',
    tagline: 'Infrastructure that stays up and stays locked down.',
    includes: ['VPS provisioning','Linux & Nginx configuration','Docker deployment','Backups & monitoring','Security hardening'],
    featured: false,
  },
];
function initPricing(){
  const grid = document.getElementById('pricingGrid');
  grid.innerHTML = PRICING.map(p => `
    <div class="price-card reveal ${p.featured ? 'price-card--featured' : ''}">
      ${p.featured ? '<span class="price-card__badge">Most popular</span>' : ''}
      <h3>${p.name}</h3>
      <p class="price-card__tagline">${p.tagline}</p>
      <ul class="price-card__list">
        ${p.includes.map(i => `<li><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>${i}</li>`).join('')}
      </ul>
      <a href="#contact" class="btn ${p.featured ? 'btn--primary' : 'btn--ghost'} btn--full">Get a custom quote</a>
    </div>`).join('');
}

/* --------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */
const FAQS = [
  ['Who actually builds our project?','Our senior engineers — no unrelated subcontracting. The people you talk to during scoping are directly involved in writing the code and configuring your infrastructure.'],
  ['Do you only build websites, or do you host and maintain them too?','Both. We handle domain registration, hosting, servers and ongoing maintenance, so you have one point of contact instead of three separate vendors.'],
  ['Can you take over a project another agency left unfinished?','Yes — this is a large part of what we do. We start with a technical audit, then give you an honest assessment before any work begins.'],
  ['What industries have you worked with?','Medical centers, clinics, restaurants, hotels, gyms, retail stores, pharmacies and startups, among others — each with different compliance and operational needs.'],
  ['How is pricing structured?','Fixed scope for defined projects, or a monthly retainer for ongoing maintenance and support. You get a clear quote before anything starts.'],
  ['Do you offer support after launch?','Yes — every project includes a support window, and ongoing maintenance plans are available for ongoing updates, monitoring and fixes.'],
];
function initFaq(){
  const list = document.getElementById('faqList');
  list.innerHTML = FAQS.map((f, i) => `
    <div class="faq__item reveal" data-index="${i}">
      <button class="faq__question" aria-expanded="false">
        <span>${f[0]}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <div class="faq__answer"><p>${f[1]}</p></div>
    </div>`).join('');

  list.querySelectorAll('.faq__item').forEach(item => {
    const btn = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      list.querySelectorAll('.faq__item.is-open').forEach(open => {
        if (open !== item){
          open.classList.remove('is-open');
          open.querySelector('.faq__question').setAttribute('aria-expanded','false');
          open.querySelector('.faq__answer').style.maxHeight = null;
        }
      });
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });
}

/* --------------------------------------------------------------------------
   Scroll reveal
   -------------------------------------------------------------------------- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
}

/* --------------------------------------------------------------------------
   Animated stat counters
   -------------------------------------------------------------------------- */
function initStats(){
  const nums = document.querySelectorAll('.stats__num');
  if (!nums.length) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* --------------------------------------------------------------------------
   Service card cursor glow
   -------------------------------------------------------------------------- */
function initServiceGlow(){
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest('.service-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
}

/* --------------------------------------------------------------------------
   Contact form (front-end only demo submission)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
    }
    // إذا الفورم صحيح، لا نمنع الإرسال.
    // FormSubmit سيبعث الإيميل تلقائياً.
  });
}
