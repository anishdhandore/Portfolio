const FAN_MAX_TILT_DEG = 6;
const FAN_ARC_DROP = 0.09; // outer cards sit this share of a card height lower
const FAN_GAP = 0.08; // gap between fanned cards, as a share of card width
const GRID_GAP = 16;
const FLIGHT_SHARE = 0.45; // each card's flight spans this share of the deal range

/**
 * Final resting spot for each card, relative to the stage centre.
 * Wide stages get a fanned arc (a hand of cards); narrow ones a 2-column grid.
 */
export const dealLayout = ({ count, stageWidth, cardWidth, cardHeight }) => {
  const step = cardWidth * (1 + FAN_GAP);
  const fanWidth = step * (count - 1) + cardWidth;

  if (fanWidth <= stageWidth) {
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

  const rows = Math.ceil(count / 2);
  const gridHeight = rows * cardHeight + (rows - 1) * GRID_GAP;
  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / 2);
    const isLoneLast = i === count - 1 && count % 2 === 1;
    const column = i % 2 === 0 ? -1 : 1;
    return {
      x: isLoneLast ? 0 : column * (cardWidth / 2 + GRID_GAP / 2),
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
