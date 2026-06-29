import { ComponentProps } from 'react';

import { Calendar } from '@features/calendar/Calendar';
import { Meta, StoryObj } from '@storybook/react-vite';

import { MOCK_DATES } from './model/constants';

const meta = {
  title: 'Decorators/Calendar',
  component: Calendar,
  decorators: [
    (Story, context) => (
      <div key={JSON.stringify(context.args)}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<ComponentProps<typeof Calendar>>;

export const Holiday: Story = {
  args: {
    holidays: MOCK_DATES,
    withHoliday: true,
  },
};

export const Weekday: Story = {
  args: {
    withWeekend: true,
  },
};

export const FromMonday: Story = {
  args: {
    fromMonday: true,
  },
};

export const WeekendFromMondat: Story = {
  args: {
    fromMonday: true,
    withWeekend: true,
  },
};

export const FullOptions: Story = {
  args: {
    fromMonday: true,
    withWeekend: true,
    holidays: MOCK_DATES,
    withHoliday: true,
  },
};

export const MinMaxDate: Story = {
  args: {
    minDate: new Date(2026, 0, 20),
    maxDate: new Date(2027, 2, 1),
    defaultDate: new Date(2026, 1, 1),
  },
};

export const VeiwByWeek: Story = {
  args: {
    viewByWeek: true,
  },
};

export const DarkVersion: Story = {
  args: { darkThemed: true },
};
