import { useEffect, useMemo, useState } from 'react';

import { validateDateInput } from '@entities/calendar/lib/helpers/validationInput';
import { DatepickerService } from '@entities/calendar/model/service';
import { BaseCalendarProps, EngineConfig } from '@entities/calendar/model/types';
import { MAX_INPUT_LENGTH } from '@shared/model/constants';
import { maskDate } from '@shared/ui/Input/lib/maskDate';
import { START_DATE_INDEX_ } from '@shared/ui/Input/model/constants';

import { ActiveInputType, INPUT_TYPE } from '../model/types';

export const useDateRangePicker = (config?: EngineConfig) => {
  const [_activeInput, setActiveInput] = useState<ActiveInputType>(INPUT_TYPE.START);
  const [localStartDate, setLocalStartDate] = useState<string>('');
  const [localEndDate, setLocalEndDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const service = useMemo(() => new DatepickerService(config), [config]);
  const [viewModel, setViewModel] = useState<BaseCalendarProps>(service.getViewModel());

  useEffect(() => {
    const unsubscribe = service.subscribe(() => {
      setViewModel(service.getViewModel());
      const range = service.getRange();

      if (range.start) {
        setLocalStartDate(maskDate(range.start.toLocaleDateString()));
      } else {
        setLocalStartDate('');
      }
      if (range.end) {
        setLocalEndDate(maskDate(range.end.toLocaleDateString()));
      } else {
        setLocalEndDate('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [service]);

  const range = service.getRange();

  const setStartDateDirect = (date: Date) => {
    service.setRangeStart?.(date);
    const currentEnd = service.getRangeEnd?.();

    if (currentEnd && date > currentEnd) {
      service.setRangeEnd?.(null);
      setLocalEndDate('');
    }
    service.notify?.();
  };

  const setEndDateDirect = (date: Date) => {
    const currentStart = service.getRangeStart?.();

    if (currentStart && date < currentStart) {
      setError('End date cannot be earlier than start date');

      return false;
    }
    service.setRangeEnd?.(date);
    service.notify?.();

    return true;
  };

  const handleManualInput = (value: string, inputType: ActiveInputType) => {
    const maskedValue = maskDate(value);

    if (inputType === INPUT_TYPE.START) {
      setLocalStartDate(maskedValue);
    } else {
      setLocalEndDate(maskedValue);
    }

    if (maskedValue.length === START_DATE_INDEX_) {
      setError('');
      if (inputType === INPUT_TYPE.START) {
        service.setRangeStart?.(null);
      } else {
        service.setRangeEnd?.(null);
      }
      service.notify?.();

      return;
    }

    const validationResult = validateDateInput(maskedValue);

    if (maskedValue.length < MAX_INPUT_LENGTH) {
      setError(validationResult.error);
    } else {
      if (validationResult.isValid && validationResult.date) {
        if (inputType === INPUT_TYPE.START) {
          setStartDateDirect(validationResult.date);
          setError('');
          if (!range.end) {
            setActiveInput(INPUT_TYPE.END);
          }
        } else {
          const success = setEndDateDirect(validationResult.date);

          if (success) {
            setError('');
          }
        }
      } else {
        setError(validationResult.error || 'Invalid date');
      }
    }
  };

  const handleInputFocus = (input: ActiveInputType) => {
    setActiveInput(input);
    setIsOpenCalendar(true);
  };

  const handleClear = (inputType?: ActiveInputType) => {
    if (inputType === INPUT_TYPE.START) {
      service.setRangeStart?.(null);
      setLocalStartDate('');
    } else if (inputType === INPUT_TYPE.END) {
      service.setRangeEnd?.(null);
      setLocalEndDate('');
    } else if (!inputType) {
      service.clearRange?.();
      setLocalStartDate('');
      setLocalEndDate('');
      setIsOpenCalendar(false);
    }
    setError('');
    service.notify?.();
  };

  const toggleCalendar = () => {
    setIsOpenCalendar((prev) => !prev);
  };

  const createInputConfig = (type: ActiveInputType, localValue: string, placeholder: string) => ({
    value: localValue,
    onChange: (val: string) => handleManualInput(val, type),
    onFocus: () => handleInputFocus(type),
    placeholder,
    onClear: () => handleClear(type),
  });

  return {
    viewModel,
    isOpenCalendar,
    start: createInputConfig(INPUT_TYPE.START, localStartDate, 'Start Date'),
    end: createInputConfig(INPUT_TYPE.END, localEndDate, 'End Date'),
    error,
    onClear: handleClear,
    toggleCalendar,
  };
};
