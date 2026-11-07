import { formatLocalTime } from './formatLocalTime';

describe('formatLocalTime', () => {
  test('formats a UTC instant as Pacific time with a zone abbreviation', () => {
    // Arrange: 20:34 UTC in November is 12:34 PST
    const instant = new Date('2026-11-05T20:34:00Z');

    // Act
    const result = formatLocalTime(instant, 'America/Los_Angeles');

    // Assert
    expect(result).toBe('12:34 PM PST');
  });

  test('uses daylight time abbreviation in summer', () => {
    const instant = new Date('2026-07-01T16:05:00Z');

    expect(formatLocalTime(instant, 'America/Los_Angeles')).toBe('9:05 AM PDT');
  });

  test('throws a clear error for an unknown time zone', () => {
    expect(() => formatLocalTime(new Date(), 'Mars/Olympus')).toThrow(/time zone/i);
  });
});
