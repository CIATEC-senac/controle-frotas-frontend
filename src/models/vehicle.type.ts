import { format } from '@react-input/mask';

import { Enterprise } from './enterprise.type';
import { Maintenance } from './maintenance.type';

type VehicleType = 'bus' | 'car' | 'minibus' | 'van';

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

export const getType = (type: VehicleType) => {
  switch (type) {
    case 'bus':
      return 'Ônibus';
    case 'car':
      return 'Carro';
    case 'minibus':
      return 'Micro-Ônibus';
    case 'van':
      return 'Van';
  }
};

export const maskedNumber = (number: number | undefined, length: number) =>
  format(number?.toString() || '', {
    mask: Array(length).fill('_').join(''),
    replacement: { _: /\d/ },
  });
