import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';

import { BaseCalendarEngine } from './BaseCalendarEngine';

export class HolidayDecorator extends BaseCalendarEngine {
  private holidays: Set<number>;

  constructor(engine: CalendarEngine, holidays: Date[]) {
    (super(engine), (this.holidays = new Set(holidays.map((el) => el.getTime()))));
  }
  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    const days = this.engine.getDays(currentDate, params);

    return days.map((day) => {
      const dayTime = day.date.getTime();

      if (this.holidays.has(dayTime)) {
        return { ...day, isHoliday: true };
      }

      return day;
    });
  }
}
