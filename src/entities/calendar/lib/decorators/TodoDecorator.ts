import { StorageService } from '@entities/calendar/model/storageService';
import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { BaseCalendarEngine } from './BaseCalendarEngine';

export class TodoDecorator extends BaseCalendarEngine {
  private STORAGE_KEY = 'calendar_todos';
  private storage = new StorageService<Record<string, string[]>>(this.STORAGE_KEY, {});

  constructor(engine: CalendarEngine) {
    super(engine);
  }

  private getDateKey(date: Date): string {
    return date.toISOString().split('T')[START_DATE_INDEX_];
  }

  private getAllTodos(): Record<string, string[]> {
    return this.storage.get();
  }

  public getTodosByDate(date: Date): string[] {
    const key = this.getDateKey(date);

    return this.getAllTodos()[key] || [];
  }

  public addTodo(date: Date, todo: string): void {
    const key = this.getDateKey(date);
    const allTodos = this.getAllTodos();

    allTodos[key] = allTodos[key] || [];
    allTodos[key].push(todo);

    this.storage.set(allTodos);
  }

  public deleteTodo(date: Date, todo: string): void {
    const key = this.getDateKey(date);
    const allTodos = this.getAllTodos();

    allTodos[key] = allTodos[key] || [];
    allTodos[key] = allTodos[key].filter((item) => item !== todo);

    this.storage.set(allTodos);
  }

  getDays(currentDate: Date, params: SectionParams): CalendarCellProps[] {
    const todos = this.getAllTodos();
    const days = this.engine.getDays(currentDate, params);

    return days.map((day) => {
      const key = this.getDateKey(day.date);
      const haveToDo = todos[key] && todos[key].length > 0;

      return {
        ...day,
        todo: todos[key] || [],
        haveToDo,
      };
    });
  }
}
