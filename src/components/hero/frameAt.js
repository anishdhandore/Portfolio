/** Which frames to draw at scroll progress `p` (0–1): a frame, its neighbour and how much of the neighbour to blend in. */
export const frameAt = (p, count) => {
  const pos = Math.min(1, Math.max(0, p)) * (count - 1);
  const index = Math.floor(pos);
  const next = Math.min(count - 1, index + 1);
  return { index, next, mix: index === count - 1 ? 0 : pos - index };
};
