import { ColumnDef } from '@tanstack/react-table';

import { EditButton } from '@/components/layout/edit-button';
import { Vehicle } from '@/models/vehicle.type';

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
    accessorKey: 'type',
    header: 'Tipo',
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
    id: 'actions',
    cell: ({ row }) => <VehicleActions vehicle={row.original} />,
  },
];
