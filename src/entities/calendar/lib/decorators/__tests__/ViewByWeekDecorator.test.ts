import { SATURDAY_INDEX, WEEK_LENGHT } from '@entities/calendar/model/constants';
import { CalendarEngine } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { FIXED_GRID, MOCK_PARAMS, YEAR_25 } from '../../tests/constants';
import { ViewByWeekDecorator } from '../ViewByWeekDecorator';

describe('ViewByWeekDecorator', () => {
  let mockEngine: jest.Mocked<CalendarEngine>;
  let decorator: ViewByWeekDecorator;

  beforeEach(() => {
    mockEngine = {
      getDays: jest.fn().mockReturnValue(FIXED_GRID),
      getNextDate: jest.fn(),
      getPreviousDate: jest.fn(),
      getNextYear: jest.fn(),
    };

    decorator = new ViewByWeekDecorator(mockEngine);
  });

  describe('getDays logic', () => {
    test('should slice the first week correctly', () => {
      const currentDate = new Date(2025, 0, 3);

      const result = decorator.getDays(currentDate, MOCK_PARAMS);

      expect(result).toHaveLength(WEEK_LENGHT);
      expect(result[START_DATE_INDEX_].date.getDate()).toBe(FIRST_INDEX);
      expect(result[SATURDAY_INDEX].date.getDate()).toBe(WEEK_LENGHT);
    });

    test('should slice the second week correctly', () => {
      const START_DAY = 8;
      const END_DAY = 14;
      const currentDate = new Date(2025, 0, 10);

      const result = decorator.getDays(currentDate, MOCK_PARAMS);

      expect(result).toHaveLength(WEEK_LENGHT);
      expect(result[START_DATE_INDEX_].date.getDate()).toBe(START_DAY);
      expect(result[SATURDAY_INDEX].date.getDate()).toBe(END_DAY);
    });
  });

  test('getNextDate should return date + 7 days', () => {
    const baseDate = new Date(2025, 0, 1);

    const result = decorator.getNextDate(baseDate);

    expect(result.getFullYear()).toBe(YEAR_25);
    expect(result.getMonth()).toBe(START_DATE_INDEX_);
    expect(result.getDate()).toBe(FIRST_INDEX + WEEK_LENGHT);
  });

  test('getPreviousDate should return date - 7 days', () => {
    const END_DAY = 15;
    const baseDate = new Date(2025, 0, 15);

    const result = decorator.getPreviousDate(baseDate);

    expect(result.getFullYear()).toBe(YEAR_25);
    expect(result.getMonth()).toBe(START_DATE_INDEX_);
    expect(result.getDate()).toBe(END_DAY - WEEK_LENGHT);
  });

  test('should return first week as fallback if currentDate is not found in grid', () => {
    const unknownDate = new Date(1990, 0, 1);

    const result = decorator.getDays(unknownDate, MOCK_PARAMS);

    expect(result).toHaveLength(WEEK_LENGHT);
    expect(result[START_DATE_INDEX_].date.getDate()).toBe(FIRST_INDEX);
  });
});
