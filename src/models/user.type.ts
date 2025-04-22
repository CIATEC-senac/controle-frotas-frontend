import { format } from '@react-input/mask';

import { leftPad } from '@/lib/left-pad';

import { Enterprise } from './enterprise.type';

export enum UserRole {
  ADMIN = 0,
  MANAGER = 1,
  DRIVER = 2,
}

export enum UserSource {
  INSOURCED = 0,
  OUTSOURCED = 1,
}

export type User = {
  id: number;
  registration: string;
  name: string;
  cpf: string;
  email: string;
  role: UserRole;
  cnh?: string;
  status: boolean;
  source?: UserSource;
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

export const getRole = (type?: UserRole) => {
  switch (type) {
    case UserRole.ADMIN:
      return 'Administrador';
    case UserRole.MANAGER:
      return 'Gerente';
    case UserRole.DRIVER:
      return 'Motorista';
    default:
      return 'N/A';
  }
};

export const roleOptions = [
  {
    label: getRole(UserRole.ADMIN),
    value: UserRole.ADMIN.toString(),
  },
  {
    label: getRole(UserRole.MANAGER),
    value: UserRole.MANAGER.toString(),
  },
  {
    label: getRole(UserRole.DRIVER),
    value: UserRole.DRIVER.toString(),
  },
];

export const getSource = (source?: UserSource) => {
  switch (source) {
    case UserSource.INSOURCED:
      return 'Efetivado';
    case UserSource.OUTSOURCED:
      return 'Terceirizado';
    default:
      return 'N/A';
  }
};

export const sourceOptions = [
  {
    label: getSource(UserSource.INSOURCED),
    value: UserSource.INSOURCED.toString(),
  },
  {
    label: getSource(UserSource.OUTSOURCED),
    value: UserSource.OUTSOURCED.toString(),
  },
];
