import { normalizeString } from '@/lib/normalize';
import { Route } from '@/models/route.type';

export const filter =
  (search: string) =>
  (route: Route): boolean =>
    normalizeString(route.path.origin).includes(search) ||
    normalizeString(route.path.destination).includes(search) ||
    route.path.stops.some((stop) => normalizeString(stop).includes(search));
