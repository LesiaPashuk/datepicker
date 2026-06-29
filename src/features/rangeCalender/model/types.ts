export const INPUT_TYPE = {
  START: 'START',
  END: 'END',
} as const;

export type ActiveInputType = keyof typeof INPUT_TYPE;
