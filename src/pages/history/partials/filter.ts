import { normalizeString } from '@/lib/normalize';
import { History } from '@/models/history.type';

export const filter =
  (search: string) =>
  (history: History): boolean =>
    normalizeString(history.route.path.origin).includes(search) ||
    normalizeString(history.route.path.destination).includes(search) ||
    normalizeString(history.driver.name).includes(search) ||
    normalizeString(history.vehicle.plate).includes(search) ||
    history.route.path.stops.some((stop) =>
      normalizeString(stop).includes(search)
    );
