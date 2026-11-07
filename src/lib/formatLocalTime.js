/**
 * Formats an instant as wall-clock time in a given IANA time zone,
 * e.g. "12:34 PM PST".
 */
export const formatLocalTime = (date, timeZone) => {
  let formatter;
  try {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch (error) {
    throw new RangeError(`Unknown time zone "${timeZone}"`);
  }

  return formatter.format(date).replace(/ /g, ' ');
};
