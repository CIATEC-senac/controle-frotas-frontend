import { ColumnDef } from '@tanstack/react-table';
import { Clock, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { CreateButton } from '@/components/layout/create-button';
import { DataTable } from '@/components/layout/data-table';
import { EditButton } from '@/components/layout/edit-button';
import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { TextField } from '@/components/layout/textfield';
import { API } from '@/lib/api';
import { getEstimatedArrivalDate, getName, Route } from '@/models/route.type';

import { DeleteRouteDialog } from './delete-dialog';
import { FormDialog } from './form-dialog';

const columns: ColumnDef<Route>[] = [
  {
    header: 'Nome',
    cell: ({ row }) => getName(row.original),
  },
  {
    header: 'Origem / Destino',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex gap-3 items-center">
          <MapPin size={14} />
          <span>{row.original.path.origin.toUpperCase()}</span>
        </div>

        <div className="flex gap-3 items-center">
          <MapPin size={14} />
          <span>{row.original.path.destination.toUpperCase()}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'Horários',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex gap-3 items-center">
          <Clock size={14} />
          <span>Saída: {row.original.startAt}</span>
        </div>

        <div className="flex gap-3 items-center">
          <Clock size={14} />
          <span>Chegada: {getEstimatedArrivalDate(row.original)}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'Distância',
    cell: ({ row }) =>
      `${(row.original.estimatedDistance / 1000.0).toFixed(2)} Km`,
  },
  {
    header: 'Status',
    cell: ({ row }) => (row.original.status ? 'Ativo' : 'Inativo'),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end">
        <FormDialog
          title="Editar Rota"
          trigger={<EditButton />}
          route={row.original}
        />

        <DeleteRouteDialog route={row.original} />
      </div>
    ),
  },
];

export const RoutesPage = () => {
  const [search, setSearch] = useState('');

  const {
    data: vehicles,
    isLoading,
    error,
    refetch,
  } = useQuery(['routes'], () => new API().getRoutes());

  const getChildren = () => {
    if (error) {
      return (
        <FetchError message="Não foi possível listar rotas" onClick={refetch} />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <DataTable
        columns={columns}
        data={vehicles || []}
        empty="Nenhum resultado encontrado"
      />
    );
  };

  return (
    <Layout title="Rotas">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-wrap gap-3 place-content-between">
          <TextField
            containerProps={{ className: 'w-[350px] max-w-[100%]' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefixIcon={<Search size={16} />}
            placeholder="Busque por modelo ou placa..."
          />

          <FormDialog
            title="Nova rota"
            trigger={<CreateButton title="Nova rota" />}
          />
        </div>

        {getChildren()}
      </div>
    </Layout>
  );
};
