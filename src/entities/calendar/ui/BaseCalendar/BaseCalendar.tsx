import { ChangeEvent } from 'react';

import { NextIcon, PreviousIcon } from '@entities/calendar/assets';
import { BaseCalendarProps } from '@entities/calendar/model/types';

import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';

import styles from './BaseCalendar.module.scss';

export const BaseCalendar = (props: BaseCalendarProps) => {
  const {
    fromMonday,
    dateArray,
    month,
    year,
    onClickNext,
    onClickPrevious,
    onDayClick,
    canNext,
    canPrev,
    onDayClickDouble,
    yearsArray,
    onClickNextYear,
  } = props;

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);

    onClickNextYear(newYear);
  };

  return (
    <article className={styles.calendar}>
      <header className={styles.calendar__header}>
        <button
          className={styles.calendar__button}
          type="button"
          onClick={onClickPrevious}
          disabled={!canPrev}
        >
          <PreviousIcon />
        </button>
        <div className={styles.calendar__month}>
          {month}{' '}
          <select className={styles.calendar__year} value={year} onChange={handleYearChange}>
            {yearsArray.map((el) => (
              <option key={`option-yaer-${el}`} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button
          className={styles.calendar__button}
          type="button"
          onClick={onClickNext}
          disabled={!canNext}
        >
          <NextIcon />
        </button>
      </header>

      <CalendarHeader fromMonday={fromMonday} />
      <CalendarGrid
        dateArray={dateArray}
        onDayClick={onDayClick}
        onDayClickDouble={onDayClickDouble}
      />
      {onDayClickDouble && (
        <span className={styles.calendar__notes}>Click twice on the day to add a task.</span>
      )}
    </article>
  );
};
