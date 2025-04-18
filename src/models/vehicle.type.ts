import { format } from '@react-input/mask';

export type Vehicle = {
  id: number;
  model: string;
  capacity: number;
  plate: string;
  year: number;
  type: string;
  status: boolean;
};

export const maskedNumber = (number: number | undefined, length: number) =>
  format(number?.toString() || '', {
    mask: Array(length).fill('_').join(''),
    replacement: { _: /\d/ },
  });
