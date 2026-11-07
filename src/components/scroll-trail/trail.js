const clamp01 = (v) => Math.min(1, Math.max(0, v));

/**
 * Point on a single gentle S-curve (one full sine period) at `t` (0–1).
 * @param {number} t
 * @param {{ height: number, centerX: number, amplitude: number }} geometry
 */
export const pointOnTrail = (t, { height, centerX, amplitude }) => {
  const p = clamp01(t);
  return { x: centerX + amplitude * Math.sin(2 * Math.PI * p), y: p * height };
};

/** `count` evenly spaced dots along the trail, top to bottom. */
export const trailPoints = (count, geometry) => {
  if (count < 2) throw new RangeError(`A trail needs at least 2 dots, got ${count}`);
  return Array.from({ length: count }, (_, i) => pointOnTrail(i / (count - 1), geometry));
};

/** Where a section starting at `top` sits in the page's scroll progress (0–1). */
export const sectionFraction = (top, maxScroll) => (maxScroll > 0 ? clamp01(top / maxScroll) : 0);
