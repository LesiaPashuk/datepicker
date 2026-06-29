import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarWithInput } from '../CalendarWithInput';

const INPUT_VALUE = '12.05.2025';

const setup = () => {
  const user = userEvent.setup();

  render(<CalendarWithInput />);

  const input = screen.getByRole('textbox');

  const openButton = screen.getByRole('button', {
    name: 'Open calendar',
  });

  return {
    user,
    input,
    openButton,
  };
};

describe('CalendarWithInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('updates input value on change', async () => {
    const { user, input } = setup();

    await user.type(input, INPUT_VALUE);

    expect(input).toHaveDisplayValue(/12.*2025/);
  });

  test('toggles calendar on button click', async () => {
    const { user, openButton } = setup();

    await user.click(openButton);

    expect(screen.getByRole('article')).toBeInTheDocument();

    await user.click(openButton);

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  test('clears input and closes calendar', async () => {
    const { user, input } = setup();
    const clearButton = screen.getByRole('button', {
      name: 'Clear input',
    });

    await user.type(input, INPUT_VALUE);
    await user.click(input);
    await user.click(clearButton);

    expect(input).toHaveValue('');
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  test('renders calendar when opened', async () => {
    const { user, openButton } = setup();

    await user.click(openButton);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
