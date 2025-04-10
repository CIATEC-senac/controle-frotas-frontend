import { User } from '@/models/user.type';

export const filter =
  (search: string) =>
  (user: User): boolean =>
    user.name.includes(search) ||
    user.cpf.includes(search) ||
    user.email.includes(search);
