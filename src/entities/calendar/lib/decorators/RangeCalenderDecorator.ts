import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';
import { ActiveInputType, INPUT_TYPE } from '@features/rangeCalender/model/types';

import { isSameDates } from '../helpers/isSameDates';

import { BaseCalendarEngine } from './BaseCalendarEngine';

interface RangeInput {
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

export class RangeDecorator extends BaseCalendarEngine {
  private listeners = new Set<() => void>();
  private rangeStart: Date | null;
  private rangeEnd: Date | null;

  constructor(_config: CalendarEngine) {
    super(_config);
    this.rangeStart = null;
    this.rangeEnd = null;
  }

  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    const days = this.engine.getDays(currentDate, params);
    const { rangeStart, rangeEnd } = params;

    if (!rangeStart && !rangeEnd) return days;

    return days.map((day) => {
      const isStart = rangeStart ? isSameDates(day.date, rangeStart) : false;
      const isEnd = rangeEnd ? isSameDates(day.date, rangeEnd) : false;
      const inBetween =
        rangeStart && rangeEnd && day.date > rangeStart && day.date < rangeEnd ? true : false;

      return { ...day, isSelected: isStart || isEnd, isInRange: isStart || isEnd || inBetween };
    });
  }

  public getRangeStart(): Date | null {
    return this.rangeStart;
  }

  public getRangeEnd(): Date | null {
    return this.rangeEnd;
  }

  public setRangeStart(date: Date | null) {
    this.rangeStart = date;

    if (date && this.rangeEnd && date > this.rangeEnd) {
      this.rangeEnd = null;
    }
    this.notify();
  }

  public setRangeEnd(date: Date | null) {
    if (date && this.rangeStart && date < this.rangeStart) {
      return;
    }
    this.rangeEnd = date;
    this.notify();
  }

  public clearRange(inputType?: ActiveInputType) {
    if (inputType === INPUT_TYPE.END) {
      this.rangeEnd = null;
    } else {
      this.rangeEnd = null;
      this.rangeStart = null;
    }

    this.notify();
  }

  public handleRangeClick(date: Date): RangeInput {
    if (!this.rangeStart) {
      this.rangeStart = date;
    } else if (!this.rangeEnd) {
      if (date < this.rangeStart) {
        this.rangeStart = date;
        this.rangeEnd = null;
      } else {
        this.rangeEnd = date;
      }
    } else {
      this.rangeStart = date;
      this.rangeEnd = null;
    }

    this.notify();

    return {
      rangeStart: this.rangeStart,
      rangeEnd: this.rangeEnd,
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }
}
