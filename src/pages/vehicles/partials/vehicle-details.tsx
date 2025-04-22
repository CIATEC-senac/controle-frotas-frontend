import { ColumnDef } from '@tanstack/react-table';

import { EditButton } from '@/components/layout/edit-button';
import { getType, Vehicle } from '@/models/vehicle.type';

import { fromDate } from '@/lib/date-parser';
import dayjs from 'dayjs';
import { DeleteVehicleDialog } from '../delete-dialog';
import { FormDialog } from '../form-dialog';

export const VehicleActions = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <div className="flex gap-2 justify-end">
      <FormDialog
        title="Editar Veículo"
        trigger={<EditButton />}
        vehicle={vehicle}
      />
      <DeleteVehicleDialog vehicle={vehicle} />
    </div>
  );
};

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'plate',
    header: 'Placa',
  },
  {
    accessorKey: 'model',
    header: 'Modelo',
  },
  {
    accessorKey: 'year',
    header: 'Ano',
  },
  {
    header: 'Tipo',
    cell: ({ row }) => getType(row.original.type),
  },
  {
    header: 'Capacidade',
    cell: ({ row }) => `${row.original.capacity} lugares`,
  },
  {
    header: 'Empresa',
    cell: ({ row }) => row.original.enterprise?.name ?? 'N/A',
  },
  {
    header: 'Próxima Manutenção',
    cell: ({ row }) => {
      const today = dayjs().startOf('day');

      const nextMaintenance = row.original.maintenances
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .find(({ date }) => today.isBefore(date));

      if (nextMaintenance) {
        return fromDate(nextMaintenance.date, 'DD/MM/YYYY HH:mm');
      }

      return 'N/A';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <VehicleActions vehicle={row.original} />,
  },
];
