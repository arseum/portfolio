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
- [ ] Push vers `arseum/portfolio` + GitHub Pages (après accord)
- [ ] Remplacer le placeholder Damoop par de vraies captures d'écran (`assets/`)

## Revue
- Vérifié via Chrome headless + CDP (scroll réel, captures par section) :
  console propre, 5 formations de particules OK (sphère → hélice → grille →
  vortex → noyau), switch FR/EN complet, hero/sections rendus correctement.
- Robustesse ajoutée : si WebGL est indisponible, la scène 3D est désactivée
  proprement (fallback no-op) et le site reste 100 % fonctionnel.
- `prefers-reduced-motion` : animations et marquee coupés, contenu visible.
