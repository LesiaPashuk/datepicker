import { CalendarCellProps, CalendarEngine, SectionParams } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { TodoDecorator } from '../TodoDecorator';

type CalendarCellWithTodo = CalendarCellProps & {
  todo: string[];
  haveToDo: boolean;
};

const DATE_1 = new Date(2026, 0, 1);
const DATE_2 = new Date(2026, 0, 2);

const TODO_1 = 'Buy milk';
const TODO_2 = 'Learn JS';

const createMockDay = (date: Date, index: number): CalendarCellProps => ({
  id: `${date.getTime()}-${index}`,
  date,
  dayNumber: date.getDate(),
  isCurrentMonth: true,
  isSelected: false,
  isInRange: false,
});

describe('TodoDecorator', () => {
  let mockEngine: jest.Mocked<CalendarEngine>;
  let decorator: TodoDecorator;

  beforeEach(() => {
    localStorage.clear();

    mockEngine = {
      getDays: jest.fn(),
      getNextDate: jest.fn(),
      getPreviousDate: jest.fn(),
      getNextYear: jest.fn(),
    };

    decorator = new TodoDecorator(mockEngine);
  });

  test('should return empty array if no todos exist', () => {
    const todos = decorator.getTodosByDate(DATE_1);

    expect(todos).toEqual([]);
  });

  test('should add todo to specific date', () => {
    decorator.addTodo(DATE_1, TODO_1);

    const todos = decorator.getTodosByDate(DATE_1);

    expect(todos).toEqual([TODO_1]);
  });

  test('should append multiple todos to same date', () => {
    decorator.addTodo(DATE_1, TODO_1);
    decorator.addTodo(DATE_1, TODO_2);

    const todos = decorator.getTodosByDate(DATE_1);

    expect(todos).toEqual([TODO_1, TODO_2]);
  });

  test('should store todos separately for different dates', () => {
    decorator.addTodo(DATE_1, TODO_1);
    decorator.addTodo(DATE_2, TODO_2);

    expect(decorator.getTodosByDate(DATE_1)).toEqual([TODO_1]);
    expect(decorator.getTodosByDate(DATE_2)).toEqual([TODO_2]);
  });

  test('should delete specific todo', () => {
    decorator.addTodo(DATE_1, TODO_1);
    decorator.addTodo(DATE_1, TODO_2);

    decorator.deleteTodo(DATE_1, TODO_1);

    const todos = decorator.getTodosByDate(DATE_1);

    expect(todos).toEqual([TODO_2]);
  });

  test('should not fail if deleting non-existing todo', () => {
    decorator.addTodo(DATE_1, TODO_1);

    decorator.deleteTodo(DATE_1, 'Unknown');

    const todos = decorator.getTodosByDate(DATE_1);

    expect(todos).toEqual([TODO_1]);
  });

  test('should attach todos to calendar days', () => {
    const mockDays = [createMockDay(DATE_1, START_DATE_INDEX_), createMockDay(DATE_2, FIRST_INDEX)];

    mockEngine.getDays.mockReturnValue(mockDays);

    decorator.addTodo(DATE_1, TODO_1);

    const result = decorator.getDays(new Date(), {} as SectionParams) as CalendarCellWithTodo[];

    expect(result[START_DATE_INDEX_].todo).toEqual([TODO_1]);
    expect(result[START_DATE_INDEX_].haveToDo).toBe(true);

    expect(result[FIRST_INDEX].todo).toEqual([]);
    expect(result[FIRST_INDEX].haveToDo).toBeUndefined();
  });
});
