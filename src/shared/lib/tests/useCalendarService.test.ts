import { setupService, VIEW_MODEL_SERVICE } from '@shared/model/helperTest';

jest.mock('@entities/calendar/model/service');

describe('useCalendarService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('subscribes, updates viewModel and unsubscribes on unmount', () => {
    const { result, triggerUpdate, unmount, unsubscribe } = setupService();

    expect(result.current.viewModel).toEqual(VIEW_MODEL_SERVICE.INITIAL);

    triggerUpdate();

    expect(result.current.viewModel).toEqual(VIEW_MODEL_SERVICE.UPDATED);

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
