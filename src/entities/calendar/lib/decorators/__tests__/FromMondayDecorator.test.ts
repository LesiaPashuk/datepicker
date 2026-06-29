import { CalendarEngine } from '@entities/calendar/model/types';

import { MOCK_DATES, MOCK_SECTION_PARAMS } from '../../tests/constants';
import { FromMondayDecorator } from '../FromMondayDecorator';

describe('calender from monday decorator', () => {
  let mockInnerEngine: CalendarEngine;

  beforeEach(() => {
    mockInnerEngine = {
      getNextDate: jest.fn().mockReturnValue(MOCK_DATES.DEC_2025),
      getPreviousDate: jest.fn(),
      getNextYear: jest.fn(),
      getDays: jest.fn(),
    } as jest.Mocked<CalendarEngine>;
  });

  test('should pass fromMonday flag to engine.getDays', () => {
    const FROM_MONDAY_FLAG = true;
    const params = { ...MOCK_SECTION_PARAMS, fromMonday: FROM_MONDAY_FLAG };
    const decorator = new FromMondayDecorator(mockInnerEngine, FROM_MONDAY_FLAG);

    decorator.getDays(MOCK_DATES.FEB_2026, params);

    expect(mockInnerEngine.getDays).toHaveBeenCalledWith(
      MOCK_DATES.FEB_2026,
      expect.objectContaining(params)
    );
  });

  test('should handle false fromMonday flag', () => {
    const FROM_MONDAY_FLAG = false;
    const params = { ...MOCK_SECTION_PARAMS, fromMonday: FROM_MONDAY_FLAG };
    const decorator = new FromMondayDecorator(mockInnerEngine, FROM_MONDAY_FLAG);

    decorator.getDays(MOCK_DATES.FEB_2026, params);

    expect(mockInnerEngine.getDays).toHaveBeenCalledWith(
      MOCK_DATES.FEB_2026,
      expect.objectContaining(params)
    );
  });
});
