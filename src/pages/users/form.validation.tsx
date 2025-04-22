import { z } from 'zod';

import { fromISO } from '@/lib/date-parser';
import { maskedCPF, User } from '@/models/user.type';

export const userSchema = z.object({
  // ID
  id: z.string().optional(),
  // Matrícula
  registration: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Matrícula deve conter ao menos 1 caractere' })
    .max(4, { message: 'Matrícula deve conter no máximo 4 caracteres' }),
  // Nome
  name: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Nome deve conter ao menos 1 caractere' })
    .max(50, { message: 'Nome deve conter no máximo 50 caracteres' }),
  // Email
  email: z
    .string({ message: 'Campo obrigatório' })
    .email({ message: 'Email inválido' }),
  // CPF
  cpf: z.string({ message: 'Campo obrigatório' }).length(14, {
    message: 'CPF deve estar no seguinte padrão XXX.XXX.XXX-XX',
  }),
  // CNH
  cnh: z
    .string({ message: 'Campo obrigatório' })
    .length(11, { message: 'CNH deve estar no seguinte padrão XXXXXXXXXXX' }),
  // Data Admissão
  admittedAt: z
    .string({ message: 'Campo obrigatório' })
    .length(10, { message: 'CNH deve estar no seguinte padrão XX/XX/XXXX' }),
  // Status
  status: z.boolean().optional(),
  // Cargo
  role: z.string({ message: 'Um cargo deve ser selecionado' }),
  // Tipo
  source: z.string({ message: 'Um tipo deve ser selecionado' }),
});

export const toZod = (user?: User) => {
  return {
    id: user?.id.toString() ?? '',
    registration: user?.registration.toString() ?? '0',
    name: user?.name ?? '',
    email: user?.email ?? '',
    cpf: maskedCPF(user?.cpf) ?? '',
    cnh: user?.cnh?.toString() ?? '',
    admittedAt: user?.admittedAt ? fromISO(user?.admittedAt, 'DD/MM/YYYY') : '',
    status: user?.status ?? true,
    role: user?.role.toString() ?? '2',
  };
};
