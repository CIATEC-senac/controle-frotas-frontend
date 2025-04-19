import { normalizeString } from '@/lib/normalize';
import { Route } from '@/models/route.type';

export const filter =
  (search: string) =>
  (user: Route): boolean =>
    normalizeString(user.path.origin).includes(search) ||
    normalizeString(user.path.destination).includes(search) ||
    user.path.stops.some((stop) => normalizeString(stop).includes(search));
