import { poseKeyframes, shotBounds, spotlightKeyframes, titleKeyframes } from './timeline';

const RANGE = [0.1, 0.9];

describe('shotBounds', () => {
  test('splits the range evenly', () => {
    const first = shotBounds(0, 4, RANGE);
    expect(first.start).toBeCloseTo(0.1);
    expect(first.end).toBeCloseTo(0.3);
    expect(first.length).toBeCloseTo(0.2);
    const last = shotBounds(3, 4, RANGE);
    expect(last.start).toBeCloseTo(0.7);
    expect(last.end).toBeCloseTo(0.9);
  });
});

describe('poseKeyframes', () => {
  const poses = [
    { from: { rotateX: 10 }, to: { rotateX: 12 } },
    { from: { rotateX: 20 }, to: { rotateX: 22 } },
  ];
  const intro = { rotateX: 50 };
  const outro = { rotateX: 30 };

  test('starts at the intro pose and ends at the outro pose', () => {
    const { input, values } = poseKeyframes({ poses, intro, outro, range: RANGE, transition: 0.2 });

    expect(input[0]).toBe(0);
    expect(values.rotateX[0]).toBe(50);
    expect(input[input.length - 1]).toBe(1);
    expect(values.rotateX[values.rotateX.length - 1]).toBe(30);
  });

  test('holds each shot from its "from" pose to its "to" pose', () => {
    const { values } = poseKeyframes({ poses, intro, outro, range: RANGE, transition: 0.2 });

    expect(values.rotateX).toEqual([50, 10, 12, 20, 22, 30]);
  });

  test('has strictly increasing offsets (required by useTransform)', () => {
    const { input } = poseKeyframes({ poses, intro, outro, range: RANGE, transition: 0.2 });

    input.slice(1).forEach((v, k) => expect(v).toBeGreaterThan(input[k]));
  });
});

describe('spotlightKeyframes', () => {
  test('rises after the shot settles, holds, and drops before the next shot', () => {
    const { input, lift } = spotlightKeyframes(1, 4, RANGE);
    const { start, end } = shotBounds(1, 4, RANGE);

    expect(lift).toEqual([0, 1, 1, 0]);
    expect(input[0]).toBeGreaterThan(start);
    expect(input[3]).toBeLessThan(end);
    input.slice(1).forEach((v, k) => expect(v).toBeGreaterThan(input[k]));
  });
});

describe('titleKeyframes', () => {
  test('fades the title word in and out within its shot', () => {
    const { input, opacity } = titleKeyframes(2, 4, RANGE);
    const { start, end } = shotBounds(2, 4, RANGE);

    expect(opacity).toEqual([0, 1, 1, 0]);
    expect(input[0]).toBeCloseTo(start);
    expect(input[3]).toBeCloseTo(end);
  });
});
