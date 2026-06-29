import { MOCK_DATES_GRID } from '@entities/calendar/lib/tests/constants';
import { FIRST_INDEX } from '@shared/model/constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarGrid } from '../CalendarGrid/CalendarGrid';

const setup = (props = {}) => {
  const user = userEvent.setup();
  const handlers = {
    onDayClick: jest.fn(),
    onDayClickDouble: jest.fn(),
  };

  render(<CalendarGrid dateArray={MOCK_DATES_GRID} {...handlers} {...props} />);

  return { user, ...handlers };
};

describe('CalendarGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls onDayClickDouble on double click', async () => {
    const { user, onDayClickDouble } = setup();

    await user.dblClick(screen.getByRole('cell', { name: /2/i }));

    expect(onDayClickDouble).toHaveBeenCalledTimes(FIRST_INDEX);
  });

  test('calls onDayClick on click', async () => {
    const { user, onDayClick } = setup();

    await user.click(screen.getByRole('cell', { name: /1/i }));

    expect(onDayClick).toHaveBeenCalledTimes(FIRST_INDEX);
  });

  test('double click also triggers click twice', async () => {
    const CALLS_TIMES = 2;
    const { user, onDayClick } = setup();

    await user.dblClick(screen.getByRole('cell', { name: /2/i }));

    expect(onDayClick).toHaveBeenCalledTimes(CALLS_TIMES);
  });
});
