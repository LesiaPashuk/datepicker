import { FromMondayDecorator } from '@entities/calendar/lib/decorators/FromMondayDecorator';
import { HolidayDecorator } from '@entities/calendar/lib/decorators/HolidayDecorator';
import { ViewByWeekDecorator } from '@entities/calendar/lib/decorators/ViewByWeekDecorator';
import { WeekdayDecorator } from '@entities/calendar/lib/decorators/WeekdayDecorator';
import { YEAR_25 } from '@entities/calendar/lib/tests/constants';
import { INPUT_TYPE } from '@features/rangeCalender/model/types';
import { FIRST_INDEX } from '@shared/model/constants';

import { DatepickerService } from '../service';

const MOCK_DATE = new Date(2026, 0, 1);

jest.mock('../../lib/decorators/HolidayDecorator');
jest.mock('../../lib/decorators/WeekdayDecorator');
jest.mock('../../lib/decorators/FromMondayDecorator');
jest.mock('../../lib/decorators/ViewByWeekDecorator');

describe('DatepickerService', () => {
  let service: DatepickerService;

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(MOCK_DATE);
  });

  beforeEach(() => {
    service = new DatepickerService();
  });

  test('should change viewDate to next month and notify listeners when next() is called', () => {
    const SERVICE_CALLS = 3;
    const spyNotify = jest.spyOn(service, 'notify');
    const initialViewDate = service.getViewModel();

    service.next();
    service.prev();
    service.next();

    const newViewModel = service.getViewModel();

    expect(newViewModel.month).not.toBe(initialViewDate.month);
    expect(spyNotify).toHaveBeenCalledTimes(SERVICE_CALLS);
  });

  test('should instantiate HolidayDecorator when withHoliday is true', () => {
    const config = {
      withHoliday: true,
      holidays: [MOCK_DATE],
    };

    new DatepickerService(config);

    expect(HolidayDecorator).toHaveBeenCalled();
  });

  test('should instantiate WeekdayDecorator', () => {
    const config = {
      withWeekend: true,
    };

    new DatepickerService(config);

    expect(WeekdayDecorator).toHaveBeenCalled();
  });

  test('should instantiate VeiwByWeek', () => {
    const config = {
      viewByWeek: true,
    };

    new DatepickerService(config);

    expect(ViewByWeekDecorator).toHaveBeenCalled();
  });

  test('returning defaultDate when in range', () => {
    const minDate = new Date(2020, 0, 1);
    const maxDate = new Date(2040, 0, 1);
    const validDefault = new Date(2030, 0, 1);

    const service = new DatepickerService({
      minDate,
      maxDate,
      defaultDate: validDefault,
    });

    const viewModel = service.getViewModel();

    expect(viewModel.year).toBe(validDefault.getFullYear());
    expect(viewModel.month).toBe(validDefault.toLocaleString('en-US', { month: 'long' }));
  });

  test('selectFirstDay with empty config', () => {
    const service = new DatepickerService({});

    const viewModel = service.getViewModel();
    const now = new Date();

    expect(viewModel.year).toBe(now.getFullYear());
  });

  test('should instantiate FromMondayDecorator', () => {
    const config = {
      fromMonday: true,
    };

    new DatepickerService(config);

    expect(FromMondayDecorator).toHaveBeenCalled();
  });

  test('should instantiate with default', () => {
    const config = {
      defaultDate: MOCK_DATE,
    };

    const serviceWithConfig = new DatepickerService(config);

    expect(serviceWithConfig.getSelectedDate()).toEqual(MOCK_DATE);
  });

  test('should unsubscribe correctly', () => {
    const listener = jest.fn();
    const unsubscribe = service.subscribe(listener);

    unsubscribe();
    service.notify();

    expect(listener).not.toHaveBeenCalled();
  });

  test('should update selectedDate and notify when setSelectedDate is called', () => {
    const spyNotify = jest.spyOn(service, 'notify');
    const initialSelectDate = service.getSelectedDate();

    service.setSelectedDate(MOCK_DATE);
    const newSelectDate = service.getSelectedDate();

    expect(initialSelectDate).not.toBe(newSelectDate);
    expect(service.getViewModel()).not.toBe(newSelectDate);
    expect(service.getSelectedDate()).toBe(MOCK_DATE);
    expect(spyNotify).toHaveBeenCalled();
  });

  test('should update state if input is valid', () => {
    const validInput = '01.01.2026';
    const CURRENT_YEAR = '2026';

    service.handleInputChange(validInput);
    const value = service.getInputValue();

    expect(value).toContain(FIRST_INDEX.toString());
    expect(value).toContain(CURRENT_YEAR);
    expect(service.getSelectedDate()?.getTime()).toBe(MOCK_DATE.getTime());
  });

  test('should NOT update selectedDate if is null', () => {
    const listener = jest.fn();

    service.subscribe(listener);
    service.setSelectedDate(null);

    expect(service.getSelectedDate()).toBeNull();
    expect(listener).toHaveBeenCalled();
  });

  test('should NOT update state if input is invalid', () => {
    const invalidInput = '32.11.2025';

    service.handleInputChange(invalidInput);

    expect(service.getInputValue()).toBe('');
    expect(service.getSelectedDate()).toBeNull();
  });
  test('should return correct initial structure', () => {
    const MOCK_MONTH = 'January';
    const model = service.getViewModel();

    expect(model.month).toBe(MOCK_MONTH);
    expect(model.year).toBe(MOCK_DATE.getFullYear());
  });

  test('should trigger onDayClick', () => {
    const model = service.getViewModel();
    const notifySpy = jest.spyOn(service, 'notify');

    model.onDayClick(MOCK_DATE);

    expect(service.getSelectedDate()).toEqual(MOCK_DATE);
    expect(notifySpy).toHaveBeenCalled();
  });

  test('should trigger onClickPrevious', () => {
    const MOCK_PREV_MONTH = 'December';
    const model = service.getViewModel();
    const notifySpy = jest.spyOn(service, 'notify');

    model.onClickPrevious();
    const updatedModelNext = service.getViewModel();

    expect(updatedModelNext.month).toBe(MOCK_PREV_MONTH);
    expect(notifySpy).toHaveBeenCalled();
  });
  test('should trigger onClickNext', () => {
    const MOCK_NEXT_MONTH = 'February';
    const model = service.getViewModel();
    const notifySpy = jest.spyOn(service, 'notify');

    model.onClickNext();
    const updatedModelNext = service.getViewModel();

    expect(updatedModelNext.month).toBe(MOCK_NEXT_MONTH);
    expect(notifySpy).toHaveBeenCalled();
  });
  test('should go to next month', () => {
    const service = new DatepickerService();

    const initial = service.getViewModel().month;

    service.next();

    const next = service.getViewModel().month;

    expect(next).not.toBe(initial);
  });
  test('should change year correctly', () => {
    const service = new DatepickerService();

    service.getViewModel().onClickNextYear(YEAR_25);

    const { year } = service.getViewModel();

    expect(year).toBe(YEAR_25);
  });

  test('should return minDate if defaultDate is earlier than minDate', () => {
    const minDate = new Date(2026, 5, 1);

    const service = new DatepickerService({
      minDate,
      defaultDate: MOCK_DATE,
    });

    const viewModel = service.getViewModel();

    expect(viewModel.year).toBe(minDate.getFullYear());
  });

  describe('DatepickerService - Range Logic', () => {
    let rangeService: DatepickerService;
    const config = { withRange: true };

    beforeEach(() => {
      rangeService = new DatepickerService(config);
    });

    test('should return empty range if range is not enabled', () => {
      const normalService = new DatepickerService();
      const range = normalService.getRange();

      expect(range).toEqual({ start: null, end: null });
    });

    test('should build range (clicks)', () => {
      const end = new Date(2026, 0, 5);

      rangeService.handleRangeClick('01.01.2026');
      rangeService.handleRangeClick('05.01.2026');

      const range = rangeService.getRange();

      expect(range.end).toEqual(end);
    });

    test('should clear range and notify listeners', () => {
      const notifySpy = jest.spyOn(rangeService, 'notify');

      rangeService.clearRange(INPUT_TYPE.START);

      const range = rangeService.getRange();

      expect(range.start).toBeNull();
      expect(range.end).toBeNull();
      expect(notifySpy).toHaveBeenCalled();
    });

    test('should trigger handleRangeClick', () => {
      const spyHandleClick = jest.spyOn(rangeService, 'handleRangeClick');
      const model = rangeService.getViewModel();

      model.onDayRangeClick(MOCK_DATE);

      expect(spyHandleClick).toHaveBeenCalledWith(MOCK_DATE.toLocaleDateString());
    });

    test('should setRangeStart correctly', () => {
      const notifySpy = jest.spyOn(rangeService, 'notify');

      rangeService.setRangeStart(MOCK_DATE);

      expect(rangeService.getRangeStart()).toEqual(MOCK_DATE);
      expect(rangeService.getSelectedDate()).toEqual(MOCK_DATE);
      expect(notifySpy).toHaveBeenCalled();
    });

    test('should setRangeEnd correctly', () => {
      const notifySpy = jest.spyOn(rangeService, 'notify');
      const end = new Date(2026, 0, 5);

      rangeService.setRangeEnd(end);

      expect(rangeService.getRangeEnd()).toEqual(end);
      expect(rangeService.getSelectedDate()).toEqual(end);
      expect(notifySpy).toHaveBeenCalled();
    });

    test('should return null for getRangeStart if range is disabled', () => {
      const normalService = new DatepickerService();

      expect(normalService.getRangeStart()).toBeNull();
    });

    test('should return null for getRangeEnd if range is disabled', () => {
      const normalService = new DatepickerService();

      expect(normalService.getRangeEnd()).toBeNull();
    });
  });

  describe('DatepickerService - Todo Logic', () => {
    let todoService: DatepickerService;

    const TODO_TEXT = 'Buy milk';

    beforeEach(() => {
      localStorage.clear();

      todoService = new DatepickerService({
        withTodo: true,
      });
    });

    test('should return empty array if todo decorator is not enabled', () => {
      const normalService = new DatepickerService();

      const todos = normalService.getTodosByDate(MOCK_DATE);

      expect(todos).toEqual([]);
    });

    test('should delete todo and notify listeners', () => {
      const notifySpy = jest.spyOn(todoService, 'notify');

      todoService.addTodo(MOCK_DATE, TODO_TEXT);
      todoService.deleteTodo(MOCK_DATE, TODO_TEXT);

      const todos = todoService.getTodosByDate(MOCK_DATE);

      expect(todos).toEqual([]);
      expect(notifySpy).toHaveBeenCalled();
    });

    test('should not fail when deleting from empty todos', () => {
      todoService.deleteTodo(MOCK_DATE, TODO_TEXT);

      const todos = todoService.getTodosByDate(MOCK_DATE);

      expect(todos).toEqual([]);
    });
  });
});
