import { act } from '@testing-library/react';

import { createElement, DEFAULT_DATE, setupPortal } from '../lib/helperTests';

describe('useCalendarPortal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('initial state is closed', () => {
    const { result } = setupPortal();

    expect(result.current.isOpenPortal).toBe(false);
    expect(result.current.selectedDate).toBeNull();
    expect(result.current.anchorEl).toBeNull();
  });

  test('openPortal sets state correctly', () => {
    const { result, open } = setupPortal();

    const anchor = createElement();

    open(DEFAULT_DATE, anchor);

    expect(result.current.isOpenPortal).toBe(true);
    expect(result.current.selectedDate).toEqual(DEFAULT_DATE);
    expect(result.current.anchorEl).toBe(anchor);
  });

  test('closePortal closes portal', () => {
    const { result, open, close } = setupPortal();

    open();
    close();

    expect(result.current.isOpenPortal).toBe(false);
  });

  test('closes on outside click (real handler)', () => {
    const { result, open } = setupPortal();

    const portalEl = createElement();
    const anchorEl = createElement();
    const outside = createElement();

    document.body.append(portalEl, anchorEl, outside);

    open(DEFAULT_DATE, anchorEl);

    result.current.portalRef.current = portalEl;

    act(() => {
      outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(result.current.isOpenPortal).toBe(false);
  });
});
