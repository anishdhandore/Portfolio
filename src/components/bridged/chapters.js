const clamp01 = (v) => Math.min(1, Math.max(0, v));

/** Scroll progress (0–1) at the start of chapter `c` within `[start, end]`. */
const chapterStart = (c, count, [start, end]) => start + (c / count) * (end - start);

/** Index of the chapter shown at scroll progress `p`. */
export const chapterIndexAt = (p, count, range) => {
  const [start, end] = range;
  const t = clamp01((p - start) / (end - start));
  return Math.min(count - 1, Math.floor(t * count));
};

/**
 * Opacity keyframes for screen `i`: it fades in over `fade` (progress units)
 * just before its chapter starts and fades out as the next one fades in.
 * The first screen is visible from 0 and the last stays visible until 1.
 */
export const screenKeyframes = (i, count, range, fade) => {
  const isFirst = i === 0;
  const isLast = i === count - 1;
  const inAt = chapterStart(i, count, range);
  const outAt = chapterStart(i + 1, count, range);

  const fadeIn = isFirst ? { input: [0], opacity: [1] } : { input: [inAt - fade, inAt], opacity: [0, 1] };
  const fadeOut = isLast ? { input: [1], opacity: [1] } : { input: [outAt - fade, outAt], opacity: [1, 0] };

  return {
    input: [...fadeIn.input, ...fadeOut.input],
    opacity: [...fadeIn.opacity, ...fadeOut.opacity],
  };
};
