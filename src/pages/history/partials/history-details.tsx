import { ColumnDef } from '@tanstack/react-table';
import { FileText, MapPin } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { fromDate } from '@/lib/date-parser';
import { History } from '@/models/history.type';
import { getStreet } from '@/models/route.type';

const backendHost = `http://${location.hostname}:3000`;

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
    header: 'Origem / Destino',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="flex gap-3 items-center">
          <MapPin size={14} />
          {getStreet(row.original.route.path.origin)}
        </span>

        <span className="flex gap-3 items-center">
          <MapPin size={14} />
          {getStreet(row.original.route.path.destination)}
        </span>
      </div>
    ),
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
    header: 'Responsável',
    cell: ({ row }) => row.original.approval?.approvedBy.name ?? 'Pendente',
  },
  {
    header: 'Relatório',
    cell: ({ row }) => (
      <div className="flex flex-col items-start">
        <Button variant="link" size="sm" asChild>
          <a
            download
            target="_blank"
            href={`${backendHost}/pdf/${row.original.id}`}
          >
            <FileText /> PDF
          </a>
        </Button>

        <Button variant="link" size="sm" asChild>
          <a
            download
            target="_blank"
            href={`${backendHost}/excel/${row.original.id}`}
          >
            <FileText /> Excel
          </a>
        </Button>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button variant="link" asChild>
        <Link
          to={`/routes/${row.original.route.id}/history/${row.original.id}`}
        >
          Detalhes
        </Link>
      </Button>
    ),
  },
];
