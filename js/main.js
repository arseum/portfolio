// Orchestration : Lenis (smooth scroll), curseur custom, scène 3D, i18n, animations.

import { createScene } from './scene.js';
import { initAnimations, refreshSplits } from './animations.js';
import { initI18n } from './i18n.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---------- i18n (avant les splits de texte) ----------

initI18n({ onApplied: () => refreshSplits() });

// ---------- Smooth scroll (Lenis) + GSAP ticker ----------

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
if (!REDUCED) {
  lenis = new Lenis({ lerp: 0.09 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Ancres de navigation via Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    });
  });
}

// ---------- Scène 3D ----------

// Fallback no-op si WebGL est indisponible : le site reste 100 % fonctionnel
let scene = { setProgress() {}, setMouse() {} };
try {
  scene = createScene(document.getElementById('webgl'));
} catch (err) {
  console.warn('WebGL indisponible — scène 3D désactivée.', err);
}

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  scene.setProgress(max > 0 ? scrollY / max : 0);
}
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();

if (FINE_POINTER) {
  addEventListener('mousemove', (e) => scene.setMouse(e.clientX, e.clientY), { passive: true });
}

// ---------- Curseur custom ----------

if (FINE_POINTER) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { x: pos.x, y: pos.y };

  addEventListener('mousemove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
  }, { passive: true });

  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.16;
    ringPos.y += (pos.y - ringPos.y) * 0.16;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll('[data-hover]').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ---------- Animations scroll ----------

initAnimations();
