import { chapterIndexAt, screenKeyframes } from './chapters';

const RANGE = [0.1, 0.9];

describe('chapterIndexAt', () => {
  test('stays on the first chapter before the range starts', () => {
    expect(chapterIndexAt(0, 4, RANGE)).toBe(0);
  });

  test('splits the range evenly between chapters', () => {
    // each chapter spans 0.2 of progress: 0.1–0.3, 0.3–0.5, ...
    expect(chapterIndexAt(0.29, 4, RANGE)).toBe(0);
    expect(chapterIndexAt(0.31, 4, RANGE)).toBe(1);
    expect(chapterIndexAt(0.75, 4, RANGE)).toBe(3);
  });

  test('stays on the last chapter at and after the end', () => {
    expect(chapterIndexAt(0.9, 4, RANGE)).toBe(3);
    expect(chapterIndexAt(1, 4, RANGE)).toBe(3);
  });
});

describe('screenKeyframes', () => {
  test('the first screen is fully visible from the start and fades into the second', () => {
    const { input, opacity } = screenKeyframes(0, 4, RANGE, 0.05);

    expect(input[0]).toBe(0);
    expect(opacity[0]).toBe(1);
    expect(opacity[opacity.length - 1]).toBe(0);
    expect(input[input.length - 1]).toBeCloseTo(0.3);
  });

  test('a middle screen fades in before its chapter and out at the next', () => {
    const { input, opacity } = screenKeyframes(1, 4, RANGE, 0.05);

    expect(input.map((n) => Number(n.toFixed(3)))).toEqual([0.25, 0.3, 0.45, 0.5]);
    expect(opacity).toEqual([0, 1, 1, 0]);
  });

  test('the last screen stays visible to the end', () => {
    const { input, opacity } = screenKeyframes(3, 4, RANGE, 0.05);

    expect(input[input.length - 1]).toBe(1);
    expect(opacity[opacity.length - 1]).toBe(1);
  });

  test('input offsets are strictly increasing (required by useTransform)', () => {
    for (let i = 0; i < 4; i++) {
      const { input } = screenKeyframes(i, 4, RANGE, 0.05);
      input.slice(1).forEach((v, k) => expect(v).toBeGreaterThan(input[k]));
    }
  });
});
