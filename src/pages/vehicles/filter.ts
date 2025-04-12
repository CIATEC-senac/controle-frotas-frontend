import { Vehicle } from '@/models/vehicle.type';

export const filter =
  (search: string) =>
  (vehicle: Vehicle): boolean =>
    vehicle.model ? vehicle.model?.includes(search) : true;
