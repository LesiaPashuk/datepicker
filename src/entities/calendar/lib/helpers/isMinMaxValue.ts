import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

export const isMinMaxValue = (date: Date, minDate: Date | null, maxDate: Date | null) => {
  if (minDate) {
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth() + FIRST_INDEX,
      START_DATE_INDEX_
    );

    if (currentDate <= minDate) return false;
  }

  if (maxDate) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), START_DATE_INDEX_);

    if (currentDate >= maxDate) return false;
  }

  return true;
};
