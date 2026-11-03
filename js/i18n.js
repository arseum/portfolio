// i18n FR/EN — dictionnaires + toggle persisté en localStorage

const DICT = {
  fr: {
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',

    'meta.title': 'Arsene Maitre — Ingénieur IA & Data',
    'hero.kicker': 'Portfolio — 2026',
    'hero.subtitle': 'Ingénieur IA & Data',
    'hero.scroll': 'défiler',

    'about.title': 'À PROPOS',
    'about.lead': "Étudiant ingénieur en 5e année à l'ESILV, majeure DIA — Intelligence Artificielle & Data — et alternant data à l'Institut Pasteur.",
    'about.p1': "Après un DUT informatique, j'ai choisi de me spécialiser dans l'IA et la data : LLM, NLP, machine learning et ingénierie de données.",
    'about.p2': "Également auto-entrepreneur depuis mars 2026, je conçois des sites et des solutions sur mesure pour des indépendants et des petites structures.",
    'about.f1': 'Majeure DIA — IA & Data, ESILV',
    'about.f2': 'Alternant — Institut Pasteur',
    'about.f3': 'DUT Informatique',
    'about.f4': 'Auto-entrepreneur',

    'projects.title': 'PROJETS',
    'projects.visit': 'Voir le site',
    'projects.open': "Ouvrir l'app",
    'projects.grind.desc': "Application desktop (Mac, Windows, Linux) qui analyse automatiquement les mains Winamax : statistiques détaillées, sessions, replayer de mains, courbes de gains, calculateur d'équité et solver préflop. Conçue et développée en solo — Electron, SQLite, IPC typé, mises à jour automatiques, télémétrie anonyme opt-in — et distribuée gratuitement.",
    'projects.pasteur.name': 'EXTRACTION SCIENTIFIQUE PAR LLM',
    'projects.pasteur.desc': "Projet principal de mes deux ans d'alternance à l'Institut Pasteur. Le pipeline lit des articles scientifiques en PDF (GROBID, Docling), isole les sections, les légendes de figures et les suppléments, puis extrait par LLM les protocoles d'imagerie : microscopes, objectifs, types d'expériences. Chaque configuration (modèle, prompt système, texte complet ou non) est mesurée contre une vérité terrain annotée, en comparant les modèles du marché (Claude, Gemini, GPT) via LiteLLM.",
    'projects.pasteur.note': 'Code interne — démo sur demande',
    'projects.mods.desc': "Plugin pour Claude Code : une mascotte en pixel art animée vit au-dessus du prompt. Chaque jour, Claude choisit lui-même son thème parmi 18 et une phrase sur son humeur. Branchée sur les hooks, elle réagit en direct à ce que fait l'agent : lecture de fichiers, édition, commandes, recherches web, sous-agents, erreurs répétées, commits. Terminal et app Desktop (SVG animé), en français et en anglais.",
    'projects.sport.name': 'MON FIL SPORTIF',
    'projects.sport.desc': "Application mobile qui réunit en un seul fil les prochains événements des équipes et sportifs que l'on suit, tous sports et e-sport confondus : foot, tennis, cyclisme, F1, League of Legends… Notifications avant le début, résultats ensuite. Côté serveur, les données sont récupérées une fois par compétition et non par utilisateur, pour passer de 1 à 50 000 utilisateurs sans refonte.",
    'projects.nlp.name': "ANALYSE D'AVIS CLIENTS — ASSURANCES",
    'projects.nlp.desc': "Pipeline NLP complet sur des avis d'assureurs : topic modeling (LDA), embeddings (Word2Vec, sentence-transformers), classification de sentiment (TF-IDF + LR/SVM, réseau de neurones) et recherche sémantique (FAISS).",
    'projects.bankruptcy.name': 'PRÉDICTION DE FAILLITE',
    'projects.bankruptcy.desc': "Prédiction de la faillite d'entreprises à partir de ratios financiers (92 000 bilans, 0,6 % de faillites) : nettoyage, EDA, SMOTE, comparaison de quatre modèles (régression logistique, SVM, Random Forest, XGBoost) et tuning des hyperparamètres. Random Forest retenu : ROC AUC 0,99, 87 % des faillites détectées.",

    'skills.title': 'COMPÉTENCES',
    'skills.c1': 'LANGAGES',
    'skills.c2': 'IA & DATA',
    'skills.c3': 'FRAMEWORKS',
    'skills.c4': 'OUTILS',
    'skills.llmeval': 'Évaluation de LLM · prompting',

    'contact.title': 'CONTACT',
    'contact.pitch': 'Un stage, un projet, une mission freelance ?',
    'footer.legal': 'Auto-entrepreneur — SIRET 104 041 017 00013',
    'footer.made': 'WEBGL · GSAP · LENIS',
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',

    'meta.title': 'Arsene Maitre — AI & Data Engineer',
    'hero.kicker': 'Portfolio — 2026',
    'hero.subtitle': 'AI & Data Engineer',
    'hero.scroll': 'scroll',

    'about.title': 'ABOUT',
    'about.lead': 'Final-year engineering student at ESILV, majoring in DIA — Artificial Intelligence & Data — and data apprentice at Institut Pasteur.',
    'about.p1': 'After a two-year CS degree (DUT), I chose to specialize in AI and data: LLMs, NLP, machine learning and data engineering.',
    'about.p2': 'Also a freelance developer since March 2026, I build websites and tailor-made solutions for independents and small businesses.',
    'about.f1': 'DIA Major — AI & Data, ESILV',
    'about.f2': 'Apprentice — Institut Pasteur',
    'about.f3': 'CS Degree (DUT)',
    'about.f4': 'Freelance developer',

    'projects.title': 'PROJECTS',
    'projects.visit': 'Visit site',
    'projects.open': 'Open the app',
    'projects.grind.desc': 'Desktop app (Mac, Windows, Linux) that automatically analyses Winamax hands: detailed statistics, sessions, hand replayer, profit graphs, equity calculator and a preflop solver. Designed and built solo — Electron, SQLite, typed IPC, auto-updates, opt-in anonymous telemetry — and distributed for free.',
    'projects.pasteur.name': 'LLM SCIENTIFIC EXTRACTION',
    'projects.pasteur.desc': 'Main project of my two-year apprenticeship at Institut Pasteur. The pipeline reads scientific papers as PDFs (GROBID, Docling), isolates sections, figure legends and supplements, then uses an LLM to extract imaging protocols: microscopes, objectives, experiment types. Every configuration (model, system prompt, full text or not) is scored against an annotated ground truth, benchmarking market models (Claude, Gemini, GPT) through LiteLLM.',
    'projects.pasteur.note': 'Internal code — demo on request',
    'projects.mods.desc': 'Plugin for Claude Code: an animated pixel-art mascot lives above the prompt. Every day, Claude itself picks its theme out of 18, plus a line about its mood. Wired into hooks, it reacts live to what the agent is doing: reading files, editing, running commands, web searches, subagents, repeated errors, commits. Terminal and Desktop app (animated SVG), in English and French.',
    'projects.sport.name': 'MON FIL SPORTIF',
    'projects.sport.desc': 'Mobile app that gathers, in a single feed, the upcoming events of the teams and athletes you follow, across sports and esports: football, tennis, cycling, F1, League of Legends… Notifications before kick-off, results afterwards. On the server, data is fetched once per competition rather than per user, so it scales from 1 to 50,000 users without a rewrite.',
    'projects.nlp.name': 'CUSTOMER REVIEWS ANALYSIS — INSURANCE',
    'projects.nlp.desc': 'End-to-end NLP pipeline on insurance customer reviews: topic modeling (LDA), embeddings (Word2Vec, sentence-transformers), sentiment classification (TF-IDF + LR/SVM, neural network) and semantic search (FAISS).',
    'projects.bankruptcy.name': 'BANKRUPTCY PREDICTION',
    'projects.bankruptcy.desc': 'Predicting corporate bankruptcy from financial ratios (92,000 company-years, 0.6 % bankruptcies): data cleaning, EDA, SMOTE, comparison of four models (logistic regression, SVM, Random Forest, XGBoost) and hyperparameter tuning. Selected model, Random Forest: 0.99 ROC AUC, 87 % of bankruptcies detected.',

    'skills.title': 'SKILLS',
    'skills.c1': 'LANGUAGES',
    'skills.c2': 'AI & DATA',
    'skills.c3': 'FRAMEWORKS',
    'skills.c4': 'TOOLS',
    'skills.llmeval': 'LLM evaluation · prompting',

    'contact.title': 'CONTACT',
    'contact.pitch': 'An internship, a project, a freelance gig?',
    'footer.legal': 'Sole trader — SIRET 104 041 017 00013',
    'footer.made': 'WEBGL · GSAP · LENIS',
  },
};

// Sans choix enregistré : langue du navigateur (français si fr-*, sinon anglais)
let current = localStorage.getItem('lang') || (navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en');

export function getLang() {
  return current;
}

export function applyLang(lang, { onApplied } = {}) {
  if (!DICT[lang]) return;
  current = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.title = DICT[lang]['meta.title'];

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
  // Applique la langue persistée (ou celle du navigateur) au chargement
  applyLang(current, { onApplied });
}
