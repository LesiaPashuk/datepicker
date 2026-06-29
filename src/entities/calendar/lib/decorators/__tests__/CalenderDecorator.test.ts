import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { MIN_CELLS_LENGTH } from '../../helpers/generateMonthArray';
import { MOCK_DATES, MOCK_SECTION_PARAMS, YEAR_25, YEAR_26 } from '../../tests/constants';
import { CalenderDecorator } from '../CalenderDecorator';

describe('calender decorator', () => {
  let engine: CalenderDecorator;

  beforeEach(() => {
    engine = new CalenderDecorator();
  });
  test('getNextDate in calendar decorator', () => {
    const result = engine.getNextDate(MOCK_DATES.DEC_2025);

    expect(result.getFullYear()).toBe(YEAR_26);
    expect(result.getMonth()).toBe(START_DATE_INDEX_);
    expect(result.getDate()).toBe(FIRST_INDEX);
  });

  test('getNextDate in calendar decorator', () => {
    const result = engine.getPreviousDate(MOCK_DATES.DEC_2025);

    expect(result.getFullYear()).toBe(YEAR_25);
    expect(result.getMonth()).toBe(MOCK_DATES.DEC_2025.getMonth() - FIRST_INDEX);
    expect(result.getDate()).toBe(FIRST_INDEX);
  });

  test('getNextYear in calendar decorator', () => {
    const result = engine.getNextYear(MOCK_DATES.DEC_2025, YEAR_26);

    expect(result.getFullYear()).toBe(YEAR_26);
    expect(result.getMonth()).toBe(MOCK_DATES.DEC_2025.getMonth());
    expect(result.getDate()).toBe(FIRST_INDEX);
  });

  test('getDays in calendar decorator', () => {
    const result = engine.getDays(MOCK_DATES.FEB_2026, MOCK_SECTION_PARAMS);

    expect(result).toHaveLength(MIN_CELLS_LENGTH);
  });
});
