import { CalendarEngine } from '@entities/calendar/model/types';

import { MOCK_DATES, MOCK_SECTION_PARAMS, MockEngine, YEAR_25 } from '../../tests/constants';

describe('BaseCalendarEngine', () => {
  let mockInnerEngine: CalendarEngine;
  let baseEngine: MockEngine;

  beforeEach(() => {
    mockInnerEngine = {
      getNextDate: jest.fn().mockReturnValue(MOCK_DATES.DEC_2025),
      getPreviousDate: jest.fn(),
      getNextYear: jest.fn(),
      getDays: jest.fn(),
    };

    baseEngine = new MockEngine(mockInnerEngine);
  });

  test('should delegate getNextDate call to the wrapped engine', () => {
    const testDate = MOCK_DATES.NOV_2025;
    const result = baseEngine.getNextDate(testDate);

    expect(mockInnerEngine.getNextDate).toHaveBeenCalledWith(testDate);

    expect(result.getFullYear()).toBe(YEAR_25);
  });

  test('should delegate getNextYear call correctly', () => {
    baseEngine.getNextYear(MOCK_DATES.NOV_2025, MOCK_DATES.NOV_2025.getFullYear());
    expect(mockInnerEngine.getNextYear).toHaveBeenCalled();
  });

  test('should delegate getPreviousDate call correctly', () => {
    baseEngine.getPreviousDate(MOCK_DATES.NOV_2025);
    expect(mockInnerEngine.getPreviousDate).toHaveBeenCalled();
  });

  test('MockEngine getDays should return empty array (coverage filler)', () => {
    (mockInnerEngine.getDays as jest.Mock).mockReturnValue([]);
    const result = baseEngine.getDays(MOCK_DATES.NOV_2025, MOCK_SECTION_PARAMS);

    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });
});
