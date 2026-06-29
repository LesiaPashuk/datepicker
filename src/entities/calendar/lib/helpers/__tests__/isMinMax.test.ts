import { MOCK_DATES } from '../../tests/constants';
import { isMinMaxValue } from '../isMinMaxValue';

describe('isMinMaxValue helper', () => {
  test('return true if date in man-max range', () => {
    expect(isMinMaxValue(MOCK_DATES.NOV_RANGE_END, MOCK_DATES.NOV_2025, MOCK_DATES.DEC_2025)).toBe(
      true
    );
  });

  test('return false if date smaller than min', () => {
    expect(isMinMaxValue(MOCK_DATES.MAR_2024, MOCK_DATES.NOV_2025, MOCK_DATES.DEC_2025)).toBe(
      false
    );
  });

  test('return false if date bigger than maxDate', () => {
    expect(isMinMaxValue(MOCK_DATES.FEB_2023, MOCK_DATES.NOV_2025, MOCK_DATES.DEC_2025)).toBe(
      false
    );
  });
});
