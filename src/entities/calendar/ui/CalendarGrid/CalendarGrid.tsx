import { CalendarGridProps } from '@entities/calendar/model/types';

import { CalendarCell } from '../CalendarCell/CalendarCell';

import styles from './CalendarGrid.module.scss';

export const CalendarGrid = (props: CalendarGridProps) => {
  const { dateArray, onDayClick, onDayClickDouble } = props;

  return (
    <div className={styles.grid} role="grid">
      {dateArray.map((el) => (
        <CalendarCell
          onClick={onDayClick}
          onDayClickDouble={onDayClickDouble}
          key={el.id}
          {...el}
        />
      ))}
    </div>
  );
};
