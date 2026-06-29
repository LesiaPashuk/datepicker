import { screen } from '@testing-library/react';

import {
  setupPortal,
  TEST_DATE,
  TEST_TEXT_PORTAL,
  TODO_FIXTURES,
  TODO_SCENARIOS,
} from '../../model/testHelper';

describe('Portal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('does not render when closed', () => {
    setupPortal({ overrides: { isOpenPortal: false } });

    expect(screen.queryByText(TEST_TEXT_PORTAL.TITLE)).not.toBeInTheDocument();
  });

  test('renders todos list', () => {
    setupPortal({ todos: TODO_SCENARIOS.MULTIPLE });

    expect(screen.getByText(TODO_FIXTURES.ONE)).toBeInTheDocument();
    expect(screen.getByText(TODO_FIXTURES.TWO)).toBeInTheDocument();
  });

  test('adds todo', async () => {
    const { user, props } = setupPortal();

    await user.type(screen.getByRole('textbox'), TODO_FIXTURES.NEW);
    await user.click(screen.getByText(TEST_TEXT_PORTAL.ADD));

    expect(props.onAddTodo).toHaveBeenCalledWith(TEST_DATE, TODO_FIXTURES.NEW);
  });

  test('does not add todo if input is empty', async () => {
    const { user, props } = setupPortal();

    await user.click(screen.getByText(TEST_TEXT_PORTAL.ADD));

    expect(props.onAddTodo).not.toHaveBeenCalled();
  });

  test('deletes todo after confirmation', async () => {
    const { user, props } = setupPortal({
      todos: TODO_SCENARIOS.ONE,
    });

    await user.click(screen.getByLabelText(TEST_TEXT_PORTAL.DELETE_LABEL));
    await user.click(screen.getByText(TEST_TEXT_PORTAL.CONFIRM));

    expect(props.onDeleteTodo).toHaveBeenCalledWith(TEST_DATE, TODO_FIXTURES.ONE);
  });

  test('cancels delete', async () => {
    const { user, props } = setupPortal({
      todos: TODO_SCENARIOS.ONE,
    });

    await user.click(screen.getByLabelText(TEST_TEXT_PORTAL.DELETE_LABEL));
    await user.click(screen.getByText(TEST_TEXT_PORTAL.CANCEL));

    expect(props.onDeleteTodo).not.toHaveBeenCalled();
  });

  test('shows empty state', () => {
    setupPortal();

    expect(screen.getByText(TEST_TEXT_PORTAL.EMPTY)).toBeInTheDocument();
  });

  test('handles missing anchorEl (position fallback)', () => {
    setupPortal({ overrides: { anchorEl: null } });

    expect(screen.getByText(TEST_TEXT_PORTAL.TITLE)).toBeInTheDocument();
  });
});
