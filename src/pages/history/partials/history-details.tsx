import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { History } from '@/models/history';

export const columns: ColumnDef<History>[] = [
  {
    header: 'Partida',
    cell: ({ row }) =>
      dayjs(row.original.startedAt).format('DD/MM/YYYY HH:mm:ss'),
  },
  {
    header: 'Chegada',
    cell: ({ row }) =>
      dayjs(row.original.endedAt).format('DD/MM/YYYY HH:mm:ss'),
  },
  {
    header: 'Motorista',
    cell: ({ row }) => row.original.driver.name,
  },
  {
    header: 'Veículo',
    cell: ({ row }) => row.original.vehicle.plate,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button variant="link" asChild>
        <Link to={`/route/${row.original.route.id}/history/${row.original.id}`}>
          Detalhes
        </Link>
      </Button>
    ),
  },
];
