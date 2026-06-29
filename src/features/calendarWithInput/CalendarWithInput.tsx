import { useEffect, useState } from 'react';

import { DatepickerService } from '@entities/calendar/model/service';
import { BaseCalendarProps } from '@entities/calendar/model/types';
import { BaseCalendar } from '@entities/calendar/ui/BaseCalendar/BaseCalendar';
import { getTheme } from '@shared/lib/getThemed';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary/ui/ErrorBoundary';
import { Input } from '@shared/ui/Input/ui/Input';

import styles from './CalendarWithInput.module.scss';
import { CalanderWithInputprops } from './model/types';

const service = new DatepickerService();

export const CalendarWithInput = (props: CalanderWithInputprops) => {
  const [error, setError] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>(service.getInputValue());
  const [viewModel, setViewModel] = useState<BaseCalendarProps>(service.getViewModel());

  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    const { error } = service.handleInputChange(value);

    setError(error);
  };

  const handleClear = () => {
    service.setSelectedDate(null);
    setIsOpenCalendar(false);
  };

  const handleIsOpen = () => {
    setIsOpenCalendar((pr) => !pr);
  };

  useEffect(() => {
    const unsubscribe = service.subscribe(() => {
      setViewModel(service.getViewModel());
      setInputValue(service.getInputValue());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const themed = getTheme(props?.darkThemed);

  return (
    <ErrorBoundary>
      <div data-theme={themed} className={styles.wrapper}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onClear={handleClear}
          handleIsOpen={handleIsOpen}
          error={error}
          {...props}
        />
        {isOpenCalendar && (
          <div className={styles.wrapper__calendar}>
            <BaseCalendar {...viewModel} />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
