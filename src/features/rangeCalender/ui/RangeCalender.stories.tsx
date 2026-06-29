import { ComponentProps } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { RangeCalender } from './RangeCalender';

const meta = {
  title: 'Decorators/RangeCalendar',
  component: RangeCalender,
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
} satisfies Meta<typeof RangeCalender>;

export default meta;
type Story = StoryObj<ComponentProps<typeof RangeCalender>>;

export const Default: Story = {
  args: {
    withRange: true,
  },
};

export const DarkVersion: Story = {
  args: {
    withRange: true,
    darkThemed: true,
  },
};
