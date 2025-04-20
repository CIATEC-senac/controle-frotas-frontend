import { format } from '@react-input/mask';

import { leftPad } from '@/lib/left-pad';

import { Enterprise } from './enterprise.type';

export type User = {
  id: number;
  registration: string;
  name: string;
  cpf: string;
  email: string;
  role: number;
  cnh?: string;
  status: boolean;
  admittedAt: string;
  enterprise?: Enterprise;
};

export const getRegistration = (registration: string | undefined) => {
  return leftPad(registration ?? '', 4, '0');
};

export const maskedCPF = (cpf: string | undefined) =>
  format(cpf ?? '', {
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

export const maskedAdmittedAt = (admittedAt: string | undefined) =>
  format(admittedAt ? admittedAt.replace(/[\/\:]/g, '') : '', {
    mask: '__/__/____',
    replacement: { _: /\d/ },
  });

export const roleOptions = [
  {
    label: 'Admin',
    value: '0',
  },
  {
    label: 'Gerente',
    value: '1',
  },
  {
    label: 'Motorista',
    value: '2',
  },
];
