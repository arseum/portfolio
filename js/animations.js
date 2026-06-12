// Animations scroll-driven : split text, reveals, compteur de section.
// gsap / ScrollTrigger sont chargés en globals (CDN).

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Split text ----------

export function splitChars(el) {
  // Re-splittable : repart toujours du texte brut courant
  const text = el.dataset.splitSource ?? el.textContent;
  el.dataset.splitSource = text;
  el.innerHTML = '';
  for (const ch of text) {
    const span = document.createElement('span');
    span.className = 'char';
    span.innerHTML = ch === ' ' ? '&nbsp;' : ch;
    el.appendChild(span);
  }
  return el.querySelectorAll('.char');
}

// L'email contient un <span class="accent"> : on splitte en préservant les nœuds
function splitCharsKeepMarkup(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const frag = document.createDocumentFragment();
    for (const ch of node.textContent) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      frag.appendChild(span);
    }
    node.replaceWith(frag);
  });
  return el.querySelectorAll('.char');
}

// ---------- Animations par élément ----------

function animateTitle(el, chars) {
  gsap.fromTo(
    chars,
    { yPercent: 110, rotate: 4 },
    {
      yPercent: 0,
      rotate: 0,
      stagger: 0.025,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    }
  );
}

export function initAnimations() {
  if (REDUCED) {
    // Pas d'animation : tout reste visible, on branche juste le compteur
    initSectionCounter();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // --- Hero : intro au chargement ---
  const heroChars = [];
  document.querySelectorAll('.hero__title .split').forEach((el) => {
    heroChars.push(...splitChars(el));
  });
  gsap.set('.hero .reveal, .hero__scroll', { opacity: 0, y: 24 });
  gsap
    .timeline({ delay: 0.15 })
    .fromTo(
      heroChars,
      { yPercent: 110, rotate: 6 },
      { yPercent: 0, rotate: 0, stagger: 0.04, duration: 1.1, ease: 'power4.out' }
    )
    .to('.hero .reveal', { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out' }, '-=0.5')
    .to('.hero__scroll', { opacity: 1, y: 0, duration: 0.6 }, '<');

  // --- Titres de section ---
  document.querySelectorAll('.section__title .split').forEach((el) => {
    animateTitle(el, splitChars(el));
  });

  // --- Email géant ---
  const email = document.querySelector('.contact__email .split');
  if (email) animateTitle(email, splitCharsKeepMarkup(email));

  // --- Reveals génériques (hors hero, géré ci-dessus) ---
  document.querySelectorAll('.section:not(.hero) .reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  // --- Cartes projet : glissement latéral alterné ---
  document.querySelectorAll('.reveal-card').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      }
    );
  });

  // --- Lignes d'en-tête de section qui se "dessinent" ---
  document.querySelectorAll('.section__head').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('is-drawn'),
    });
  });

  initSectionCounter();
}

// ---------- Compteur de section fixe ----------

function initSectionCounter() {
  const counter = document.querySelector('.section-counter__current');
  if (!counter) return;
  const sections = document.querySelectorAll('.section[data-section]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) counter.textContent = entry.target.dataset.section;
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}

// ---------- Re-split après changement de langue ----------

export function refreshSplits() {
  if (REDUCED) return;
  // Les titres traduits ont changé de texte : on re-splitte sans rejouer l'intro
  document.querySelectorAll('.section__title .split').forEach((el) => {
    delete el.dataset.splitSource;
    splitChars(el);
  });
}
