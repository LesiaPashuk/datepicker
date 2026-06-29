import { CalendarCellProps, Weekday } from './types';

export const FAKE_DATE: CalendarCellProps[] = [
  { id: 'prev-31', date: new Date(2022, 0, 31), dayNumber: 31, isCurrentMonth: false },
  { id: '1', date: new Date(2022, 1, 1), dayNumber: 1, isCurrentMonth: true },
  { id: '2', date: new Date(2022, 1, 2), dayNumber: 2, isCurrentMonth: true },
  { id: '3', date: new Date(2022, 1, 3), dayNumber: 3, isCurrentMonth: true },
  { id: '4', date: new Date(2022, 1, 4), dayNumber: 4, isCurrentMonth: true },
  { id: '5', date: new Date(2022, 1, 5), dayNumber: 5, isCurrentMonth: true },
  { id: '6', date: new Date(2022, 1, 6), dayNumber: 6, isCurrentMonth: true },
  { id: '7', date: new Date(2022, 1, 7), dayNumber: 7, isCurrentMonth: true },
  { id: '8', date: new Date(2022, 1, 8), dayNumber: 8, isCurrentMonth: true },
  { id: '9', date: new Date(2022, 1, 9), dayNumber: 9, isCurrentMonth: true },
  { id: '10', date: new Date(2022, 1, 10), dayNumber: 10, isCurrentMonth: true },
  { id: '11', date: new Date(2022, 1, 11), dayNumber: 11, isCurrentMonth: true },
  { id: '12', date: new Date(2022, 1, 12), dayNumber: 12, isCurrentMonth: true },
  { id: '13', date: new Date(2022, 1, 13), dayNumber: 13, isCurrentMonth: true },
  { id: '14', date: new Date(2022, 1, 14), dayNumber: 14, isCurrentMonth: true },
  { id: '15', date: new Date(2022, 1, 15), dayNumber: 15, isCurrentMonth: true },
  { id: '16', date: new Date(2022, 1, 16), dayNumber: 16, isCurrentMonth: true },
  { id: '17', date: new Date(2022, 1, 17), dayNumber: 17, isCurrentMonth: true },
  { id: '18', date: new Date(2022, 1, 18), dayNumber: 18, isCurrentMonth: true },
  { id: '19', date: new Date(2022, 1, 19), dayNumber: 19, isCurrentMonth: true },
  { id: '20', date: new Date(2022, 1, 20), dayNumber: 20, isCurrentMonth: true },
  { id: '21', date: new Date(2022, 1, 21), dayNumber: 21, isCurrentMonth: true },
  { id: '22', date: new Date(2022, 1, 22), dayNumber: 22, isCurrentMonth: true },
  { id: '23', date: new Date(2022, 1, 23), dayNumber: 23, isCurrentMonth: true },
  { id: '24', date: new Date(2022, 1, 24), dayNumber: 24, isCurrentMonth: true },
  { id: '25', date: new Date(2022, 1, 25), dayNumber: 25, isCurrentMonth: true },
  { id: '26', date: new Date(2022, 1, 26), dayNumber: 26, isCurrentMonth: true },
  { id: '27', date: new Date(2022, 1, 27), dayNumber: 27, isCurrentMonth: true },
  { id: '28', date: new Date(2022, 1, 28), dayNumber: 28, isCurrentMonth: true },
  { id: 'next-1', date: new Date(2022, 2, 1), dayNumber: 1, isCurrentMonth: false },
  { id: 'next-2', date: new Date(2022, 2, 2), dayNumber: 2, isCurrentMonth: false },
  { id: 'next-3', date: new Date(2022, 2, 3), dayNumber: 3, isCurrentMonth: false },
  { id: 'next-4', date: new Date(2022, 2, 4), dayNumber: 4, isCurrentMonth: false },
  { id: 'next-5', date: new Date(2022, 2, 5), dayNumber: 5, isCurrentMonth: false },
  { id: 'next-6', date: new Date(2022, 2, 6), dayNumber: 6, isCurrentMonth: false },
];

export const WEEKDAY: Weekday[] = [
  {
    id: '1',
    weekday: 'Su',
  },
  {
    id: '2',
    weekday: 'Mo',
  },
  {
    id: '3',
    weekday: 'Tu',
  },
  {
    id: '4',
    weekday: 'We',
  },
  {
    id: '5',
    weekday: 'Th',
  },
  {
    id: '6',
    weekday: 'Fr',
  },
  {
    id: '7',
    weekday: 'Sa',
  },
];

export const MONDAY_INDEX = 1;
export const SUNDAY_INDEX = 0;
export const SATURDAY_INDEX = 6;
export const WEEK_LENGHT = 7;
