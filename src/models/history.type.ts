import { DetailedRoute, RoutePath, RoutePathCoordinates } from './route.type';
import { User } from './user.type';
import { Vehicle } from './vehicle.type';

export enum HistoryApprovalStatus {
  APPROVED = 0,
  DISAPPROVED = 1,
  PENDING = -1,
}

export type HistoryApproval = {
  status: HistoryApprovalStatus;
  date: string;
  observation: string;
  approvedBy: User;
};

export type History = {
  id: number;
  odometerInitial: number;
  odometerFinal: number;
  elapsedDistance: number;
  imgOdometerInitial: string;
  imgOdometerFinal: string;
  pathCoordinates: RoutePathCoordinates;
  path: RoutePath;
  startedAt: string;
  endedAt: string;
  driver: User;
  route: DetailedRoute;
  vehicle: Vehicle;
  approval: HistoryApproval;
};

export const getStatus = (approval?: HistoryApproval) => {
  if (!approval) {
    return 'Pendente';
  }

  switch (approval.status) {
    case 0:
      return 'Aprovada';
    case 1:
      return 'Reprovada';
  }
};
