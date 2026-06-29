import { THEMED } from '@features/calendar/model/constants';

export const getTheme = (darkThemed?: boolean) => {
  return darkThemed ? THEMED.DARK : THEMED.LIGHT;
};
