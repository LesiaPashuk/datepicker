import { ValidationResult } from '@entities/calendar/model/types';
import { DATE_PARTS_LENGTH, FIRST_INDEX, MAX_INPUT_LENGTH } from '@shared/model/constants';

const MAX_DAY = 31;
const MAX_MONTH = 12;

export const MAX_YEAR = 2050;
export const MIN_YEAR = 1970;

export const validateDateInput = (value: string): ValidationResult => {
  const validationResult: ValidationResult = {
    isValid: false,
    error: '',
    date: null,
  };

  const trimmed = value.trim();
  const parts = trimmed.split('.');

  if (parts.length !== DATE_PARTS_LENGTH) {
    return { ...validationResult, error: 'Invalid format. Expected DD.MM.YYYY' };
  }

  if (trimmed.length > MAX_INPUT_LENGTH) {
    return { ...validationResult, error: 'Input too long' };
  }

  const [dayRaw, monthRaw, yearRaw] = parts;
  const day = Number(dayRaw);
  const month = Number(monthRaw);
  const year = Number(yearRaw);

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return { ...validationResult, error: 'Invalid numeric values' };
  }

  if (day > MAX_DAY || day < FIRST_INDEX) {
    return { ...validationResult, error: 'The day should be from 1 to 31' };
  }

  if (month > MAX_MONTH || month < FIRST_INDEX) {
    return { ...validationResult, error: 'The month should be from 1 to 12' };
  }

  if (year > MAX_YEAR) {
    return { ...validationResult, error: `The year should be less than ${MAX_YEAR}` };
  }

  if (year < MIN_YEAR) {
    return { ...validationResult, error: `The year should be greater than ${MIN_YEAR}` };
  }

  const newDate = new Date(year, month - FIRST_INDEX, day);

  if (
    newDate.getFullYear() !== year ||
    newDate.getMonth() !== month - FIRST_INDEX ||
    newDate.getDate() !== day
  ) {
    return { ...validationResult, error: 'Invalid date for the given month/year' };
  }

  return { ...validationResult, isValid: true, date: newDate };
};
