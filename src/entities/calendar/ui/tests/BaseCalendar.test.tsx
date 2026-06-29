import { BASE_CALENDAR_PROPS, YEAR_26 } from '@entities/calendar/lib/tests/constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BaseCalendar } from '../BaseCalendar/BaseCalendar';

const renderCalendar = (props = {}) => {
  const finalProps = { ...BASE_CALENDAR_PROPS, ...props };

  return {
    user: userEvent.setup(),
    ...render(<BaseCalendar {...finalProps} />),
    props: finalProps,
  };
};

describe('BaseCalendar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('changes year from select', async () => {
    const { user, props } = renderCalendar();

    const select = screen.getByRole('combobox');

    await user.selectOptions(select, YEAR_26.toString());

    expect(props.onClickNextYear).toHaveBeenCalledWith(YEAR_26);
  });

  test('calls onDayClick when day is clicked', async () => {
    const { user, props } = renderCalendar();

    await user.click(screen.getByRole('cell'));

    expect(props.onDayClick).toHaveBeenCalled();
  });

  test('shows double click hint when handler exists', () => {
    const additionProps = {
      onDayClickDouble: jest.fn(),
    };

    renderCalendar(additionProps);

    expect(screen.getByText('Click twice on the day to add a task.')).toBeInTheDocument();
  });
});
