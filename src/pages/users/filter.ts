import { normalizeString } from '@/lib/normalize';
import { User } from '@/models/user.type';

export const filter =
  (search: string) =>
  (user: User): boolean =>
    normalizeString(user.name).includes(search) ||
    normalizeString(user.cpf).includes(search) ||
    normalizeString(user.email).includes(search);
