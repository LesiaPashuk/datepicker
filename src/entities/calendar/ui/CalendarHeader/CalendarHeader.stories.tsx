import type { Meta, StoryObj } from '@storybook/react-vite';

import { CalendarHeader } from './CalendarHeader';

const meta = {
  title: 'Entities/Calendar/CalendarHeader',
  component: CalendarHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof CalendarHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fromMonday: false,
  },
};
