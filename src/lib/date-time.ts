import dayjs from 'dayjs';

/**
 * Formats a date into ISO 8601 format with timezone offset
 * Example output: "2025-04-03T04:02:05.260379+07:00"
 * @param date Optional Date object, defaults to current date/time
 * @returns Formatted date string
 */
export function getDateTimeString(date: Date = new Date(), format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format);
}
