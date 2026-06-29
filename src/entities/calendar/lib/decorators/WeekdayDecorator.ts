import { SATURDAY_INDEX, SUNDAY_INDEX } from '@entities/calendar/model/constants';
import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';

import { BaseCalendarEngine } from './BaseCalendarEngine';

export class WeekdayDecorator extends BaseCalendarEngine {
  constructor(engine: CalendarEngine) {
    super(engine);
  }
  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    const days = this.engine.getDays(currentDate, params);

    return days.map((day) => {
      const dayDay = day.date.getDay();

      if (dayDay == SUNDAY_INDEX || dayDay == SATURDAY_INDEX) return { ...day, isWeekend: true };

      return day;
    });
  }
}
