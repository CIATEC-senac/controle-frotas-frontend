import { DetailedRoute, LatLng } from './route.type';
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

export enum HistoryUnplannedStopType {
  TRAFFIC = 0,
  CLOSED_ROAD = 1,
  BLOCKED_LANE = 2,
  GAS = 3,
  MECHANICAL_PROBLEM = 4,
  ACCIDENT = 5,
}

export type HistoryUnplannedStop = {
  type: HistoryUnplannedStopType;
  date: string;
  coordinates: LatLng;
  id: number;
};

export type HistoryTrack = {
  coordinate: LatLng;
};

export type History = {
  id: number;
  odometerInitial: number;
  odometerFinal: number;
  elapsedDistance: number;
  imgOdometerInitial: string;
  imgOdometerFinal: string;
  track: HistoryTrack[];
  startedAt: string;
  endedAt: string;
  driver: User;
  route: DetailedRoute;
  vehicle: Vehicle;
  approval: HistoryApproval;
  unplannedStops: HistoryUnplannedStop[];
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

export const getUnplannedStopType = (type: HistoryUnplannedStopType) => {
  switch (type) {
    case HistoryUnplannedStopType.TRAFFIC:
      return 'Trânsito';
    case HistoryUnplannedStopType.CLOSED_ROAD:
      return 'Via interditada';
    case HistoryUnplannedStopType.BLOCKED_LANE:
      return 'Faixa bloqueada';
    case HistoryUnplannedStopType.GAS:
      return 'Combustível';
    case HistoryUnplannedStopType.MECHANICAL_PROBLEM:
      return 'Problema mecânico';
    case HistoryUnplannedStopType.ACCIDENT:
      return 'Acidente';
  }
};
