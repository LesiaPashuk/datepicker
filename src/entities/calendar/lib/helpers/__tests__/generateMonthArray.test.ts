import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import {
  expectCalendarCellStructure,
  MOCK_DATES,
  MOCK_SECTION_PARAMS,
} from '../../tests/constants';
import { CELLS_LENGTH, generateMonthArray, MIN_CELLS_LENGTH } from '../generateMonthArray';

describe('generation month array', () => {
  describe('base test for generation of month array', () => {
    test('should return 42 cell for NOV_2025', () => {
      const result = generateMonthArray(MOCK_DATES.NOV_2025, MOCK_SECTION_PARAMS);

      expect(result).toHaveLength(CELLS_LENGTH);
    });
    test('should return 28 cell for FEB_2026', () => {
      const result = generateMonthArray(MOCK_DATES.FEB_2026, MOCK_SECTION_PARAMS);

      expect(result).toHaveLength(MIN_CELLS_LENGTH);
    });
    test('should return 35 cell for FEB_2026 if start from monday', () => {
      const LENGTH_CELLS = 35;

      const result = generateMonthArray(MOCK_DATES.FEB_2026, {
        ...MOCK_SECTION_PARAMS,
        fromMonday: true,
      });

      expect(result).toHaveLength(LENGTH_CELLS);
    });
    test('correct cell structure', () => {
      const result = generateMonthArray(MOCK_DATES.NOV_2025, MOCK_SECTION_PARAMS);

      result.forEach((cell) => {
        expectCalendarCellStructure(cell);
      });
    });
  });

  describe('generation array for november', () => {
    test('correct array for november', () => {
      const NOVEMBER_MONTH_LENGTH = 30;
      const OCTOBER_NOVEMBER_LENGTH = 6;
      const OCTOBER_START_DAY = 26;
      const result = generateMonthArray(MOCK_DATES.NOV_2025, MOCK_SECTION_PARAMS);

      const novemberCells = result.filter((el) => el.isCurrentMonth === true);
      const octoberCells = result.filter(
        (el) => el.isCurrentMonth !== true && el.dayNumber >= OCTOBER_START_DAY
      );
      const decemberCell = result.filter(
        (el) => el.isCurrentMonth !== true && el.dayNumber < OCTOBER_START_DAY
      );

      expect(result).toHaveLength(CELLS_LENGTH);
      expect(novemberCells).toHaveLength(NOVEMBER_MONTH_LENGTH);
      expect(octoberCells).toHaveLength(OCTOBER_NOVEMBER_LENGTH);
      expect(decemberCell).toHaveLength(OCTOBER_NOVEMBER_LENGTH);
    });

    test('selected date', () => {
      const params = {
        ...MOCK_SECTION_PARAMS,
        selectedDate: MOCK_DATES.NOV_2025,
      };

      const result = generateMonthArray(MOCK_DATES.NOV_2025, params);

      const selectedCell = result.find(
        (cell) => cell.date.getTime() === MOCK_DATES.NOV_2025.getTime()
      );

      expect(selectedCell).toBeDefined();
      expect(selectedCell?.isSelected).toBe(true);
      expect(selectedCell?.dayNumber).toBe(MOCK_DATES.NOV_2025.getDate());
      expect(selectedCell?.isCurrentMonth).toBe(true);
    });

    test('range date', () => {
      const RANGE_LENGTH = 6;
      const result = generateMonthArray(MOCK_DATES.NOV_2025, MOCK_SECTION_PARAMS);

      const rangeCells = result.filter(({ isInRange }) => isInRange);

      const rangeStart = rangeCells[START_DATE_INDEX_];
      const rangeEnd = rangeCells[rangeCells.length - FIRST_INDEX];

      expect(rangeCells).toBeDefined();
      expect(rangeCells).toHaveLength(RANGE_LENGTH);
      expect(rangeStart?.dayNumber).toBe(MOCK_DATES.NOV_2025.getDate());
      expect(rangeEnd?.dayNumber).toBe(MOCK_DATES.NOV_RANGE_END.getDate());
      rangeCells.forEach((el) => expect(el.isInRange).toBe(true));
    });

    test('range date error', () => {
      const params = {
        selectedDate: null,
        rangeStart: null,
        rangeEnd: null,
      };
      const result = generateMonthArray(MOCK_DATES.NOV_2025, params);

      const rangeCells = result.filter(({ isInRange }) => isInRange);

      expect(rangeCells).toBeDefined();
      expect(rangeCells).toHaveLength(0);
    });
  });
});
