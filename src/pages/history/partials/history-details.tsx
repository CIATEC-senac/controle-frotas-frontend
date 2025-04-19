import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { fromDate } from '@/lib/date-parser';
import { History } from '@/models/history.type';

export const columns: ColumnDef<History>[] = [
  {
    header: 'Partida',
    cell: ({ row }) => fromDate(row.original.startedAt),
  },
  {
    header: 'Chegada',
    cell: ({ row }) => fromDate(row.original.endedAt),
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
