import { useCallback, useEffect, useRef, useState } from 'react';

export const useCalendarPortal = () => {
  const [isOpenPortal, setIsOpenPortal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const portalRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openPortal = useCallback((date: Date, element: HTMLElement) => {
    setSelectedDate(date);
    setAnchorEl(element);
    setIsOpenPortal(true);
  }, []);

  const closePortal = useCallback(() => {
    setIsOpenPortal(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpenPortal) return;

      const target = event.target as Node;

      if (!portalRef.current?.contains(target) && !anchorEl?.contains(target)) {
        closePortal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenPortal, anchorEl, closePortal]);

  return { isOpenPortal, selectedDate, anchorEl, portalRef, openPortal, closePortal };
};
