import { useState } from 'react';

import { InputProps } from '../model/types';

import { Input } from './Input';

export const InputWithState = (args: InputProps) => {
  const [value, setValue] = useState<string>('');

  return <Input {...args} value={value} onChange={setValue} />;
};
