import { format } from '@react-input/mask';
import { Vehicle } from './vehicle.type';

// CORRECTIVE = 0
// PREVENTIVE = 1
// PREDICTIVE = 2
// SCHEDULED = 3
export type MaintenanceType = 0 | 1 | 2 | 3;

export type Maintenance = {
  id?: number;
  description: string;
  date: string;
  vehicles: Vehicle[];
  type: MaintenanceType;
};

export const getType = (type: MaintenanceType) => {
  switch (type) {
    case 0:
      return 'Corretiva';
    case 1:
      return 'Preventiva';
    case 2:
      return 'Preditiva';
    case 3:
      return 'Agendada';
    default:
      return 'N/A';
  }
};

export const maintenanceTypeOptions = [
  {
    value: '0',
    label: 'Corretiva',
  },
  {
    value: '1',
    label: 'Preventiva',
  },
  {
    value: '2',
    label: 'Preditiva',
  },
  {
    value: '3',
    label: 'Agendada',
  },
];

export const maskedMaintenanceDate = (date: string | undefined) => {
  return format(date ? date.replace(/[\/\:]/g, '') : '', {
    mask: '__/__/____ __:__',
    replacement: { _: /\d/ },
  });
};
