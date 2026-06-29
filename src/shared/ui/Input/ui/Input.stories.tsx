import { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';
import { InputWithState } from './InputWithState';

const meta = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: '',
    onChange: () => {},
    handleIsOpen: () => {},
    onClear: () => {},
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: InputWithState,
};

export const WithPlaceholder: Story = {
  render: InputWithState,
  args: { placeholder: 'Your birthday' },
};

export const WithError: Story = {
  render: InputWithState,
  args: { error: 'Invalid value' },
};

export const WithLabel: Story = {
  render: InputWithState,
  args: { label: 'Your birthday' },
};

export const FullOptions: Story = {
  render: InputWithState,
  args: { placeholder: 'Choose date', error: 'Invalid date', label: 'Your birthday' },
};
