import { Meta, StoryObj } from '@storybook/react-vite';

import { CalendarWithInput } from './CalendarWithInput';

const meta = {
  title: 'Featire/Calendar/CalendarWithInput',
  component: CalendarWithInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarWithInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkVersion: Story = {
  args: { darkThemed: true },
};
