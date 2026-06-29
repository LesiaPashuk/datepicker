import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';

export abstract class BaseCalendarEngine implements CalendarEngine {
  constructor(protected engine: CalendarEngine) {}

  getNextDate(date: Date): Date {
    return this.engine.getNextDate(date);
  }
  getPreviousDate(date: Date): Date {
    return this.engine.getPreviousDate(date);
  }
  getNextYear(date: Date, newYear: number): Date {
    return this.engine.getNextYear(date, newYear);
  }
  abstract getDays(currentDate: Date, params: SectionParams): CalendarCellProps[];
}
