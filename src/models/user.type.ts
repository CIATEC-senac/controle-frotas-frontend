import { Enterprise } from './enterprise';

export type User = {
  id: number;
  registry: string;
  name: string;
  cpf: string;
  email: string;
  role: string;
  cnh?: string;
  status: boolean;
  admittedAt: string;
  enterprise?: Enterprise;
};
