import { CalendarCellProps, SectionParams } from '@entities/calendar/model/types';

import { BaseCalendarEngine } from '../decorators/BaseCalendarEngine';

export const MOCK_DATES = {
  NOV_2025: new Date(2025, 10, 15),
  NOV_RANGE_END: new Date(2025, 10, 20),
  FEB_2026: new Date(2026, 1, 15),
  MAR_2024: new Date(2024, 2, 15),
  DEC_2025: new Date(2025, 11, 15),
  FEB_2023: new Date(2023, 1, 15),
};

export const HOLIDAY_MOCK: CalendarCellProps[] = [
  { id: '1', date: new Date(2026, 0, 1), dayNumber: 1, isCurrentMonth: true },
  { id: '2', date: new Date(2026, 0, 2), dayNumber: 2, isCurrentMonth: true },
];

export const MOCK_PARAMS: SectionParams = {
  selectedDate: null,
  rangeStart: null,
  rangeEnd: null,
};

export const WEEKDAY_MOCK: CalendarCellProps[] = [
  { id: '1', date: MOCK_DATES.FEB_2026, dayNumber: 0, isCurrentMonth: true },
  { id: '2', date: MOCK_DATES.DEC_2025, dayNumber: 1, isCurrentMonth: false },
];

export const MIN_MAX_MOCK: CalendarCellProps[] = [
  { id: '1', date: MOCK_DATES.DEC_2025, dayNumber: 0, isCurrentMonth: true, isSelected: true },
];

export const MOCK_SECTION_PARAMS: SectionParams = {
  selectedDate: MOCK_DATES.NOV_2025,
  rangeStart: MOCK_DATES.NOV_2025,
  rangeEnd: MOCK_DATES.NOV_RANGE_END,
};

export const FIXED_GRID = [
  { date: new Date(2025, 0, 1) },
  { date: new Date(2025, 0, 2) },
  { date: new Date(2025, 0, 3) },
  { date: new Date(2025, 0, 4) },
  { date: new Date(2025, 0, 5) },
  { date: new Date(2025, 0, 6) },
  { date: new Date(2025, 0, 7) },
  { date: new Date(2025, 0, 8) },
  { date: new Date(2025, 0, 9) },
  { date: new Date(2025, 0, 10) },
  { date: new Date(2025, 0, 11) },
  { date: new Date(2025, 0, 12) },
  { date: new Date(2025, 0, 13) },
  { date: new Date(2025, 0, 14) },
];

export const expectCalendarCellStructure = (cell: CalendarCellProps) => {
  expect(cell).toHaveProperty('id');
  expect(cell).toHaveProperty('date');
  expect(cell).toHaveProperty('dayNumber');
  expect(cell).toHaveProperty('isCurrentMonth');
  expect(cell).toHaveProperty('isSelected');
  expect(cell).toHaveProperty('isInRange');
  expect(cell.date).toBeInstanceOf(Date);
  expect(typeof cell.dayNumber).toBe('number');
  expect(typeof cell.isCurrentMonth).toBe('boolean');
  expect(typeof cell.isSelected).toBe('boolean');
  expect(typeof cell.isInRange).toBe('boolean');
};

export const YEAR_25 = 2025;
export const YEAR_26 = 2026;

export class MockEngine extends BaseCalendarEngine {
  getDays(_currentDate: Date, _params: SectionParams) {
    return this.engine.getDays(_currentDate, _params);
  }
}

export const BASE_CALENDAR_PROPS = {
  fromMonday: false,
  month: 'January',
  year: 2025,
  yearsArray: [2024, 2025, 2026],
  dateArray: [
    {
      id: '1',
      date: new Date(2025, 0, 1),
      dayNumber: 1,
      isCurrentMonth: true,
    },
  ],
  canNext: true,
  canPrev: true,
  onClickNext: jest.fn(),
  onClickPrevious: jest.fn(),
  onDayClick: jest.fn(),
  onClickNextYear: jest.fn(),
  onDayRangeClick: jest.fn(),
};

export const DAY_CELL = 15;
export const DATE = new Date(2025, 0, DAY_CELL);

export const COLORS_CELL = {
  red: '#ff0000',
  blue: '#0000ff',
};

export const BASE_CELL_PROPS = {
  id: '1',
  date: DATE,
  dayNumber: DAY_CELL,
  isCurrentMonth: true,
  isHoliday: false,
  isSelected: false,
  isInRange: false,
  isWeekend: false,
  isDisabled: false,
  haveToDo: false,
};

export const MOCK_DATES_GRID = [
  {
    id: '1',
    date: new Date(2025, 0, 1),
    dayNumber: 1,
    isCurrentMonth: true,
  },
  {
    id: '2',
    date: new Date(2025, 0, 2),
    dayNumber: 2,
    isCurrentMonth: true,
  },
];
