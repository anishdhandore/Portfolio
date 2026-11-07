import { dealLayout, dealWindow, deckPose, gridCardSize } from './dealLayout';

describe('dealLayout', () => {
  test('fans cards in a symmetric arc on wide stages', () => {
    const spots = dealLayout({ count: 5, stageWidth: 1200, cardWidth: 200, cardHeight: 280 });

    expect(spots).toHaveLength(5);
    expect(spots[2]).toMatchObject({ x: 0, rotate: 0 });
    expect(spots[0].x).toBeCloseTo(-spots[4].x);
    expect(spots[0].rotate).toBeCloseTo(-spots[4].rotate);
    // the middle card sits highest in the arc
    expect(spots[0].y).toBeGreaterThan(spots[2].y);
  });

  test('keeps the fan inside the stage', () => {
    const spots = dealLayout({ count: 5, stageWidth: 1000, cardWidth: 200, cardHeight: 280 });
    const outer = Math.abs(spots[0].x) + 200 / 2;

    expect(outer).toBeLessThanOrEqual(1000 / 2);
  });

  test('switches to a two-column grid on narrow stages', () => {
    const spots = dealLayout({ count: 5, stageWidth: 360, cardWidth: 160, cardHeight: 224 });

    expect(spots.map((s) => s.rotate)).toEqual([0, 0, 0, 0, 0]);
    expect(spots[0].x).toBeLessThan(0);
    expect(spots[1].x).toBeGreaterThan(0);
    expect(spots[2].y).toBeGreaterThan(spots[0].y);
    // a lone last card is centred
    expect(spots[4].x).toBe(0);
  });
});

describe('gridCardSize', () => {
  const RATIO = 7 / 5;

  test('fits the whole grid inside the stage, whatever its height', () => {
    // iPhone 16 Pro with Safari toolbars showing leaves a short stage
    [[370, 420], [370, 300], [360, 640]].forEach(([width, height]) => {
      const { columns, cardWidth, cardHeight } = gridCardSize({ count: 5, width, height, ratio: RATIO });
      const rows = Math.ceil(5 / columns);
      expect(columns * cardWidth + (columns - 1) * 16).toBeLessThanOrEqual(width);
      expect(rows * cardHeight + (rows - 1) * 16).toBeLessThanOrEqual(height);
    });
  });

  test('switches to 3 columns when height is the constraint', () => {
    expect(gridCardSize({ count: 5, width: 370, height: 300, ratio: RATIO }).columns).toBe(3);
    expect(gridCardSize({ count: 5, width: 360, height: 900, ratio: RATIO }).columns).toBe(2);
  });
});

describe('dealLayout with columns', () => {
  test('lays out a 3-column grid and centres the short last row', () => {
    const spots = dealLayout({ count: 5, stageWidth: 370, cardWidth: 100, cardHeight: 140, columns: 3 });

    expect(spots.slice(0, 3).map((s) => s.x)).toEqual([-116, 0, 116]);
    expect(spots.slice(3).map((s) => s.x)).toEqual([-58, 58]);
    expect(spots[3].y).toBeGreaterThan(spots[0].y);
  });
});

describe('deckPose', () => {
  test('stacks cards on top of each other with a slight offset', () => {
    const top = deckPose(0, 5);
    const bottom = deckPose(4, 5);

    expect(top.y).toBeLessThan(bottom.y);
    expect(Math.abs(top.x)).toBeLessThan(10);
  });
});

describe('dealWindow', () => {
  test('deals the top card first and every card inside the deal range', () => {
    const range = [0.2, 0.7];
    const first = dealWindow(0, 5, range);
    const last = dealWindow(4, 5, range);

    expect(first.start).toBeCloseTo(0.2);
    expect(last.end).toBeCloseTo(0.7);
    expect(first.start).toBeLessThan(last.start);
    expect(first.end).toBeGreaterThan(first.start);
  });
});
