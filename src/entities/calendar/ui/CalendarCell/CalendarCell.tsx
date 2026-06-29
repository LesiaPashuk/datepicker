import type { CSSProperties, MouseEvent } from 'react';

import { CalendarCellProps } from '@entities/calendar/model/types';

import styles from './CalendarCell.module.scss';

export const CalendarCell = (props: CalendarCellProps) => {
  const {
    date,
    dayNumber,
    isCurrentMonth,
    onClick,
    isHoliday,
    isSelected,
    isInRange,
    textColor,
    backgroundColor,
    isWeekend,
    id,
    isDisabled,
    haveToDo,
    onDayClickDouble,
  } = props;

  const cellClasses = [
    styles.cell,
    !isCurrentMonth && styles['cell--other-month'],
    isHoliday && isCurrentMonth && styles['cell--holiday'],
    isSelected && styles['cell--selected'],
    isInRange && styles['cell--in-range'],
    isWeekend && isCurrentMonth && styles['cell--weekend'],
  ]
    .filter(Boolean)
    .join(' ');

  const extrasStyles: CSSProperties = {};

  if (isHoliday || isWeekend) {
    if (textColor) extrasStyles.color = textColor;
    if (backgroundColor) extrasStyles.backgroundColor = backgroundColor;
  }

  const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDisabled) onClick?.(date, event);
  };

  const handleOnClickDoble = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDisabled) onDayClickDouble?.(date, event);
  };

  return (
    <div
      key={id}
      className={cellClasses}
      style={extrasStyles}
      onClick={handleOnClick}
      onDoubleClick={handleOnClickDoble}
      aria-label={`Day ${dayNumber}`}
      role="cell"
    >
      <span className={styles['cell__day-number']}>{dayNumber}</span>
      {haveToDo && <span className={styles['cell__todo-indicator']}>˙</span>}
    </div>
  );
};
