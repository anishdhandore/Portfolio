const FAN_MAX_TILT_DEG = 6;
const FAN_ARC_DROP = 0.09; // outer cards sit this share of a card height lower
const FAN_GAP = 0.08; // gap between fanned cards, as a share of card width
const GRID_GAP = 16;
const FLIGHT_SHARE = 0.45; // each card's flight spans this share of the deal range

/**
 * Biggest card that fits a narrow stage as a grid, trying 2 and 3 columns.
 * Never returns a card larger than the stage allows, so the hand can't spill
 * out of its box (e.g. on phones with Safari's toolbars showing).
 */
export const gridCardSize = ({ count, width, height, ratio, maxWidth = Infinity }) => {
  const best = [2, 3]
    .map((columns) => {
      const rows = Math.ceil(count / columns);
      const byWidth = (width - (columns - 1) * GRID_GAP) / columns;
      const byHeight = (height - (rows - 1) * GRID_GAP) / rows / ratio;
      return { columns, cardWidth: Math.floor(Math.min(byWidth, byHeight, maxWidth)) };
    })
    .reduce((a, b) => (b.cardWidth > a.cardWidth ? b : a));
  return { ...best, cardHeight: Math.floor(best.cardWidth * ratio) };
};

/**
 * Final resting spot for each card, relative to the stage centre.
 * With `columns` the hand is laid out as a grid (last row centred); otherwise
 * it's fanned as an arc when it fits, falling back to a 2-column grid.
 */
export const dealLayout = ({ count, stageWidth, cardWidth, cardHeight, columns }) => {
  const step = cardWidth * (1 + FAN_GAP);
  const fanWidth = step * (count - 1) + cardWidth;

  if (!columns && fanWidth <= stageWidth) {
    const mid = (count - 1) / 2;
    return Array.from({ length: count }, (_, i) => {
      const t = mid === 0 ? 0 : (i - mid) / mid; // -1 … 1
      return {
        x: (i - mid) * step,
        y: t * t * cardHeight * FAN_ARC_DROP,
        rotate: t * FAN_MAX_TILT_DEG,
      };
    });
  }

  const cols = columns ?? 2;
  const rows = Math.ceil(count / cols);
  const gridHeight = rows * cardHeight + (rows - 1) * GRID_GAP;
  const pitch = cardWidth + GRID_GAP;
  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / cols);
    const inRow = row === rows - 1 ? count - row * cols : cols; // last row may be short
    const col = i % cols;
    return {
      x: (col - (inRow - 1) / 2) * pitch,
      y: row * (cardHeight + GRID_GAP) - gridHeight / 2 + cardHeight / 2,
      rotate: 0,
    };
  });
};

/** Where card `i` sits in the face-down deck (index 0 is on top). */
export const deckPose = (i, count) => ({
  x: ((i * 7) % 5) - 2, // small, deterministic jitter
  y: (i - (count - 1)) * 2.5, // top card sits highest
  rotate: ((i * 13) % 7) - 3,
});

/** Scroll-progress window in which card `i` flies from the deck to its spot. */
export const dealWindow = (i, count, [start, end]) => {
  const span = end - start;
  const flight = span * FLIGHT_SHARE;
  const stagger = count > 1 ? (span - flight) / (count - 1) : 0;
  const cardStart = start + i * stagger;
  return { start: cardStart, end: cardStart + flight };
};
