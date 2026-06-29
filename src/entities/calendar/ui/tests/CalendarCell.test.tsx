import { BASE_CELL_PROPS, COLORS_CELL } from '@entities/calendar/lib/tests/constants';
import { FIRST_INDEX } from '@shared/model/constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarCell } from '../CalendarCell/CalendarCell';

const setup = (props = {}) => {
  const user = userEvent.setup();
  const utils = render(<CalendarCell {...BASE_CELL_PROPS} {...props} />);

  return {
    user,
    ...utils,
  };
};

describe('CalendarCell', () => {
  let handleClick: jest.Mock;
  let handleDouble: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    handleClick = jest.fn();
    handleDouble = jest.fn();
  });

  test('renders day number', () => {
    setup();

    expect(screen.getByRole('cell')).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const config = { onClick: handleClick };
    const { user } = setup(config);

    await user.click(screen.getByRole('cell'));

    expect(handleClick).toHaveBeenCalledTimes(FIRST_INDEX);
  });

  test('calls onDayClickDouble on double click', async () => {
    const config = { onDayClickDouble: handleDouble };
    const { user } = setup(config);

    await user.dblClick(screen.getByRole('cell'));

    expect(handleDouble).toHaveBeenCalledTimes(FIRST_INDEX);
  });

  test('does not call handlers when disabled', async () => {
    const config = {
      isDisabled: true,
      onClick: handleClick,
      onDayClickDouble: handleDouble,
    };
    const { user } = setup(config);
    const cell = screen.getByRole('cell');

    await user.click(cell);
    await user.dblClick(cell);

    expect(handleClick).not.toHaveBeenCalled();
    expect(handleDouble).not.toHaveBeenCalled();
  });

  test('shows todo indicator', () => {
    const config = { haveToDo: true };

    setup(config);

    expect(screen.getByText('˙')).toBeInTheDocument();
  });

  test('applies custom styles for weekend', () => {
    const config = {
      isWeekend: true,
      textColor: COLORS_CELL.red,
      backgroundColor: COLORS_CELL.blue,
    };

    setup(config);

    const cell = screen.getByRole('cell', { name: /day 15/i });

    expect(cell).toHaveStyle({
      color: COLORS_CELL.red,
      backgroundColor: COLORS_CELL.blue,
    });
  });

  test('applies holiday styles', () => {
    const config = {
      isHoliday: true,
      isCurrentMonth: true,
    };

    const { container } = setup(config);

    expect(container.firstChild).toHaveClass('cell--holiday');
  });

  test('applies selected styles', () => {
    const config = {
      isSelected: true,
    };

    const { container } = setup(config);

    expect(container.firstChild).toHaveClass('cell--selected');
  });

  test('applies range styles', () => {
    const config = {
      isInRange: true,
    };

    const { container } = setup(config);

    expect(container.firstChild).toHaveClass('cell--in-range');
  });
});
