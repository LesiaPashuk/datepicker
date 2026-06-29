import { MouseEvent } from 'react';

import { useCalendarService } from '@shared/lib/useCalendarService';
import { act, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useCalendarPortal } from '../lib/useCalendarPortal';
import { CalendarWithTodo } from '../ui/CalenderWithTodo';

export type BaseCalendarMockProps = {
  onDayClick?: (date: Date, event?: MouseEvent<HTMLDivElement>) => void;
  onDayClickDouble?: (date: Date, event?: MouseEvent<HTMLDivElement>) => void;
};

export const createReactMockEl = () => {
  const React = require('react');

  return {
    BaseCalendar: ({ onDayClick, onDayClickDouble }: BaseCalendarMockProps) =>
      React.createElement('div', {}, [
        React.createElement(
          'button',
          {
            key: 'no-event',
            onClick: () => onDayClick?.(new Date()),
            'aria-label': 'click-no-event',
          },
          'click-no-event'
        ),
        React.createElement(
          'button',
          {
            key: 'with-event',
            'aria-label': 'click-with-event',
            onClick: (e: MouseEvent<HTMLDivElement>) => onDayClick?.(new Date(), e),
          },
          'click-with-event'
        ),
        React.createElement(
          'button',
          {
            key: 'dbl-no-event',
            'aria-label': 'dbl-no-event',
            onClick: () => onDayClickDouble?.(new Date()),
          },
          'dbl-no-event'
        ),
        React.createElement(
          'button',
          {
            key: 'dbl-with-event',
            'aria-label': 'dbl-with-event',
            onClick: (e: MouseEvent<HTMLDivElement>) => onDayClickDouble?.(new Date(), e),
          },
          'dbl-with-event'
        ),
      ]),
  };
};

export const TEST_TEXT = {
  CLICK_NO_EVENT: 'click-no-event',
  CLICK_WITH_EVENT: 'click-with-event',
  DBL_NO_EVENT: 'dbl-no-event',
  DBL_WITH_EVENT: 'dbl-with-event',
  ADD: 'Add',
  DELETE_LABEL: 'Delete task',
  CONFIRM: 'Yes',
  NEW_TASK: 'New task',
  ADD_BUTTON: 'Add',
};

export const DEFAULT_DATE = new Date(2025, 1, 1);

export const createServiceMock = (todos: string[] = []) => ({
  addTodo: jest.fn(),
  deleteTodo: jest.fn(),
  getTodosByDate: jest.fn(() => todos),
  setSelectedDate: jest.fn(),
});

export const createViewModelMock = () => ({
  fromMonday: false,
  dateArray: [],
  month: 'January',
  year: 2025,
  yearsArray: [2024, 2025, 2026],
  canNext: true,
  canPrev: true,
  onClickNext: jest.fn(),
  onClickPrevious: jest.fn(),
  onDayClick: jest.fn(),
  onClickNextYear: jest.fn(),
});

export const createPortalMock = (aditiionProps = {}) => ({
  isOpenPortal: true,
  selectedDate: DEFAULT_DATE,
  anchorEl: document.createElement('div'),
  portalRef: { current: null },
  closePortal: jest.fn(),
  openPortal: jest.fn(),
  ...aditiionProps,
});

export const setup = (options?: {
  service?: ReturnType<typeof createServiceMock>;
  portal?: ReturnType<typeof createPortalMock>;
}) => {
  const service = options?.service ?? createServiceMock();
  const portal = options?.portal ?? createPortalMock();

  (useCalendarService as jest.Mock).mockReturnValue({
    service,
    viewModel: createViewModelMock(),
  });

  (useCalendarPortal as jest.Mock).mockReturnValue(portal);

  render(<CalendarWithTodo />);

  return {
    service,
    portal,
    user: userEvent.setup(),
  };
};

export const createElement = () => document.createElement('div');

export const setupPortal = () => {
  const utils = renderHook(() => useCalendarPortal());

  return {
    ...utils,
    open: (date = DEFAULT_DATE, el = createElement()) =>
      act(() => {
        utils.result.current.openPortal(date, el);

        return { date, el };
      }),
    close: () =>
      act(() => {
        utils.result.current.closePortal();
      }),
  };
};
