// Date math for the experience wheel: a ruler with one tick per month from the
// first role to now, a node at each role start, and scroll keyframes that turn
// the wheel from node to node.

const YEAR_MONTH = /^(\d{4})-(\d{2})$/;

const parse = (ym) => {
  const match = YEAR_MONTH.exec(ym);
  if (!match) throw new RangeError(`Expected a YYYY-MM date, got "${ym}"`);
  return { year: Number(match[1]), month: Number(match[2]) - 1 };
};

const toYearMonth = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

/** Whole months from `origin` to `ym` (both YYYY-MM). */
export const monthIndex = (ym, origin) => {
  const a = parse(origin);
  const b = parse(ym);
  return (b.year - a.year) * 12 + (b.month - a.month);
};

/**
 * @param {{start: string, end?: string|null}[]} roles  oldest first
 * @param {Date} now
 */
export const buildScale = (roles, now) => {
  const origin = roles[0].start;
  const totalMonths = monthIndex(toYearMonth(now), origin);
  const { year: startYear, month: startMonth } = parse(origin);
  const ticks = Array.from({ length: totalMonths + 1 }, (_, m) => {
    const month = (startMonth + m) % 12;
    const year = startYear + Math.floor((startMonth + m) / 12);
    return { m, month, year: month === 0 ? year : null };
  });
  const nodes = roles.map((r) => monthIndex(r.start, origin));
  return { origin, totalMonths, ticks, nodes };
};

const HOLD_SHARE = 0.42; // share of each role's scroll spent resting on it

/** Scroll progress → month under the pointer: rest on each node, glide between. */
export const rotationKeyframes = (nodes, [start, end]) => {
  const step = (end - start) / nodes.length;
  const input = [0];
  const output = [nodes[0]];
  nodes.forEach((m, i) => {
    const segStart = start + i * step;
    const arrive = i === 0 ? segStart : segStart + step * (1 - HOLD_SHARE);
    input.push(arrive, segStart + step);
    output.push(m, m);
  });
  input.push(1);
  output.push(nodes[nodes.length - 1]);
  // drop the duplicate leading keyframe when the range starts at 0
  return input[1] === 0 ? { input: input.slice(1), output: output.slice(1) } : { input, output };
};

/** Index of the role shown at scroll progress `p`. */
export const activeIndexAt = (p, count, [start, end]) => {
  const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
  return Math.min(count - 1, Math.floor(t * count));
};

/** "2 yrs 8 mos" from start to end (inclusive), or to now when end is null. */
export const formatSpan = (start, end, now) => {
  const months = monthIndex(end ?? toYearMonth(now), start) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const part = (n, unit) => (n ? `${n} ${unit}${n === 1 ? '' : 's'}` : '');
  return [part(years, 'yr'), part(rest, 'mo')].filter(Boolean).join(' ') || '1 mo';
};
