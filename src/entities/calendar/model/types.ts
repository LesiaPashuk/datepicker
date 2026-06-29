import { MouseEvent } from 'react';

export interface CalendarCellProps {
  id: string;
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isHoliday?: boolean;
  isSelected?: boolean;
  isInRange?: boolean;
  isWeekend?: boolean;
  backgroundColor?: string;
  textColor?: string;
  isDisabled?: boolean;
  onClick?: (_date: Date, _event?: MouseEvent<HTMLDivElement>) => void;
  onDayClickDouble?: (_date: Date, _event?: MouseEvent<HTMLDivElement>) => void;
  haveToDo?: boolean;
}

export interface CalendarGridProps {
  dateArray: CalendarCellProps[];
  onDayClick: (_date: Date, _event?: MouseEvent<HTMLDivElement>) => void;
  onDayClickDouble?: (_date: Date, _event?: MouseEvent<HTMLDivElement>) => void;
}

export interface CalenderHeaderProps {
  fromMonday: boolean;
}

export interface Weekday {
  id: string;
  weekday: string;
}

export interface BaseCalendarProps {
  dateArray: CalendarCellProps[];
  fromMonday: boolean;
  month: string;
  year: number;
  onClickNext: () => void;
  onClickPrevious: () => void;
  onDayClick: (_date: Date, event?: MouseEvent<HTMLDivElement>) => void;
  onDayClickDouble?: (_date: Date, _event?: MouseEvent<HTMLDivElement>) => void;
  canNext: boolean;
  canPrev: boolean;
  onDayRangeClick: (_date: Date) => void;
  yearsArray: number[];
  onClickNextYear: (_newYear: number) => void;
  darkThemed?: boolean;
}

export interface SectionParams {
  selectedDate: Date | null;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  fromMonday?: boolean;
}

export interface CalendarEngine {
  getNextDate(date: Date): Date;
  getPreviousDate(date: Date): Date;
  getNextYear(date: Date, newYear: number): Date;
  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[];
}

export interface ValidationResult {
  isValid: boolean;
  error: string;
  date: Date | null;
}
export interface EngineConfig {
  holidays?: Date[];
  withHoliday?: boolean;
  withWeekend?: boolean;
  fromMonday?: boolean;
  minDate?: Date;
  maxDate?: Date;
  defaultDate?: Date;
  viewByWeek?: boolean;
  withRange?: boolean;
  withTodo?: boolean;
  darkThemed?: boolean;
}
