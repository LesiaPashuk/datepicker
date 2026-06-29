import { WEEK_LENGHT } from '@entities/calendar/model/constants';
import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { isSameDates } from '../helpers/isSameDates';

import { BaseCalendarEngine } from './BaseCalendarEngine';

export class ViewByWeekDecorator extends BaseCalendarEngine {
  constructor(engine: CalendarEngine) {
    super(engine);
  }
  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    const daysArray = this.engine.getDays(currentDate, params);
    const currentDateIndex = daysArray.findIndex((day) => isSameDates(day.date, currentDate));

    if (currentDateIndex === -FIRST_INDEX) return daysArray.slice(START_DATE_INDEX_, WEEK_LENGHT);
    const weekCount = Math.floor(currentDateIndex / WEEK_LENGHT);

    return daysArray.slice(weekCount * WEEK_LENGHT, weekCount * WEEK_LENGHT + WEEK_LENGHT);
  }

  getNextDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + WEEK_LENGHT);
  }

  getPreviousDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - WEEK_LENGHT);
  }
}
