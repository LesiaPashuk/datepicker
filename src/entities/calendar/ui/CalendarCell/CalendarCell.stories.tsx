import type { Meta, StoryObj } from '@storybook/react-vite';

import { CalendarCell } from './CalendarCell';

const meta = {
  title: 'Entities/Calendar/CalendarCell',
  component: CalendarCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    date: new Date(),
    dayNumber: 15,
    isCurrentMonth: true,
  },
} satisfies Meta<typeof CalendarCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'Default',
  },
};

export const Holiday: Story = {
  args: {
    isHoliday: true,
    backgroundColor: 'red',
    textColor: 'white',
    id: 'Holiday',
  },
};

export const Weekend: Story = {
  args: {
    isWeekend: true,
    backgroundColor: 'red',
    textColor: 'white',
    id: 'Weekend',
  },
};

export const IsInRange: Story = {
  args: {
    isHoliday: false,
    isInRange: true,
    id: 'InRange',
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
    id: 'Selected',
  },
};
