import { format } from '@react-input/mask';

import { Enterprise } from './enterprise.type';
import { Maintenance } from './maintenance.type';

export enum VehicleType {
  BUS = 'bus',
  CAR = 'car',
  MINIBUS = 'minibus',
  VAN = 'van',
}

export type Vehicle = {
  id: number;
  model: string;
  capacity: number;
  plate: string;
  year: number;
  type: VehicleType;
  status: boolean;
  maintenances: Maintenance[];
  enterprise?: Partial<Enterprise>;
};

export const getType = (type?: VehicleType) => {
  switch (type) {
    case VehicleType.BUS:
      return 'Ônibus';
    case VehicleType.CAR:
      return 'Carro';
    case VehicleType.MINIBUS:
      return 'Micro-Ônibus';
    case VehicleType.VAN:
      return 'Van';
    default:
      return 'N/A';
  }
};

export const maskedNumber = (number: number | undefined, length: number) =>
  format(number?.toString() || '', {
    mask: Array(length).fill('_').join(''),
    replacement: { _: /\d/ },
  });

export const vehicleTypeOptions = [
  {
    label: getType(VehicleType.BUS),
    value: VehicleType.BUS,
  },
  {
    label: getType(VehicleType.CAR),
    value: VehicleType.CAR,
  },
  {
    label: getType(VehicleType.VAN),
    value: VehicleType.VAN,
  },
  {
    label: getType(VehicleType.MINIBUS),
    value: VehicleType.MINIBUS,
  },
];
