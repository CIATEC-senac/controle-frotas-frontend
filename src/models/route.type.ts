import dayjs from 'dayjs';

import { leftPad } from '@/lib/left-pad';

import { format } from '@react-input/mask';
import { User } from './user.type';
import { Vehicle } from './vehicle.type';

export type RoutePath = {
  origin: string;
  destination: string;
  stops: string[];
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type RoutePathCoordinates = {
  origin: LatLng;
  destination: LatLng;
  stops: LatLng[];
};

export type Route = {
  id?: number;
  estimatedDuration: number;
  estimatedDistance: number;
  path: RoutePath;
  vehicle: Vehicle;
  driver: User;
  startAt: string;
  status: boolean;
};

export type DetailedRoute = Route & {
  pathCoordinates: RoutePathCoordinates;
};

export const maskedStartAt = (startAt: string | undefined) =>
  format(startAt ?? '', {
    mask: '__:__',
    replacement: { _: /\d/ },
  });

export const getNeighborhood = (path: string) => {
  return path.split('-').at(1)?.trim().toUpperCase();
};

export const getStreet = (path: string) => {
  const [street, neighborhood] = path.split(',');
  return [street, neighborhood]?.join(',').trim().toUpperCase();
};

export const getEstimatedArrivalDate = (route: Route) => {
  const [hours, minutes] = (route.startAt ?? '').split(':');

  return dayjs()
    .set('hour', Number(hours ?? 0))
    .set('minutes', Number(minutes ?? 0))
    .add(route.estimatedDuration, 'seconds')
    .format('HH:mm');
};

export const getName = (route: Route) => {
  // const originNeighborhood = getNeighborhood(route.path.origin);
  // const destinationNeighborhood = getNeighborhood(route.path.destination);

  // return `${originNeighborhood} - ${destinationNeighborhood}`;

  return 'Rota ' + leftPad(route.id!.toString(), 4, '0');
};
