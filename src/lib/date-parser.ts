import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const fromISO = (
  date: string,
  format: string = 'DD/MM/YYYY HH:mm:ss'
) => {
  return dayjs(date).format(format);
};

export const toISO = (date: string, format: string = 'DD/MM/YYYY') => {
  return dayjs(date, format).toISOString();
};

export const fromDate = (
  date: string,
  format: string = 'DD/MM/YYYY HH:mm:ss'
) => {
  return dayjs(date).format(format);
};
