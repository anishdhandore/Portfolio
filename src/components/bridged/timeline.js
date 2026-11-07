// Scroll timeline for the Bridged "film": the range is split into shots; each
// shot holds a tablet pose, then lifts a highlighted card off the screen.

/** Start, end and length (in scroll progress) of shot `i`. */
export const shotBounds = (i, count, [start, end]) => {
  const length = (end - start) / count;
  return { start: start + i * length, end: start + (i + 1) * length, length };
};

/**
 * Keyframes for every pose property. Each shot holds from its `from` pose to
 * its `to` pose (a slow drift); the gaps between holds are the quick "whip"
 * moves. `transition` is the share of each shot spent moving into it.
 */
export const poseKeyframes = ({ poses, intro, outro, range, transition }) => {
  const props = Object.keys(intro);
  const input = [0];
  const values = Object.fromEntries(props.map((p) => [p, [intro[p]]]));

  poses.forEach(({ from, to }, i) => {
    const { start, end, length } = shotBounds(i, poses.length, range);
    input.push(start + transition * length, end - (transition / 2) * length);
    props.forEach((p) => values[p].push(from[p], to[p]));
  });

  input.push(1);
  props.forEach((p) => values[p].push(outro[p]));
  return { input, values };
};

/** When the shot's highlight lifts off the screen (0 = flat, 1 = fully lifted). */
export const spotlightKeyframes = (i, count, range) => {
  const { start, length } = shotBounds(i, count, range);
  return {
    input: [start + 0.22 * length, start + 0.42 * length, start + 0.78 * length, start + 0.9 * length],
    lift: [0, 1, 1, 0],
  };
};

/** Fade for the oversized title word behind the tablet. */
export const titleKeyframes = (i, count, range) => {
  const { start, end, length } = shotBounds(i, count, range);
  return {
    input: [start, start + 0.18 * length, end - 0.18 * length, end],
    opacity: [0, 1, 1, 0],
  };
};
