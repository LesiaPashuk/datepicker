import { CalendarEngine } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { MOCK_PARAMS } from '../../tests/constants';
import { MinMaxDecorator } from '../MinMaxDecorator';

describe('MinMaxDecorator', () => {
  const minDate = new Date(2025, 0, 1);
  const maxDate = new Date(2026, 1, 1);
  let mockEngine: jest.Mocked<CalendarEngine>;
  let decorator: MinMaxDecorator;

  beforeEach(() => {
    mockEngine = {
      getDays: jest.fn(),
      getNextDate: jest.fn(
        (date: Date) => new Date(date.getFullYear(), date.getMonth() + FIRST_INDEX, FIRST_INDEX)
      ),
      getPreviousDate: jest.fn(
        (date: Date) => new Date(date.getFullYear(), date.getMonth() - FIRST_INDEX, FIRST_INDEX)
      ),
      getNextYear: jest.fn(
        (date: Date, newYear: number) => new Date(newYear, date.getMonth(), FIRST_INDEX)
      ),
    };

    decorator = new MinMaxDecorator(mockEngine, minDate, maxDate);
  });

  test('shouldnt allow next month if it maxDate', () => {
    const result = decorator.getNextDate(maxDate);

    expect(result.getTime()).toBe(maxDate.getTime());
  });

  test('should allow next month if it is within range', () => {
    const result = decorator.getNextDate(minDate);

    expect(result.getMonth()).toBe(FIRST_INDEX);
  });

  test('should not allow previous month if its minDate', () => {
    const result = decorator.getPreviousDate(minDate);

    expect(result.getTime()).toBe(minDate.getTime());
  });

  test('getDays from BaseCalendarEngine', () => {
    decorator.getDays(minDate, MOCK_PARAMS);

    expect(mockEngine.getDays).toHaveBeenCalledWith(minDate, MOCK_PARAMS);
  });

  test('shouldnt allow next year if it maxDate', () => {
    const result = decorator.getNextYear(minDate, maxDate.getFullYear());

    expect(result.getFullYear()).toBe(maxDate.getFullYear());
  });

  test('should allow navigation to next', () => {
    const emptyDecorator = new MinMaxDecorator(mockEngine);

    const next = emptyDecorator.getNextDate(minDate);

    expect(next.getTime()).not.toBe(minDate.getTime());
    expect(next.getMonth()).toBe(FIRST_INDEX);
  });

  test('should allow navigation to prev', () => {
    const emptyDecorator = new MinMaxDecorator(mockEngine);

    const prev = emptyDecorator.getPreviousDate(maxDate);

    expect(prev.getTime()).not.toBe(maxDate.getTime());
    expect(prev.getMonth()).toBe(START_DATE_INDEX_);
  });

  test('should allow next year if its within range', () => {
    const result = decorator.getNextYear(minDate, maxDate.getFullYear());

    expect(result.getFullYear()).toBe(maxDate.getFullYear());
    expect(result.getTime()).not.toBe(minDate.getTime());
  });
});
