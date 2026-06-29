import { MONDAY_INDEX, SUNDAY_INDEX, WEEKDAY } from '@entities/calendar/model/constants';
import { CalenderHeaderProps } from '@entities/calendar/model/types';

import styles from './CalendarHeader.module.scss';

export const CalendarHeader = (props: CalenderHeaderProps) => {
  const { fromMonday } = props;
  const WEEKDAY_SORT = fromMonday
    ? [...WEEKDAY.slice(MONDAY_INDEX), WEEKDAY[SUNDAY_INDEX]]
    : WEEKDAY;

  return (
    <>
      <div className={styles.week}>
        {WEEKDAY_SORT.map(({ weekday, id }) => (
          <div className={styles.week__cell} key={id}>
            <span className={styles.week__weekday}>{weekday}</span>
          </div>
        ))}
      </div>
    </>
  );
};
