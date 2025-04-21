import { ColumnDef } from '@tanstack/react-table';

import { EditButton } from '@/components/layout/edit-button';
import { getType, Maintenance } from '@/models/maintenance.type';

import { fromDate } from '@/lib/date-parser';
import { DeleteMaintenanceDialog } from '../delete-dialog';
import { FormDialog } from '../form-dialog';

export const MaintenanceActions = ({
  maintenance,
}: {
  maintenance: Maintenance;
}) => {
  return (
    <div className="flex gap-2 justify-end">
      <FormDialog
        trigger={<EditButton />}
        title="Editar Manutenção"
        maintenance={maintenance}
      />
      <DeleteMaintenanceDialog maintenance={maintenance} />
    </div>
  );
};

export const columns: ColumnDef<Maintenance>[] = [
  {
    header: 'Descrição',
    cell: ({ row }) => (
      <span className="block max-w-[300px] break-words whitespace-normal">
        {row.original.description}
      </span>
    ),
  },
  {
    header: 'Data',
    cell: ({ row }) => fromDate(row.original.date, 'DD/MM/YYYY HH:mm'),
  },
  {
    header: 'Veículos',
    cell: ({ row }) =>
      row.original.vehicles.map(({ plate }) => plate).join(', '),
  },
  {
    header: 'Tipo',
    cell: ({ row }) => getType(row.original.type),
  },
  {
    id: 'actions',
    cell: ({ row }) => <MaintenanceActions maintenance={row.original} />,
  },
];
