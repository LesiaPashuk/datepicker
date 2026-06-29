import { CalendarEngine } from '@entities/calendar/model/types';
import { INPUT_TYPE } from '@features/rangeCalender/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { MOCK_PARAMS } from '../../tests/constants';
import { RangeDecorator } from '../RangeCalenderDecorator';

const START_DATE = new Date(2025, 0, 10);
const END_DATE = new Date(2025, 0, 15);
const EARLIER_DATE = new Date(2025, 0, 5);
const NEW_DATE = new Date(2025, 0, 1);

describe('RangeDecorator', () => {
  let mockEngine: jest.Mocked<CalendarEngine>;
  let decorator: RangeDecorator;

  beforeEach(() => {
    mockEngine = {
      getDays: jest.fn(),
      getNextDate: jest.fn(),
      getPreviousDate: jest.fn(),
      getNextYear: jest.fn(),
    };

    decorator = new RangeDecorator(mockEngine);
  });

  describe('Range Selection Logic', () => {
    test('should reset rangeStart if second clicked date is before current rangeStart', () => {
      decorator.handleRangeClick(START_DATE);
      const result = decorator.handleRangeClick(EARLIER_DATE);

      expect(result.rangeStart).toEqual(EARLIER_DATE);
      expect(result.rangeEnd).toBeNull();
    });
  });

  describe('Clearing Range', () => {
    test('should clear both dates when inputType is not END', () => {
      decorator.handleRangeClick(NEW_DATE);
      decorator.handleRangeClick(EARLIER_DATE);

      decorator.clearRange(INPUT_TYPE.START);

      expect(decorator.getRangeStart()).toBeNull();
      expect(decorator.getRangeEnd()).toBeNull();
    });

    test('should clear only rangeEnd when inputType is END', () => {
      decorator.handleRangeClick(START_DATE);
      decorator.handleRangeClick(END_DATE);

      decorator.clearRange(INPUT_TYPE.END);

      expect(decorator.getRangeStart()).toEqual(START_DATE);
      expect(decorator.getRangeEnd()).toBeNull();
    });
  });
  test('should update rangeStart and notify listeners when setRangeStart is called', () => {
    const listener = jest.fn();

    decorator.subscribe(listener);
    decorator.setRangeStart(NEW_DATE);

    expect(decorator.getRangeStart()).toEqual(NEW_DATE);
    expect(listener).toHaveBeenCalledTimes(FIRST_INDEX);
  });

  test('should update rangeEnd and notify listeners when setRangeEnd is called', () => {
    const listener = jest.fn();

    decorator.subscribe(listener);
    decorator.setRangeEnd(NEW_DATE);

    expect(decorator.getRangeEnd()).toEqual(NEW_DATE);
    expect(listener).toHaveBeenCalledTimes(FIRST_INDEX);
  });

  test('should correctly mark isSelected and isInRange', () => {
    const midDate = new Date(2025, 0, 2);
    const endDate = new Date(2025, 0, 3);

    const mockDays = [
      { date: NEW_DATE, isSelected: false, isInRange: false },
      { date: midDate, isSelected: false, isInRange: false },
    ];

    mockEngine.getDays.mockReturnValue(mockDays as any);

    const result = decorator.getDays(new Date(), {
      ...MOCK_PARAMS,
      rangeStart: NEW_DATE,
      rangeEnd: endDate,
    });

    expect(result[START_DATE_INDEX_].isSelected).toBe(true);
    expect(result[START_DATE_INDEX_].isInRange).toBe(true);

    expect(result[FIRST_INDEX].isSelected).toBe(false);
    expect(result[FIRST_INDEX].isInRange).toBe(true);
  });

  test('should unsubscribe correctly', () => {
    const listener = jest.fn();
    const unsubscribe = decorator.subscribe(listener);

    unsubscribe();
    decorator.handleRangeClick(NEW_DATE);

    expect(listener).not.toHaveBeenCalled();
  });
});
