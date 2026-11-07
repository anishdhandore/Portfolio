import { dealLayout, dealWindow, deckPose } from './dealLayout';

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
