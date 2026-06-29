import { WEEKDAY } from '@entities/calendar/model/constants';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';
import { render, screen } from '@testing-library/react';

import { CalendarHeader } from '../CalendarHeader/CalendarHeader';

const getExpectedDays = (fromMonday: boolean) => {
  const ordered = fromMonday
    ? [...WEEKDAY.slice(FIRST_INDEX), WEEKDAY[START_DATE_INDEX_]]
    : WEEKDAY;

  return ordered.map((day) => day.weekday);
};

const getRenderedDays = () => screen.getAllByText(/^[A-Za-z]{2}$/).map((el) => el.textContent);

const renderHeader = (fromMonday: boolean) => {
  render(<CalendarHeader fromMonday={fromMonday} />);
};

describe('CalendarHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders weekdays starting from Sunday by default', () => {
    renderHeader(false);

    expect(getRenderedDays()).toEqual(getExpectedDays(false));
  });

  test('renders weekdays starting from Monday when enabled', () => {
    renderHeader(true);

    expect(getRenderedDays()).toEqual(getExpectedDays(true));
  });
});
