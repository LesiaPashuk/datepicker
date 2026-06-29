import { CalendarEngine } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { HOLIDAY_MOCK, MOCK_PARAMS } from '../../tests/constants';
import { HolidayDecorator } from '../HolidayDecorator';

const mockDate = new Date(2026, 0, 1);

describe('HolidayDecorator', () => {
  let mockEngine: jest.Mocked<CalendarEngine>;

  beforeEach(() => {
    mockEngine = {
      getDays: jest.fn(),
      getNextDate: jest.fn(),
      getPreviousDate: jest.fn(),
      getNextYear: jest.fn(),
    };
  });

  test('should mark days as holidays if they exist in the holiday list', () => {
    mockEngine.getDays.mockReturnValue(HOLIDAY_MOCK);

    const decorator = new HolidayDecorator(mockEngine, [mockDate]);
    const result = decorator.getDays(mockDate, MOCK_PARAMS);

    expect(result[START_DATE_INDEX_].isHoliday).toBeTruthy();
    expect(result[FIRST_INDEX].isHoliday).toBeUndefined();
  });

  test('should delegate navigation methods to the inner engine', () => {
    const decorator = new HolidayDecorator(mockEngine, []);

    decorator.getNextDate(mockDate);
    expect(mockEngine.getNextDate).toHaveBeenCalledWith(mockDate);
  });

  test('should work correctly with an empty holiday list', () => {
    mockEngine.getDays.mockReturnValue(HOLIDAY_MOCK);

    const decorator = new HolidayDecorator(mockEngine, []);
    const result = decorator.getDays(mockDate, MOCK_PARAMS);

    expect(result[START_DATE_INDEX_].isHoliday).toBeFalsy();
  });
});
