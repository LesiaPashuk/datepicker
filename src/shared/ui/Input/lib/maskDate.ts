import { START_DATE_INDEX_, START_MONTH_INDEX, START_YEAR_INDEX } from '../model/constants';

export const maskDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= START_MONTH_INDEX) {
    return `${digits}`;
  }

  if (digits.length <= START_YEAR_INDEX) {
    return `${digits.substring(START_DATE_INDEX_, START_MONTH_INDEX)}.${digits.substring(START_MONTH_INDEX)}`;
  }

  return `${digits.substring(START_DATE_INDEX_, START_MONTH_INDEX)}.${digits.substring(START_MONTH_INDEX, START_YEAR_INDEX)}.${digits.substring(START_YEAR_INDEX)}`;
};
