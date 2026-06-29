import { DatepickerService } from '@entities/calendar/model/service';
import { useCalendarService } from '@shared/lib/useCalendarService';
import { act, renderHook } from '@testing-library/react';

export const VIEW_MODEL_SERVICE = {
  INITIAL: { value: 'initial' },
  UPDATED: { value: 'updated' },
};

export const createServiceMock = () => {
  let currentViewModel = VIEW_MODEL_SERVICE.INITIAL;
  let callback: () => void = () => {};

  const unsubscribe = jest.fn();

  const subscribe = jest.fn((cb: () => void) => {
    callback = cb;

    return unsubscribe;
  });

  const getViewModel = jest.fn(() => currentViewModel);

  const updateViewModel = (
    nextValue: (typeof VIEW_MODEL_SERVICE)[keyof typeof VIEW_MODEL_SERVICE]
  ) => {
    currentViewModel = nextValue;
    callback();
  };

  return {
    service: { subscribe, getViewModel },
    updateViewModel,
    unsubscribe,
  };
};

export const setupService = () => {
  const { service, updateViewModel, unsubscribe } = createServiceMock();

  (DatepickerService as jest.Mock).mockImplementation(() => service);

  const hook = renderHook(() => useCalendarService());

  return {
    ...hook,
    triggerUpdate: (nextState = VIEW_MODEL_SERVICE.UPDATED) =>
      act(() => {
        updateViewModel(nextState);
      }),
    unsubscribe,
  };
};
