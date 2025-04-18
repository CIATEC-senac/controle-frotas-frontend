import { normalizeString } from '@/lib/normalize';
import { Vehicle } from '@/models/vehicle.type';

export const filter =
  (search: string) =>
  (vehicle: Vehicle): boolean =>
    normalizeString(vehicle.model).includes(search) ||
    normalizeString(vehicle.plate).includes(search);
