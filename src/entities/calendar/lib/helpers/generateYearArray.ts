import { FIRST_INDEX } from '@shared/model/constants';

import { MAX_YEAR, MIN_YEAR } from './validationInput';

export const generateYearArray = (minYear?: number, maxYear?: number) => {
  minYear ??= MIN_YEAR;
  maxYear ??= MAX_YEAR;

  const yearArray = [];

  while (minYear <= maxYear) {
    yearArray.push(minYear);
    minYear += FIRST_INDEX;
  }

  return yearArray;
};
