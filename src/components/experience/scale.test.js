import { activeIndexAt, buildScale, formatSpan, monthIndex, rotationKeyframes } from './scale';

const ORIGIN = '2021-08';
const NOW = new Date(2026, 10, 6); // Nov 2026

describe('monthIndex', () => {
  test('counts whole months from the origin', () => {
    expect(monthIndex('2021-08', ORIGIN)).toBe(0);
    expect(monthIndex('2022-01', ORIGIN)).toBe(5);
    expect(monthIndex('2025-02', ORIGIN)).toBe(42);
  });

  test('rejects malformed dates', () => {
    expect(() => monthIndex('Feb 2025', ORIGIN)).toThrow(/YYYY-MM/);
  });
});

describe('buildScale', () => {
  const roles = [{ start: '2021-08' }, { start: '2022-01' }, { start: '2025-02', end: null }];
  const scale = buildScale(roles, NOW);

  test('runs from the first start month to now', () => {
    expect(scale.origin).toBe('2021-08');
    expect(scale.totalMonths).toBe(63); // Aug 2021 → Nov 2026
    expect(scale.ticks).toHaveLength(64);
  });

  test('marks every January as a labelled year tick', () => {
    const years = scale.ticks.filter((t) => t.year).map((t) => t.year);
    expect(years).toEqual([2022, 2023, 2024, 2025, 2026]);
  });

  test('places a node at each role start', () => {
    expect(scale.nodes).toEqual([0, 5, 42]);
  });
});

describe('rotationKeyframes', () => {
  test('holds on each node and moves between them, ending on the last', () => {
    const { input, output } = rotationKeyframes([0, 5, 42], [0.1, 0.9]);

    expect(output[0]).toBe(0);
    expect(output[output.length - 1]).toBe(42);
    // every node value appears twice: arrive, then hold
    expect(output.filter((m) => m === 5)).toHaveLength(2);
    input.slice(1).forEach((v, i) => expect(v).toBeGreaterThan(input[i]));
    expect(input[0]).toBe(0);
    expect(input[input.length - 1]).toBe(1);
  });
});

describe('activeIndexAt', () => {
  test('maps scroll progress to the role being shown', () => {
    expect(activeIndexAt(0, 4, [0.1, 0.9])).toBe(0);
    expect(activeIndexAt(0.35, 4, [0.1, 0.9])).toBe(1);
    expect(activeIndexAt(0.95, 4, [0.1, 0.9])).toBe(3);
  });
});

describe('formatSpan', () => {
  test('formats a duration in years and months, inclusive', () => {
    expect(formatSpan('2023-03', '2023-05', NOW)).toBe('3 mos');
    expect(formatSpan('2022-01', '2024-08', NOW)).toBe('2 yrs 8 mos');
    expect(formatSpan('2025-02', null, NOW)).toBe('1 yr 10 mos');
  });
});
