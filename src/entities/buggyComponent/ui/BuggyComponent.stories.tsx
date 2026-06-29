import { ErrorBoundary } from '@shared/ui/ErrorBoundary/ui/ErrorBoundary';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { BuggyComponent } from './BuggyComponent';

const meta = {
  title: 'Entities/BugguComponent',
  component: BuggyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <ErrorBoundary>
        <Story />
      </ErrorBoundary>
    ),
  ],
} satisfies Meta<typeof BuggyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
