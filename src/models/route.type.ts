import { User } from './user.type';
import { Vehicle } from './vehicle.type';

export type RoutePath = {
  origin: string;
  destination: string;
  stops: string[];
};

export type Route = {
  id?: number;
  estimatedDuration: number;
  elapsedDistance: number;
  path: RoutePath;
  vehicle: Vehicle;
  driver: User;
};
