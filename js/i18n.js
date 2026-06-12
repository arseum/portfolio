// i18n FR/EN — dictionnaires + toggle persisté en localStorage

const DICT = {
  fr: {
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',

    'hero.kicker': 'Portfolio — 2026',
    'hero.subtitle': 'Ingénieur IA & Data — je transforme des données brutes en systèmes intelligents.',
    'hero.scroll': 'défiler',

    'about.title': 'À PROPOS',
    'about.lead': "Étudiant ingénieur à l'ESILV en majeure DIA — Intelligence Artificielle & Data — et alternant data à l'Institut Pasteur.",
    'about.p1': "Après un DUT informatique, j'ai choisi de me spécialiser dans l'IA et la data : NLP, machine learning, ingénierie de données et plateformes de recherche.",
    'about.p2': "Également auto-entrepreneur depuis mars 2026, je conçois des sites et des solutions sur mesure pour des indépendants et des petites structures.",
    'about.f1': 'Majeure DIA — IA & Data, ESILV',
    'about.f2': 'Alternant — Institut Pasteur',
    'about.f3': 'DUT Informatique',
    'about.f4': 'Auto-entrepreneur',

    'projects.title': 'PROJETS',
    'projects.visit': 'Voir le site',
    'projects.private': 'PRIVÉ',
    'projects.p1.desc': "Boutique en ligne d'un auto-entrepreneur, conçue et développée en solo : thème, tunnel de commande et personnalisations.",
    'projects.p2.name': "ANALYSE D'AVIS CLIENTS — ASSURANCES",
    'projects.p2.desc': "Pipeline NLP complet sur des avis d'assureurs : topic modeling (LDA), embeddings (Word2Vec, sentence-transformers), classification de sentiment (TF-IDF + LR/SVM, réseau de neurones) et recherche sémantique (FAISS).",
    'projects.p3.desc': "Plateforme de recherche (ESILV) qui automatise la génération, l'évaluation et la comparaison de modèles de données NoSQL. À partir d'un schéma UML/XMI et d'une charge de travail, un pipeline Java applique deux heuristiques (MDG, Naive) et score les variantes sur trois axes — coût, stabilité, CO₂/énergie — via une API Flask consommée par un dashboard React.",
    'projects.p3.note': "Dépôt privé — captures d'écran sur demande",

    'skills.title': 'COMPÉTENCES',
    'skills.c1': 'LANGAGES',
    'skills.c2': 'IA & DATA',
    'skills.c3': 'FRAMEWORKS',
    'skills.c4': 'OUTILS',
    'skills.nosql': 'Bases NoSQL',
    'skills.more': '…et bien d’autres',

    'contact.title': 'CONTACT',
    'contact.pitch': 'Un projet, une alternance, une mission freelance ?',
    'footer.legal': 'Auto-entrepreneur — SIRET 104 041 017 00013',
    'footer.made': 'Conçu & codé à la main — Three.js / GSAP',
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',

    'hero.kicker': 'Portfolio — 2026',
    'hero.subtitle': 'AI & Data Engineer — I turn raw data into intelligent systems.',
    'hero.scroll': 'scroll',

    'about.title': 'ABOUT',
    'about.lead': 'Engineering student at ESILV, majoring in DIA — Artificial Intelligence & Data — and data apprentice at Institut Pasteur.',
    'about.p1': 'After a two-year CS degree (DUT), I chose to specialize in AI and data: NLP, machine learning, data engineering and research platforms.',
    'about.p2': 'Also a freelance developer since March 2026, I build websites and tailor-made solutions for independents and small businesses.',
    'about.f1': 'DIA Major — AI & Data, ESILV',
    'about.f2': 'Apprentice — Institut Pasteur',
    'about.f3': 'CS Degree (DUT)',
    'about.f4': 'Freelance developer',

    'projects.title': 'PROJECTS',
    'projects.visit': 'Visit site',
    'projects.private': 'PRIVATE',
    'projects.p1.desc': 'Online shop for a sole trader, designed and built solo: theme, checkout flow and custom features.',
    'projects.p2.name': 'CUSTOMER REVIEWS ANALYSIS — INSURANCE',
    'projects.p2.desc': 'End-to-end NLP pipeline on insurance customer reviews: topic modeling (LDA), embeddings (Word2Vec, sentence-transformers), sentiment classification (TF-IDF + LR/SVM, neural network) and semantic search (FAISS).',
    'projects.p3.desc': 'Research platform (ESILV) that automates the generation, evaluation and comparison of NoSQL data models. From a UML/XMI schema and a workload description, a Java pipeline applies two heuristics (MDG, Naive) and scores candidate models on three axes — cost, stability, CO₂/energy — through a Flask API consumed by a React dashboard.',
    'projects.p3.note': 'Private repository — screenshots on request',

    'skills.title': 'SKILLS',
    'skills.c1': 'LANGUAGES',
    'skills.c2': 'AI & DATA',
    'skills.c3': 'FRAMEWORKS',
    'skills.c4': 'TOOLS',
    'skills.nosql': 'NoSQL databases',
    'skills.more': '…and many more',

    'contact.title': 'CONTACT',
    'contact.pitch': 'A project, an apprenticeship, a freelance gig?',
    'footer.legal': 'Sole trader — SIRET 104 041 017 00013',
    'footer.made': 'Designed & hand-coded — Three.js / GSAP',
  },
};

let current = localStorage.getItem('lang') || 'fr';

export function getLang() {
  return current;
}

export function applyLang(lang, { onApplied } = {}) {
  if (!DICT[lang]) return;
  current = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const value = DICT[lang][key];
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('.lang-toggle__opt').forEach((opt) => {
    opt.classList.toggle('is-active', opt.dataset.lang === lang);
  });

  if (onApplied) onApplied(lang);
}

export function initI18n({ onApplied } = {}) {
  const toggle = document.querySelector('.lang-toggle');
  toggle.addEventListener('click', () => {
    applyLang(current === 'fr' ? 'en' : 'fr', { onApplied });
  });
  // Applique la langue persistée (ou fr) au chargement
  applyLang(current, { onApplied });
}
