// Scène Three.js — nuage de particules omniprésent qui se métamorphose au scroll.
// 5 formations (une par section), interpolées en fonction de la progression globale.

import * as THREE from 'three';

const IS_MOBILE = matchMedia('(max-width: 768px), (pointer: coarse)').matches;
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COUNT = IS_MOBILE ? 3000 : 8000;

// ---------- Formations ----------

function sphereBurst() {
  // Hero : sphère éclatée
  const arr = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const r = 7 * (0.55 + Math.random() * 0.9);
    arr[i * 3] = r * s * Math.cos(phi);
    arr[i * 3 + 1] = r * u;
    arr[i * 3 + 2] = r * s * Math.sin(phi);
  }
  return arr;
}

function helix() {
  // About : double hélice décalée sur la droite
  const arr = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT;
    const strand = i % 2 === 0 ? 0 : Math.PI;
    const angle = t * Math.PI * 10 + strand;
    const jitter = () => (Math.random() - 0.5) * 0.9;
    arr[i * 3] = Math.cos(angle) * 3.2 + 4.5 + jitter();
    arr[i * 3 + 1] = (t - 0.5) * 16 + jitter();
    arr[i * 3 + 2] = Math.sin(angle) * 3.2 + jitter();
  }
  return arr;
}

function gridPlane() {
  // Projets : grille de points ondulée, en fond
  const arr = new Float32Array(COUNT * 3);
  const side = Math.ceil(Math.sqrt(COUNT));
  for (let i = 0; i < COUNT; i++) {
    const x = (i % side) / side - 0.5;
    const y = Math.floor(i / side) / side - 0.5;
    arr[i * 3] = x * 26;
    arr[i * 3 + 1] = y * 16;
    arr[i * 3 + 2] = Math.sin(x * 14) * Math.cos(y * 14) * 1.6 - 4;
  }
  return arr;
}

function vortex() {
  // Skills : tourbillon conique
  const arr = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT;
    const angle = t * Math.PI * 16;
    const r = 1 + t * 8;
    arr[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5);
    arr[i * 3 + 1] = (0.5 - t) * 14 + (Math.random() - 0.5);
    arr[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5);
  }
  return arr;
}

function corePoint() {
  // Contact : convergence en un noyau dense
  const arr = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const r = Math.pow(Math.random(), 2.2) * 2.4;
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    arr[i * 3] = r * s * Math.cos(phi);
    arr[i * 3 + 1] = r * u;
    arr[i * 3 + 2] = r * s * Math.sin(phi);
  }
  return arr;
}

// ---------- Shaders ----------

const VERT = /* glsl */ `
  attribute float aRand;
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uPixelRatio;
  varying float vRand;
  varying float vDist;

  void main() {
    vec3 p = position;

    // Ondulation organique
    p.x += sin(uTime * 0.6 + aRand * 40.0) * 0.12;
    p.y += cos(uTime * 0.5 + aRand * 60.0) * 0.12;

    // Répulsion souris
    vec3 toMouse = p - uMouse;
    float d = length(toMouse);
    float force = smoothstep(3.5, 0.0, d);
    p += normalize(toMouse + 0.0001) * force * 1.8;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + aRand * 2.2) * uPixelRatio * (18.0 / -mv.z);

    vRand = aRand;
    vDist = force;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vRand;
  varying float vDist;

  void main() {
    // Point rond avec halo doux
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d);

    // Mix blanc cassé / vert acide ; les points repoussés s'allument
    vec3 color = mix(uColorA, uColorB, step(0.82, vRand));
    color = mix(color, uColorB, vDist);

    gl_FragColor = vec4(color, alpha * (0.35 + vRand * 0.5));
  }
`;

// ---------- Scène ----------

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.028);

  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
  camera.position.z = 14;

  const formations = [sphereBurst(), helix(), gridPlane(), vortex(), corePoint()];

  const positions = new Float32Array(formations[0]);
  const rands = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) rands[i] = Math.random();

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRand', new THREE.BufferAttribute(rands, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uPixelRatio: { value: Math.min(devicePixelRatio, 2) },
      uColorA: { value: new THREE.Color(0xf2f0ea) },
      uColorB: { value: new THREE.Color(0xc8ff00) },
    },
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // ---------- État piloté de l'extérieur ----------

  let progress = 0; // 0..1 sur tout le document
  const mouseNDC = new THREE.Vector2(99, 99);
  const mouseTarget = new THREE.Vector3(999, 999, 999);
  const raycaster = new THREE.Raycaster();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  function setProgress(p) {
    progress = Math.min(Math.max(p, 0), 1);
  }

  function setMouse(clientX, clientY) {
    mouseNDC.set((clientX / innerWidth) * 2 - 1, -(clientY / innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouseNDC, camera);
    raycaster.ray.intersectPlane(mousePlane, mouseTarget);
  }

  // ---------- Boucle ----------

  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const clock = new THREE.Clock();

  function tick() {
    const t = clock.getElapsedTime();
    material.uniforms.uTime.value = t;
    material.uniforms.uMouse.value.lerp(mouseTarget, 0.08);

    // Morph : segment courant + interpolation locale adoucie
    const segments = formations.length - 1;
    const scaled = progress * segments;
    const idx = Math.min(Math.floor(scaled), segments - 1);
    const local = easeInOut(scaled - idx);
    const from = formations[idx];
    const to = formations[idx + 1];

    const pos = geometry.attributes.position.array;
    const speed = REDUCED ? 1 : 0.055;
    for (let i = 0; i < pos.length; i++) {
      const target = from[i] + (to[i] - from[i]) * local;
      pos[i] += (target - pos[i]) * speed;
    }
    geometry.attributes.position.needsUpdate = true;

    // Rotation lente + inclinaison vers la souris
    if (!REDUCED) {
      const hasMouse = mouseNDC.x !== 99;
      points.rotation.y = t * 0.05 + (hasMouse ? mouseNDC.x * 0.12 : 0);
      points.rotation.x = hasMouse ? -mouseNDC.y * 0.08 : 0;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  // ---------- Resize ----------

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    material.uniforms.uPixelRatio.value = Math.min(devicePixelRatio, 2);
  });

  return { setProgress, setMouse };
}
