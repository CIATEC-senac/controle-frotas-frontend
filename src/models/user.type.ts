import { format } from '@react-input/mask';
import dayjs from 'dayjs';

import { Enterprise } from './enterprise';

export type User = {
  id: number;
  registration: string;
  name: string;
  cpf: string;
  email: string;
  role: string;
  cnh?: string;
  status: boolean;
  admittedAt: string;
  enterprise?: Enterprise;
};

export const maskedCPF = (cpf: string | undefined) =>
  format(cpf ?? '', {
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

export const maskedAdmittedAt = (admittedAt: string | undefined) =>
  format(admittedAt ? dayjs(admittedAt).format('DDMMYYYY') : '', {
    mask: '__/__/____',
    replacement: { _: /\d/ },
  });
