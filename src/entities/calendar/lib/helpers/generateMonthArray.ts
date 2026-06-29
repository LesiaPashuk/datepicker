import { CalendarCellProps, SectionParams } from '@entities/calendar/model/types';
import { FIRST_INDEX } from '@shared/model/constants';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

export const CELLS_LENGTH = 42;
export const MIN_CELLS_LENGTH = 28;

export const generateMonthArray = (
  currentDate: Date,
  params: SectionParams
): CalendarCellProps[] => {
  const days: CalendarCellProps[] = [];
  const { selectedDate, rangeStart, rangeEnd, fromMonday } = params;

  const startWeekDay = fromMonday ? FIRST_INDEX : START_DATE_INDEX_;
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    FIRST_INDEX - startWeekDay
  );

  const startWeekday = firstDayOfMonth.getDay();
  const startDate = new Date(firstDayOfMonth);

  startDate.setDate(firstDayOfMonth.getDate() - startWeekday + startWeekDay);

  const selectedTime = selectedDate?.getTime();
  const startTime = rangeStart?.getTime();
  const endTime = rangeEnd?.getTime();

  for (let i = 0; i < CELLS_LENGTH; i++) {
    const date = new Date(startDate);

    date.setDate(startDate.getDate() + i);

    const isCurrentMonth = date.getMonth() === currentDate.getMonth();

    if (
      !isCurrentMonth &&
      date.getDay() == START_DATE_INDEX_ + startWeekDay &&
      i >= MIN_CELLS_LENGTH
    ) {
      return days;
    }
    const newId = date.toISOString();

    const isSelected = selectedTime === date.getTime() && isCurrentMonth;
    const isInRange = !!(
      startTime &&
      endTime &&
      date.getTime() >= startTime &&
      date.getTime() <= endTime
    );

    const resultDay = {
      id: newId,
      date,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isSelected,
      isInRange,
    };

    days.push(resultDay);
  }

  return days;
};
