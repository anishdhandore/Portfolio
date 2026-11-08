import { frameAt } from './frameAt';

describe('frameAt', () => {
  test('maps the start and end of the scroll to the first and last frame', () => {
    expect(frameAt(0, 32)).toEqual({ index: 0, next: 1, mix: 0 });
    expect(frameAt(1, 32)).toEqual({ index: 31, next: 31, mix: 0 });
  });

  test('blends between neighbouring frames for sub-frame smoothness', () => {
    const { index, next, mix } = frameAt(0.5, 32); // 15.5 → between 15 and 16
    expect([index, next]).toEqual([15, 16]);
    expect(mix).toBeCloseTo(0.5);
  });

  test('clamps progress outside 0–1', () => {
    expect(frameAt(-0.4, 10).index).toBe(0);
    expect(frameAt(3, 10).index).toBe(9);
  });
});
