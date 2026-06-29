import { EngineConfig } from '@entities/calendar/model/types';
import { BaseCalendar } from '@entities/calendar/ui/BaseCalendar/BaseCalendar';
import { getTheme } from '@shared/lib/getThemed';
import { useCalendarService } from '@shared/lib/useCalendarService';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary/ui/ErrorBoundary';

export const Calendar = (config?: EngineConfig) => {
  const { viewModel } = useCalendarService(config);

  const fromMonday = config?.fromMonday || false;
  const themed = getTheme(config?.darkThemed);

  return (
    <ErrorBoundary>
      <div data-theme={themed}>
        <BaseCalendar {...viewModel} fromMonday={fromMonday} />
      </div>
    </ErrorBoundary>
  );
};
