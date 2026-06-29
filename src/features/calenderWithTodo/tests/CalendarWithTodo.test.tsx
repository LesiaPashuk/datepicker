import { MouseEvent } from 'react';

import { screen } from '@testing-library/react';

import {
  BaseCalendarMockProps,
  createServiceMock,
  DEFAULT_DATE,
  setup,
  TEST_TEXT,
} from '../lib/helperTests';

jest.mock('@shared/lib/useCalendarService');
jest.mock('../lib/useCalendarPortal');

jest.mock('@entities/calendar/ui/BaseCalendar/BaseCalendar', () => {
  const React = require('react');

  return {
    BaseCalendar: ({ onDayClick, onDayClickDouble }: BaseCalendarMockProps) =>
      React.createElement('div', {}, [
        React.createElement(
          'button',
          { key: 'no-event', onClick: () => onDayClick?.(new Date()) },
          'click-no-event'
        ),
        React.createElement(
          'button',
          {
            key: 'with-event',
            onClick: (e: MouseEvent<HTMLDivElement>) => onDayClick?.(new Date(), e),
          },
          'click-with-event'
        ),
        React.createElement(
          'button',
          { key: 'dbl-no-event', onClick: () => onDayClickDouble?.(new Date()) },
          'dbl-no-event'
        ),
        React.createElement(
          'button',
          {
            key: 'dbl-with-event',
            onClick: (e: MouseEvent<HTMLDivElement>) => onDayClickDouble?.(new Date(), e),
          },
          'dbl-with-event'
        ),
      ]),
  };
});
describe('CalendarWithTodo', () => {
  test('renders portal when open', () => {
    setup();

    expect(screen.getByLabelText('todo-portal')).toBeInTheDocument();
  });
});

describe('Day click handlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('onDayClick ignores call without event', async () => {
    const { user, service } = setup();

    await user.click(screen.getByRole('button', { name: TEST_TEXT.DBL_NO_EVENT }));

    expect(service.setSelectedDate).not.toHaveBeenCalled();
  });

  test('onDayClick works with event', async () => {
    const { user, service } = setup();

    await user.click(screen.getByRole('button', { name: TEST_TEXT.CLICK_WITH_EVENT }));

    expect(service.setSelectedDate).toHaveBeenCalled();
  });

  test('onDayClickDouble ignores call without event', async () => {
    const { user, service, portal } = setup();

    await user.click(screen.getByRole('button', { name: TEST_TEXT.CLICK_NO_EVENT }));

    expect(service.setSelectedDate).not.toHaveBeenCalled();
    expect(portal.openPortal).not.toHaveBeenCalled();
  });

  test('onDayClickDouble works with event', async () => {
    const { user, service, portal } = setup();

    await user.click(screen.getByRole('button', { name: TEST_TEXT.DBL_WITH_EVENT }));

    expect(service.setSelectedDate).toHaveBeenCalled();
    expect(portal.openPortal).toHaveBeenCalled();
  });
});

describe('Todo interactions', () => {
  test('adds todo via Portal', async () => {
    const service = createServiceMock([]);
    const { user } = setup({ service });

    await user.type(screen.getByRole('textbox'), TEST_TEXT.NEW_TASK);
    await user.click(screen.getByText(TEST_TEXT.ADD));

    expect(service.addTodo).toHaveBeenCalledWith(expect.any(Date), TEST_TEXT.NEW_TASK);
  });

  test('delete flow calls service.deleteTodo', async () => {
    const service = createServiceMock([TEST_TEXT.NEW_TASK]);
    const { user } = setup({ service });

    await user.click(screen.getByLabelText(TEST_TEXT.DELETE_LABEL));
    await user.click(screen.getByText(TEST_TEXT.CONFIRM));

    expect(service.deleteTodo).toHaveBeenCalledWith(DEFAULT_DATE, TEST_TEXT.NEW_TASK);
  });
});
