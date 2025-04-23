import { normalizeString } from '@/lib/normalize';
import { getType, Maintenance } from '@/models/maintenance.type';

export const filter =
  (search: string) =>
  (maintenance: Maintenance): boolean =>
    normalizeString(getType(maintenance.type)).includes(search) ||
    maintenance.vehicles.some((vehicle) =>
      normalizeString(vehicle.plate).includes(search)
    );
