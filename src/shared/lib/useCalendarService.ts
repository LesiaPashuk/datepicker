import { useEffect, useMemo, useState } from 'react';

import { DatepickerService } from '@entities/calendar/model/service';
import { BaseCalendarProps, EngineConfig } from '@entities/calendar/model/types';

export const useCalendarService = (config?: EngineConfig, withTodo?: boolean) => {
  const service = useMemo(
    () => new DatepickerService({ ...config, withTodo: withTodo }),
    [config, withTodo]
  );

  const [viewModel, setViewModel] = useState<BaseCalendarProps>(service.getViewModel());

  useEffect(() => {
    const unsubscribe = service.subscribe(() => {
      setViewModel(service.getViewModel());
    });

    return () => {
      unsubscribe();
    };
  }, [service]);

  return {
    service,
    viewModel,
  };
};
