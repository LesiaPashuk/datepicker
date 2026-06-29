import { validateDateInput } from '../validationInput';

describe('valid date input', () => {
  test('return error when search is too small', () => {
    const result = validateDateInput('12.11');

    const { isValid, error, date } = result;

    expect(error).toBe('Invalid format. Expected DD.MM.YYYY');
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('return error when input is too long', () => {
    const result = validateDateInput('12.11.20222');

    const { isValid, error, date } = result;

    expect(error).toBe('Input too long');
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Invalid numeric values', () => {
    const result = validateDateInput('1!.1a.202w');

    const { isValid, error, date } = result;

    expect(error).toBe('Invalid numeric values');
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Day value is too big', () => {
    const result = validateDateInput('32.11.2022');

    const { isValid, error, date } = result;

    expect(error).toBe('The day should be from 1 to 31');
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Day value is too small', () => {
    const result = validateDateInput('00.11.2022');

    const { isValid, error, date } = result;

    expect(error).toBe('The day should be from 1 to 31');
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Month value is too big', () => {
    const result = validateDateInput('12.13.2022');

    const { isValid, error, date } = result;

    expect(error).toBe('The month should be from 1 to 12');
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Month value is too small', () => {
    const result = validateDateInput('12.00.2022');

    const { isValid, error, date } = result;

    expect(error).toBe('The month should be from 1 to 12');
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Year value is too big', () => {
    const result = validateDateInput('12.12.2051');

    const { isValid, error, date } = result;

    expect(error).toBe(`The year should be less than 2050`);
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Year value is too small', () => {
    const result = validateDateInput('12.12.1969');

    const { isValid, error, date } = result;

    expect(error).toBe(`The year should be greater than 1970`);
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Invalid date for the given month/year', () => {
    const result = validateDateInput('31.02.2026');

    const { isValid, error, date } = result;

    expect(error).toBe(`Invalid date for the given month/year`);
    expect(date).toBeNull();
    expect(isValid).toBeFalsy();
  });

  test('Correct date', () => {
    const result = validateDateInput('20.08.2006');
    const dateResult = new Date(2006, 7, 20);
    const { isValid, error, date } = result;

    expect(error).toBe('');
    expect(date?.getTime()).toBe(dateResult.getTime());
    expect(isValid).toBeTruthy();
  });
});
