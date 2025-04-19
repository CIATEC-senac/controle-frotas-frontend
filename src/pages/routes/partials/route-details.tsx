import { ColumnDef } from '@tanstack/react-table';
import { Clock, ExternalLink, MapPin } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router';

import { EditButton } from '@/components/layout/edit-button';
import { Button } from '@/components/ui/button';
import { getEstimatedArrivalDate, getName, Route } from '@/models/route.type';
import { DeleteRouteDialog } from '../delete-dialog';
import { FormDialog } from '../form-dialog';
import { RouteQrCode } from './route-qrcode';

export const RoutePathTracking = ({ route }: { route: Route }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 items-center">
        <MapPin size={14} />
        <span>{route.path.origin.toUpperCase()}</span>
      </div>

      <div className="flex gap-3 items-center">
        <MapPin size={14} />
        <span>{route.path.destination.toUpperCase()}</span>
      </div>
    </div>
  );
};

export const RouteDepartureArrival = ({ route }: { route: Route }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 items-center">
        <Clock size={14} />
        <span>Saída: {route.startAt}</span>
      </div>

      <div className="flex gap-3 items-center">
        <Clock size={14} />
        <span>Chegada: {getEstimatedArrivalDate(route)}</span>
      </div>
    </div>
  );
};

export const RouteActions = ({ route }: { route: Route }) => {
  return (
    <div className="flex gap-2 justify-end">
      <FormDialog title="Editar Rota" trigger={<EditButton />} route={route} />
      <DeleteRouteDialog route={route} />
    </div>
  );
};

export const RouteLink = ({ route }: { route: Route }) => {
  return (
    <Button variant="link" asChild>
      <Link to={`/route/${route.id}`}>
        {getName(route)} <ExternalLink />
      </Link>
    </Button>
  );
};

export const RouteStatus = ({ status }: { status: boolean }) => {
  if (status) {
    return (
      <span className="text-green-600 bg-green-100 rounded-2xl py-1 px-3">
        Ativo
      </span>
    );
  }

  return (
    <span className="text-gray-600 bg-gray-100 rounded-2xl py-1 px-3">
      Inativo
    </span>
  );
};

type DetailAttr = {
  icon?: ReactNode;
  label: string;
  value: string;
  suffix?: string;
};

export const Detail = ({ icon, label, value, suffix }: DetailAttr) => {
  return (
    <div className="grid text-sm">
      <p className="flex gap-2 items-center text-gray-600">
        {icon && icon} {label}:
      </p>

      <p>
        {value} {suffix && suffix}
      </p>
    </div>
  );
};

export const columns: ColumnDef<Route>[] = [
  {
    header: 'Nome',
    cell: ({ row }) => <RouteLink route={row.original} />,
  },
  {
    header: 'Origem / Destino',
    cell: ({ row }) => <RoutePathTracking route={row.original} />,
  },
  {
    header: 'QR Code',
    cell: ({ row }) => <RouteQrCode route={row.original} />,
  },
  /*
  {
    header: 'Paradas',
    cell: ({ row }) => `${row.original.path.stops.length} parada(s)`,
  },
  {
    header: 'Horários',
    cell: ({ row }) => <RouteDepartureArrival route={row.original} />,
  },
  {
    header: 'Distância',
    cell: ({ row }) =>
      `${(row.original.estimatedDistance / 1000.0).toFixed(2)} Km`,
  },
  */
  {
    header: 'Status',
    cell: ({ row }) => <RouteStatus status={row.original.status} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <RouteActions route={row.original} />,
  },
];
