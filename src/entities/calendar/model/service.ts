import { MouseEvent } from 'react';

import { ActiveInputType } from '@features/rangeCalender/model/types';

import { CalenderDecorator } from '../lib/decorators/CalenderDecorator';
import { FromMondayDecorator } from '../lib/decorators/FromMondayDecorator';
import { HolidayDecorator } from '../lib/decorators/HolidayDecorator';
import { MinMaxDecorator } from '../lib/decorators/MinMaxDecorator';
import { RangeDecorator } from '../lib/decorators/RangeCalenderDecorator';
import { TodoDecorator } from '../lib/decorators/TodoDecorator';
import { ViewByWeekDecorator } from '../lib/decorators/ViewByWeekDecorator';
import { WeekdayDecorator } from '../lib/decorators/WeekdayDecorator';
import { generateYearArray } from '../lib/helpers/generateYearArray';
import { validateDateInput } from '../lib/helpers/validationInput';

import { BaseCalendarProps, CalendarEngine, EngineConfig } from './types';

export class DatepickerService {
  private engine: CalendarEngine;
  private viewDate: Date;
  private selectedDate: Date | null;
  private listeners = new Set<() => void>();
  private yearsArray: number[] = [];

  constructor(_config?: EngineConfig) {
    this.engine = this.composeEngine(_config);
    this.viewDate = this.selectFirstDay(_config);
    this.selectedDate = _config?.defaultDate || null;
    this.yearsArray = generateYearArray(
      _config?.minDate?.getFullYear(),
      _config?.maxDate?.getFullYear()
    );
  }

  private composeEngine(_config?: EngineConfig): CalendarEngine {
    let engine: CalendarEngine = new CalenderDecorator();

    if (_config?.maxDate || _config?.minDate || _config?.defaultDate)
      engine = new MinMaxDecorator(engine, _config.minDate, _config.maxDate);

    if (_config?.withHoliday && _config.holidays)
      engine = new HolidayDecorator(engine, _config.holidays);

    if (_config?.withWeekend) engine = new WeekdayDecorator(engine);

    if (_config?.fromMonday) engine = new FromMondayDecorator(engine, _config.fromMonday);

    if (_config?.viewByWeek) engine = new ViewByWeekDecorator(engine);

    if (_config?.withTodo) engine = new TodoDecorator(engine);

    if (_config?.withRange) engine = new RangeDecorator(engine);

    return engine;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  public notify() {
    this.listeners.forEach((listener) => listener());
  }

  public next() {
    this.viewDate = this.engine.getNextDate(this.viewDate);
    this.notify();
  }
  public prev() {
    this.viewDate = this.engine.getPreviousDate(this.viewDate);
    this.notify();
  }

  public handleInputChange(value: string) {
    const result = validateDateInput(value);

    if (result.isValid && result.date) {
      this.selectedDate = result.date;
      this.viewDate = result.date;
      this.notify();
    }

    return result;
  }

  public getInputValue(): string {
    if (!this.selectedDate) {
      return '';
    }

    return this.selectedDate.toLocaleDateString();
  }

  public setSelectedDate(date: Date | null) {
    this.selectedDate = date;
    if (date) this.viewDate = date;
    this.notify();
  }

  public getSelectedDate(): Date | null {
    return this.selectedDate;
  }
  private getNextYear(newYear: number): Date {
    const newDate = this.engine.getNextYear(this.viewDate, newYear);

    this.viewDate = newDate;

    this.notify();

    return newDate;
  }
  public getViewModel(): BaseCalendarProps {
    const nextDate = this.engine.getNextDate(this.viewDate);
    const prevDate = this.engine.getPreviousDate(this.viewDate);
    let rangeStart = null;
    let rangeEnd = null;

    if (this.engine instanceof RangeDecorator) {
      rangeStart = this.engine.getRangeStart();
      rangeEnd = this.engine.getRangeEnd();
    }

    return {
      dateArray: this.engine.getDays(this.viewDate, {
        selectedDate: this.selectedDate,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
      }),
      fromMonday: false,
      month: this.viewDate.toLocaleString('en-US', { month: 'long' }),
      year: this.viewDate.getFullYear(),
      onClickNext: () => this.next(),
      onClickPrevious: () => this.prev(),
      onDayClick: (date: Date, _event?: MouseEvent<HTMLDivElement>) => this.setSelectedDate(date),
      onDayRangeClick: (date: Date) => this.handleRangeClick(date.toLocaleDateString()),
      onClickNextYear: (newYear: number) => this.getNextYear(newYear),
      canNext: nextDate.getTime() !== this.viewDate.getTime(),
      canPrev: prevDate.getTime() !== this.viewDate.getTime(),
      yearsArray: this.yearsArray,
    };
  }

  private selectFirstDay(_config?: EngineConfig): Date {
    const min = _config?.minDate;
    const max = _config?.maxDate;
    const defaultDate = _config?.defaultDate || new Date();

    const isTooEarly = min && defaultDate.getTime() < min.getTime();
    const isTooLate = max && defaultDate.getTime() > max.getTime();

    if (isTooEarly || isTooLate) {
      return min || max || defaultDate;
    }

    return defaultDate;
  }

  public handleRangeClick(value: string) {
    const date = validateDateInput(value);

    if (date.isValid && date.date && this.engine instanceof RangeDecorator) {
      const { rangeStart, rangeEnd } = this.engine.handleRangeClick(date.date);

      this.selectedDate = rangeEnd || rangeStart;
      this.viewDate = date.date;
      this.notify();
    }

    return date;
  }

  public clearRange(inputType?: ActiveInputType) {
    if (this.engine instanceof RangeDecorator) {
      this.engine.clearRange(inputType);
      const start = this.engine.getRangeStart();
      const end = this.engine.getRangeEnd();

      this.selectedDate = end || start;
      this.notify();
    }
  }
  public getRange(): { start: Date | null; end: Date | null } {
    if (this.engine instanceof RangeDecorator) {
      return {
        start: this.engine.getRangeStart(),
        end: this.engine.getRangeEnd(),
      };
    }

    return { start: null, end: null };
  }

  public setRangeStart(date: Date | null) {
    if (this.engine instanceof RangeDecorator) {
      this.engine.setRangeStart(date);
      this.selectedDate = date;
      if (date) this.viewDate = date;
      this.notify();
    }
  }

  public setRangeEnd(date: Date | null) {
    if (this.engine instanceof RangeDecorator) {
      this.engine.setRangeEnd(date);
      this.selectedDate = date;
      if (date) this.viewDate = date;
      this.notify();
    }
  }

  public getRangeStart(): Date | null {
    if (this.engine instanceof RangeDecorator) {
      return this.engine.getRangeStart();
    }

    return null;
  }

  public getRangeEnd(): Date | null {
    if (this.engine instanceof RangeDecorator) {
      return this.engine.getRangeEnd();
    }

    return null;
  }

  public addTodo(date: Date, text: string) {
    if (this.engine instanceof TodoDecorator) {
      this.engine.addTodo(date, text);
      this.notify();
    }
  }

  public getTodosByDate(date: Date): string[] {
    if (this.engine instanceof TodoDecorator) {
      return this.engine.getTodosByDate(date);
    }

    return [];
  }

  public deleteTodo(date: Date, todo: string): void {
    if (this.engine instanceof TodoDecorator) {
      this.engine.deleteTodo(date, todo);
      this.notify();
    }
  }
}
