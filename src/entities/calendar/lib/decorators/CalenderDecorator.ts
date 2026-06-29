import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';

import { generateMonthArray } from '../helpers/generateMonthArray';

export class CalenderDecorator implements CalendarEngine {
  getNextDate(date: Date): Date {
    const newDate = new Date(date.getFullYear(), date.getMonth() + FIRST_INDEX, FIRST_INDEX);

    return newDate;
  }
  getPreviousDate(date: Date): Date {
    const newDate = new Date(date.getFullYear(), date.getMonth() - FIRST_INDEX, FIRST_INDEX);

    return newDate;
  }
  getNextYear(date: Date, newYear: number): Date {
    const newDate = new Date(newYear, date.getMonth(), FIRST_INDEX);

    return newDate;
  }

  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    return generateMonthArray(currentDate, params);
  }
}
