import { pointOnTrail, sectionFraction, trailPoints } from './trail';

const geometry = { height: 200, centerX: 12, amplitude: 5 };

describe('pointOnTrail', () => {
  test('starts and ends on the centre line', () => {
    expect(pointOnTrail(0, geometry)).toEqual({ x: 12, y: 0 });
    expect(pointOnTrail(1, geometry).x).toBeCloseTo(12);
    expect(pointOnTrail(1, geometry).y).toBe(200);
  });

  test('swings one way in the first half and the other way in the second', () => {
    expect(pointOnTrail(0.25, geometry).x).toBeCloseTo(17);
    expect(pointOnTrail(0.75, geometry).x).toBeCloseTo(7);
  });

  test('clamps progress outside 0–1', () => {
    expect(pointOnTrail(-1, geometry)).toEqual(pointOnTrail(0, geometry));
    expect(pointOnTrail(2, geometry)).toEqual(pointOnTrail(1, geometry));
  });
});

describe('trailPoints', () => {
  test('spaces the requested number of dots from top to bottom', () => {
    const points = trailPoints(5, geometry);

    expect(points).toHaveLength(5);
    expect(points.map((p) => p.y)).toEqual([0, 50, 100, 150, 200]);
  });

  test('rejects fewer than two dots', () => {
    expect(() => trailPoints(1, geometry)).toThrow(/at least 2/i);
  });
});

describe('sectionFraction', () => {
  test('maps a section top to its share of the scrollable distance', () => {
    expect(sectionFraction(500, 2000)).toBe(0.25);
  });

  test('clamps sections past the last scroll position to the end', () => {
    expect(sectionFraction(2600, 2000)).toBe(1);
  });

  test('returns 0 when the page cannot scroll', () => {
    expect(sectionFraction(300, 0)).toBe(0);
  });
});
