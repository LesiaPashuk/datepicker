import { MouseEvent } from 'react';

import { EngineConfig } from '@entities/calendar/model/types';
import { BaseCalendar } from '@entities/calendar/ui/BaseCalendar/BaseCalendar';
import { getTheme } from '@shared/lib/getThemed';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary/ui/ErrorBoundary';
import { Input } from '@shared/ui/Input/ui/Input';

import { useDateRangePicker } from '../lib/useDateRangePicker';

import styles from './RangeCalender.module.scss';

export const RangeCalender = (_config?: EngineConfig) => {
  const { start, end, viewModel, error, onClear, isOpenCalendar, toggleCalendar } =
    useDateRangePicker(_config);

  const handleClearAll = () => {
    onClear();
  };

  const handleDayClick = (date: Date, _event?: MouseEvent<HTMLDivElement>) => {
    viewModel.onDayRangeClick(date);
  };
  const themed = getTheme(_config?.darkThemed);

  return (
    <ErrorBoundary>
      <article data-theme={themed}>
        <div className={styles.container}>
          <div className={styles['container__inputs']}>
            <Input handleIsOpen={toggleCalendar} {...start} error={error} />
            <Input handleIsOpen={toggleCalendar} {...end} error={error} />
          </div>
          {isOpenCalendar && (
            <>
              <BaseCalendar {...viewModel} onDayClick={handleDayClick} />
              <button className={styles['container__clear']} type="button" onClick={handleClearAll}>
                Clear All
              </button>
            </>
          )}
        </div>
      </article>
    </ErrorBoundary>
  );
};
