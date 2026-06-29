import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';

import { BaseCalendarEngine } from './BaseCalendarEngine';

export class FromMondayDecorator extends BaseCalendarEngine {
  private fromMonday: boolean;
  constructor(engine: CalendarEngine, fromMonday: boolean) {
    super(engine);
    this.fromMonday = fromMonday || false;
  }

  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    const days = this.engine.getDays(currentDate, { ...params, fromMonday: this.fromMonday });

    return days;
  }
}
