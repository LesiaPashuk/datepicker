import { ComponentProps } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { CalendarWithTodo } from './CalenderWithTodo';

const meta = {
  title: 'Features/CalendarWithTodo',
  component: CalendarWithTodo,
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
} satisfies Meta<typeof CalendarWithTodo>;

export default meta;
type Story = StoryObj<ComponentProps<typeof CalendarWithTodo>>;

export const Default: Story = {
  args: {
    withTodo: true,
  },
};

export const DarkVersion: Story = {
  args: {
    withTodo: true,
    darkThemed: true,
  },
};
