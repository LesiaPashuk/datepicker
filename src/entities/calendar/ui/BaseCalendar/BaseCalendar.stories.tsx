import { Calendar } from '@features/calendar/Calendar';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Entities/Calendar/BaseCalendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
