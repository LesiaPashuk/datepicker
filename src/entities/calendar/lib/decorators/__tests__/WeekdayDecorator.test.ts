import { CalendarEngine } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { MOCK_DATES, MOCK_PARAMS, WEEKDAY_MOCK } from '../../tests/constants';
import { WeekdayDecorator } from '../WeekdayDecorator';

describe('WeekdayDecorator', () => {
  let mockEngine: jest.Mocked<CalendarEngine>;

  beforeEach(() => {
    mockEngine = {
      getDays: jest.fn(),
      getNextDate: jest.fn(),
      getPreviousDate: jest.fn(),
      getNextYear: jest.fn(),
    };
  });

  test('should mark days as weekend correctly', () => {
    mockEngine.getDays.mockReturnValue(WEEKDAY_MOCK);
    const decorator = new WeekdayDecorator(mockEngine);

    const result = decorator.getDays(MOCK_DATES.FEB_2026, MOCK_PARAMS);

    expect(result[START_DATE_INDEX_].isWeekend).toBeTruthy();
    expect(result[FIRST_INDEX].isWeekend).toBeFalsy();
  });
});
