"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * NeuralGalaxy
 *
 * Two coexisting particle worlds:
 *   A — orderly book lattice: points laid out on stacked "page" planes
 *   B — latent embedding cloud: same N points dispersed across a 3D gaussian
 *
 * Page scroll drives a uniform `uMorph` 0 → 1 (lattice → cloud).
 * Also draws faint connection lines for the "neural network" feel.
 *
 * Intentionally lightweight: a single BufferGeometry + a shader material.
 */
export default function NeuralGalaxy() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const COUNT = 9000;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 9);

    // --- Particle attributes ---
    const aLatt = new Float32Array(COUNT * 3); // ordered lattice
    const aCloud = new Float32Array(COUNT * 3); // gaussian cloud
    const aSeed = new Float32Array(COUNT);
    const aHue  = new Float32Array(COUNT);

    const rows = 60, cols = 60, pages = Math.ceil(COUNT / (rows * cols));
    let i = 0;
    for (let p = 0; p < pages && i < COUNT; p++) {
      for (let r = 0; r < rows && i < COUNT; r++) {
        for (let c = 0; c < cols && i < COUNT; c++) {
          // Book lattice: pages stacked along Z, rows × cols across X/Y
          const x = (c / (cols - 1) - 0.5) * 6.0;
          const y = (r / (rows - 1) - 0.5) * 4.0;
          const z = (p - pages / 2) * 0.18;
          aLatt[i * 3 + 0] = x;
          aLatt[i * 3 + 1] = y;
          aLatt[i * 3 + 2] = z;

          // Latent cloud: gaussian-ish noise
          const t = Math.random();
          const r1 = Math.sqrt(-2 * Math.log(Math.max(1e-6, t))) * Math.cos(2 * Math.PI * Math.random());
          const r2 = Math.sqrt(-2 * Math.log(Math.max(1e-6, t))) * Math.sin(2 * Math.PI * Math.random());
          const r3 = (Math.random() - 0.5) * 4.0;
          aCloud[i * 3 + 0] = r1 * 2.2;
          aCloud[i * 3 + 1] = r2 * 2.2;
          aCloud[i * 3 + 2] = r3;

          aSeed[i] = Math.random();
          // Hue: a small fraction drift toward warm (ember) on the cloud side
          aHue[i] = Math.random();
          i++;
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("aLatt", new THREE.BufferAttribute(aLatt, 3));
    geo.setAttribute("aCloud", new THREE.BufferAttribute(aCloud, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    geo.setAttribute("aHue", new THREE.BufferAttribute(aHue, 1));

    const uniforms = {
      uTime:   { value: 0 },
      uMorph:  { value: 0 },     // 0 = lattice, 1 = cloud
      uSize:   { value: 1.6 * Math.min(window.devicePixelRatio, 2) },
      uPixel:  { value: renderer.getPixelRatio() },
      uViewportH: { value: mount.clientHeight },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aLatt;
        attribute vec3 aCloud;
        attribute float aSeed;
        attribute float aHue;
        uniform float uTime;
        uniform float uMorph;
        uniform float uSize;
        uniform float uPixel;
        uniform float uViewportH;
        varying float vHue;
        varying float vAlpha;
        void main() {
          // Easing
          float m = smoothstep(0.0, 1.0, uMorph);
          // Slight breathing wobble even at rest
          float wobble = sin(uTime * 0.6 + aSeed * 6.2831) * 0.04;
          vec3 pos = mix(aLatt, aCloud, m);
          pos += normalize(pos + 0.0001) * wobble * (0.6 + 0.4 * m);

          // Slow rotation of the whole field
          float a = uTime * 0.04 + m * 0.6;
          float ca = cos(a), sa = sin(a);
          vec3 rot = vec3(ca * pos.x - sa * pos.z, pos.y, sa * pos.x + ca * pos.z);

          vec4 mv = modelViewMatrix * vec4(rot, 1.0);
          gl_Position = projectionMatrix * mv;

          float pointSize = uSize * (1.0 + 1.4 * (1.0 - m)) * (300.0 / -mv.z);
          gl_PointSize = pointSize;

          vHue = aHue;
          // Fade near edges of lattice for depth
          float depthFade = clamp(1.4 + mv.z * 0.07, 0.15, 1.0);
          vAlpha = mix(0.85, 0.6, m) * depthFade;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vHue;
        varying float vAlpha;
        // Three accent colors of the site palette
        const vec3 PHOTON = vec3(0.49, 0.83, 0.99);
        const vec3 LATENT = vec3(0.66, 0.55, 0.98);
        const vec3 EMBER  = vec3(0.98, 0.75, 0.14);
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float falloff = smoothstep(0.5, 0.0, d);
          // Hue band: photon → latent with rare ember pop
          vec3 col = mix(PHOTON, LATENT, smoothstep(0.0, 0.7, vHue));
          col = mix(col, EMBER, smoothstep(0.93, 1.0, vHue) * 0.9);
          float core = pow(falloff, 2.0);
          gl_FragColor = vec4(col * (0.55 + core * 0.7), falloff * vAlpha);
        }
      `,
    });

    const points = new THREE.Points(geo, material);
    scene.add(points);

    // --- Connection lines (subtle neural net) ---
    // pick ~250 lines between nearby lattice points for the "book" structure
    const lineCount = 280;
    const linePositions = new Float32Array(lineCount * 2 * 3);
    const lineAlpha = new Float32Array(lineCount * 2);
    for (let l = 0; l < lineCount; l++) {
      const a = Math.floor(Math.random() * COUNT);
      // pick a neighbor in the same page-ish slice
      let b = a + Math.floor((Math.random() - 0.5) * 80);
      b = Math.max(0, Math.min(COUNT - 1, b));
      linePositions[l * 6 + 0] = aLatt[a * 3 + 0];
      linePositions[l * 6 + 1] = aLatt[a * 3 + 1];
      linePositions[l * 6 + 2] = aLatt[a * 3 + 2];
      linePositions[l * 6 + 3] = aLatt[b * 3 + 0];
      linePositions[l * 6 + 4] = aLatt[b * 3 + 1];
      linePositions[l * 6 + 5] = aLatt[b * 3 + 2];
      lineAlpha[l * 2 + 0] = 0.0;
      lineAlpha[l * 2 + 1] = 0.0;
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x9aa6c8,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // --- Scroll-driven morph ---
    let morphTarget = 0;
    const onScroll = () => {
      // 0 at top, ~1 after one viewport scrolled
      const y = window.scrollY;
      const h = window.innerHeight;
      morphTarget = Math.min(1, y / (h * 1.6));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Mouse parallax ---
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const w = mount.clientWidth, h = mount.clientHeight;
      mouse.x = (e.clientX / w) * 2 - 1;
      mouse.y = (e.clientY / h) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    // --- Resize ---
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uViewportH.value = h;
    };
    window.addEventListener("resize", onResize);

    // --- RAF ---
    const clock = new THREE.Clock();
    let frame = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      uniforms.uMorph.value += (morphTarget - uniforms.uMorph.value) * 0.04;

      // gentle camera parallax
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // line opacity fades as we morph away from the lattice
      lineMat.opacity = (1 - uniforms.uMorph.value) * 0.12;
      lines.rotation.y = t * 0.04 + uniforms.uMorph.value * 0.6;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10"
      aria-hidden
      style={{ pointerEvents: "none" }}
    />
  );
}
