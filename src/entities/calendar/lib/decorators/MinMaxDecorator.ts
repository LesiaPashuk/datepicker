import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';

import { isMinMaxValue } from '../helpers/isMinMaxValue';

import { BaseCalendarEngine } from './BaseCalendarEngine';

export class MinMaxDecorator extends BaseCalendarEngine {
  private minDate: Date | null;
  private maxDate: Date | null;

  constructor(engine: CalendarEngine, minDate?: Date, maxDate?: Date) {
    super(engine);
    this.minDate = minDate || null;
    this.maxDate = maxDate || null;
  }

  private isDateInRange(date: Date): boolean {
    return isMinMaxValue(date, this.minDate, this.maxDate);
  }

  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    const days = this.engine.getDays(currentDate, params) || [];

    return days.map((day) => {
      if (
        day.date.getTime() < (this.minDate?.getTime() || 0) ||
        day.date.getTime() > (this.maxDate?.getTime() || 0)
      ) {
        return { ...day, isDisabled: true, isCurrentMonth: false };
      }

      return day;
    });
  }

  getNextDate(date: Date): Date {
    const nextDate = this.engine.getNextDate(date);

    return this.isDateInRange(nextDate) ? nextDate : date;
  }

  getPreviousDate(date: Date): Date {
    const prevDate = this.engine.getPreviousDate(date);

    return this.isDateInRange(prevDate) ? prevDate : date;
  }

  getNextYear(date: Date, newYear: number): Date {
    const nextYear = this.engine.getNextYear(date, newYear);

    return this.isDateInRange(nextYear) ? nextYear : date;
  }
}
