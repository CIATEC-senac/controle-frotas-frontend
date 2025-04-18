import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
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
import { normalizeString } from '@/lib/normalize';
import { Vehicle } from '@/models/vehicle.type';

import { DeleteVehicleDialog } from './delete-dialog';
import { filter } from './filter';
import { FormDialog } from './form-dialog';

const columns: ColumnDef<Vehicle>[] = [
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
    accessorKey: 'plate',
    header: 'Placa',
  },
  {
    header: 'Empresa',
    cell: ({ row }) => row.original.enterprise?.name ?? 'N/A',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end">
        <FormDialog
          title="Editar Veículo"
          trigger={<EditButton />}
          vehicle={row.original}
        />
        <DeleteVehicleDialog vehicle={row.original} />
      </div>
    ),
  },
];

export const VehiclesPage = () => {
  const [search, setSearch] = useState('');

  const {
    data: vehicles,
    isLoading,
    error,
    refetch,
  } = useQuery(['vehicles'], () => new API().getVehicles());

  useQuery(['enterprises'], () => new API().getEnterprises());

  const getChildren = () => {
    if (error) {
      return (
        <FetchError
          message="Não foi possível listar veículos"
          onClick={refetch}
        />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <DataTable
        columns={columns}
        data={(vehicles || []).filter(filter(normalizeString(search)))}
        empty="Nenhum resultado encontrado"
      />
    );
  };

  return (
    <Layout title="Veículos">
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
            title="Novo veículo"
            trigger={<CreateButton title="Novo veículo" />}
          />
        </div>

        {getChildren()}
      </div>
    </Layout>
  );
};
