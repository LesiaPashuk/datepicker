import { RefObject } from 'react';

import { THEMED } from '@features/calendar/model/constants';

export interface PortalProps {
  anchorEl: HTMLElement | null;
  portalRef: RefObject<HTMLDivElement | null>;
  onAddTodo: (date: Date, text: string) => void;
  getTodos: (date: Date) => string[];
  onClose: () => void;
  selectedDate: Date | null;
  isOpenPortal: boolean;
  id: string;
  onDeleteTodo: (date: Date, todo: string) => void;
  themed: THEMED;
}

export interface PortalPosition {
  top: string;
  left: string;
}
