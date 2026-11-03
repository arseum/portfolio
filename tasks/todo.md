# Portfolio Arsène Maître — TODO

Plan approuvé : brutaliste/éditorial, noir + vert acide, 3D omniprésente (Three.js),
scroll cinématique (GSAP ScrollTrigger + Lenis), bilingue FR/EN, zéro build.

## Tâches
- [x] Squelette `index.html` (sections, data-i18n, CDN)
- [x] `css/style.css` — DA complète, curseur custom, responsive
- [x] `js/i18n.js` — dictionnaires FR/EN + toggle + localStorage
- [x] `js/scene.js` — particules Three.js, morphs par section, souris
- [x] `js/animations.js` — split text, reveals, compteur de section
- [x] `js/main.js` — Lenis, orchestration, curseur, liaison scroll ↔ 3D
- [x] `README.md` + `assets/`
- [x] Vérification : serveur local, console propre, FR/EN, responsive, reduced-motion
- [x] `git init` + commit
- [x] Push vers `arseum/portfolio` + GitHub Pages (après accord)
- [x] Remplacer le placeholder Damoop par de vraies captures d'écran (`assets/`)

## Revue
- Vérifié via Chrome headless + CDP (scroll réel, captures par section) :
  console propre, 5 formations de particules OK (sphère → hélice → grille →
  vortex → noyau), switch FR/EN complet, hero/sections rendus correctement.
- Robustesse ajoutée : si WebGL est indisponible, la scène 3D est désactivée
  proprement (fallback no-op) et le site reste 100 % fonctionnel.
- `prefers-reduced-motion` : animations et marquee coupés, contenu visible.

## Mise à jour 2026-10-04
- [x] À propos : 5e année ESILV (A5)
- [x] Nouveau projet P.02 « Prédiction de faillite » (FR/EN) — repo `Bankruptcy-Prediction-Project`
- [x] Ordre : Le Grind → Faillite → NLP → Damoop → FlacServices
- [x] Compétences : + TypeScript, XGBoost, Electron, SQLite ; − Django
- [x] README rédigé pour `Bankruptcy-Prediction-Project`
- [x] Capture `assets/projects/bankruptcy.webp` (courbes ROC ou tableau de résultats)
- [ ] Vérification visuelle (serveur local injoignable dans la session : contrôles statiques uniquement)

## Refonte projets — candidature stage Anthropic (2026-11-03)
Sélection : Le Grind → Pipeline LLM Pasteur → claude-mods → Mon fil sportif (app-sport) → NLP → Faillite.
- [x] Le Grind : retirer « bêta » (le site legrind.fr ne la mentionne plus)
- [x] P.02 Pipeline LLM Institut Pasteur (privé, sans lien, démo sur demande)
- [x] P.03 claude-mods / mascotte-du-jour (GitHub + visuel `claude-mods.webp`)
- [x] P.04 Mon fil sportif (app-sport) — lien + capture
- [x] Retirer Damoop et FlacServices (HTML, i18n, assets)
- [x] Compétences : + LLM/API Claude, Expo, Cloudflare Workers ; − WordPress
- [x] Contact : mettre le stage en avant
- [x] Vérification : clés i18n cohérentes FR/EN, rendu navigateur

### Revue
- Clés i18n FR/EN vérifiées par script : aucune manquante ni orpheline.
- Rendu navigateur (Playwright, 1440 px) : 6 cartes visibles, bascule EN OK.
  Seule erreur console : `bankruptcy.webp` absent (capture toujours à faire).
- Visuel claude-mods : `docs/themes.png` du repo converti en webp (68 Ko).
- Reste à fournir : lien et capture de Mon fil sportif, capture faillite, éventuel schéma du pipeline Pasteur.

## Visuels (2026-11-03, suite)
- [x] Le Grind : nouvelle capture (`tracker_poker_site/assets/dashboard.webp`, nouvelle interface)
- [x] Pasteur : schéma du pipeline (PDF → parsing → LiteLLM multi-modèles → évaluation), en attendant un vrai visuel
- [x] Faillite : courbes ROC régénérées depuis les modèles sauvegardés du repo ; AUC identiques au notebook (6 décimales)
- [x] Compétences : Docker · Kubernetes ; LLM · LiteLLM · API Claude
- [x] Pasteur : texte « API Claude » → multi-modèles via LiteLLM (Claude, Gemini, GPT confirmés dans le code)
- [x] Mon fil sportif : lien vers l'app (repo privé) + visuel 3 écrans tiré de `docs/screenshots`

## Finitions (2026-11-03, suite)
- [x] Nom sans accents partout : ARSENE MAITRE (titre, footer, meta, README, CSS)
- [x] Langue par défaut = langue du navigateur (choix manuel conservé)
- [x] Aperçu de lien : og:image 1200×630, og/twitter en anglais, titre d'onglet traduit
- [x] Lisibilité : halo sombre sous les textes posés sur les particules
- [x] Schéma Pasteur : variante 2×2 lisible sur mobile (<picture>)
- [x] Hero mobile : nom plus grand
- [x] Compétences : − « …et bien d'autres », − « Bases NoSQL », + évaluation de LLM / prompting en tête

### Revue
- Vérifié dans le navigateur à 390 px et 1440 px : nom sans accents, titre d'onglet FR/EN, langue détectée (`fr-FR` → FR, choix manuel EN conservé).
- Mobile : la version verticale du schéma Pasteur est chargée sous 900 px ; les visuels « contain » prennent leur hauteur naturelle (477 / 208 / 186 px au lieu de 140).
- Corrigé en passant : les cartes décalées avant leur animation élargissaient la page sur mobile (419 px pour 379) → `main { overflow-x: clip }`.
- `assets/og.png` (1200×630) : ne s'affichera dans les aperçus qu'une fois le site publié sur GitHub Pages.
- Non fait, à la demande : CV (à refaire), ligne « recherche de stage », texte À propos.
