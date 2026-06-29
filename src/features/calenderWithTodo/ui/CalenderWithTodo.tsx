import { MouseEvent } from 'react';

import { EngineConfig } from '@entities/calendar/model/types';
import { BaseCalendar } from '@entities/calendar/ui/BaseCalendar/BaseCalendar';
import { getTheme } from '@shared/lib/getThemed';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary/ui/ErrorBoundary';
import { Portal } from '@shared/ui/Portal/ui/Portal';

import { useCalendarService } from '../../../shared/lib/useCalendarService';
import { useCalendarPortal } from '../lib/useCalendarPortal';

export const CalendarWithTodo = (config?: EngineConfig) => {
  const { service, viewModel } = useCalendarService(config, true);
  const portal = useCalendarPortal();

  const onDayClickDouble = (date: Date, event?: MouseEvent<HTMLDivElement>) => {
    if (!event) return;
    service.setSelectedDate(date);
    portal.openPortal(date, event.currentTarget);
  };

  const onDayClick = (date: Date, event?: MouseEvent<HTMLDivElement>) => {
    if (!event) return;
    service.setSelectedDate(date);
  };

  const handleAddTodo = (date: Date, text: string) => service.addTodo(date, text);

  const handleDeleteTodo = (date: Date, todo: string) => service.deleteTodo(date, todo);

  const handleGetTodo = (date: Date) => service.getTodosByDate(date);

  const themed = getTheme(config?.darkThemed);

  return (
    <ErrorBoundary>
      <article data-theme={themed}>
        <BaseCalendar {...viewModel} onDayClick={onDayClick} onDayClickDouble={onDayClickDouble} />

        <Portal
          id={`portal-${portal.selectedDate?.getTime()}`}
          isOpenPortal={portal.isOpenPortal}
          selectedDate={portal.selectedDate}
          anchorEl={portal.anchorEl}
          portalRef={portal.portalRef}
          onClose={portal.closePortal}
          onAddTodo={handleAddTodo}
          onDeleteTodo={handleDeleteTodo}
          getTodos={handleGetTodo}
          themed={themed}
        />
      </article>
    </ErrorBoundary>
  );
};
