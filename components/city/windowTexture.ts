import * as THREE from "three";

// Procedurally paints a "lit windows at night" emissive texture on a canvas.
// Cached per accent colour so we don't rebuild identical textures.
const cache = new Map<string, THREE.CanvasTexture>();

export function makeWindowTexture(accent: string): THREE.CanvasTexture {
  const cached = cache.get(accent);
  if (cached) return cached;

  const w = 128;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Dark glass base
  ctx.fillStyle = "#0a1018";
  ctx.fillRect(0, 0, w, h);

  const cols = 8;
  const rows = 22;
  const gapX = w / cols;
  const gapY = h / rows;
  const winW = gapX * 0.62;
  const winH = gapY * 0.5;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = Math.random();
      const x = c * gapX + (gapX - winW) / 2;
      const y = r * gapY + (gapY - winH) / 2;
      if (lit > 0.62) {
        // warm vs accent-tinted window mix
        const warm = Math.random() > 0.5;
        ctx.fillStyle = warm
          ? `rgba(255, 224, 170, ${0.5 + Math.random() * 0.5})`
          : hexToRgba(accent, 0.45 + Math.random() * 0.5);
      } else {
        ctx.fillStyle = "rgba(120, 150, 190, 0.06)";
      }
      ctx.fillRect(x, y, winW, winH);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  cache.set(accent, tex);
  return tex;
}

function hexToRgba(hex: string, a: number) {
  const v = hex.replace("#", "");
  const r = parseInt(v.substring(0, 2), 16);
  const g = parseInt(v.substring(2, 4), 16);
  const b = parseInt(v.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
