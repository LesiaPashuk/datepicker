import { FAKE_DATE } from '@entities/calendar/model/constants';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { CalendarGrid } from './CalendarGrid';

const meta = {
  title: 'Entities/Calendar/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateArray: FAKE_DATE,
    onDayClick: () => {},
  },
};
