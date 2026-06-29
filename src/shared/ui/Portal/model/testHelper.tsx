import { THEMED } from '@features/calendar/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Portal } from '../ui/Portal';

import { PortalProps } from './types';

export const TEST_TEXT_PORTAL = {
  TITLE: 'TO DO',
  ADD: 'Add',
  DELETE_LABEL: 'Delete task',
  CONFIRM: 'Yes',
  CANCEL: 'No',
  EMPTY: 'No tasks yet. Add one!',
};

export const TODO_FIXTURES = {
  ONE: 'Task 1',
  TWO: 'Task 2',
  NEW: 'Test task',
};

export const TEST_DATE = new Date('2025-02-01');

export const TODO_SCENARIOS = {
  EMPTY: () => [],
  ONE: () => [TODO_FIXTURES.ONE],
  MULTIPLE: () => [TODO_FIXTURES.ONE, TODO_FIXTURES.TWO],
};

export const createAnchorEl = (): HTMLElement => {
  const el = document.createElement('div');

  Object.defineProperty(el, 'getBoundingClientRect', {
    value: () => ({
      bottom: START_DATE_INDEX_,
      left: START_DATE_INDEX_,
    }),
  });

  Object.defineProperty(el, 'offsetWidth', {
    value: START_DATE_INDEX_,
  });

  return el;
};

export const createProps = (overrides: Partial<PortalProps> = {}): PortalProps => ({
  id: 'test-id',
  isOpenPortal: true,
  selectedDate: TEST_DATE,
  anchorEl: createAnchorEl(),
  portalRef: { current: null },
  getTodos: jest.fn(TODO_SCENARIOS.EMPTY),
  onAddTodo: jest.fn(),
  onDeleteTodo: jest.fn(),
  onClose: jest.fn(),
  themed: THEMED.LIGHT,
  ...overrides,
});

export const setupPortal = ({
  todos = TODO_SCENARIOS.EMPTY,
  overrides = {},
}: {
  todos?: () => string[];
  overrides?: Partial<PortalProps>;
} = {}) => {
  const props = createProps({
    getTodos: jest.fn(todos),
    ...overrides,
  });

  const utils = render(<Portal {...props} />);

  return {
    ...utils,
    props,
    user: userEvent.setup(),
  };
};
