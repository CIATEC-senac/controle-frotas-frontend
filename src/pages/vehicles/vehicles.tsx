import { useState } from 'react';
import { useQuery } from 'react-query';
import { Search } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Layout } from '@/components/layout/layout';
import { TextField } from '@/components/layout/textfield';
import { DataTable } from '@/components/layout/data-table';
import { API } from '@/lib/api';
import { normalizeString } from '@/lib/normalize';
import { Vehicle } from '@/models/vehicle.type';

import { CreateVehicleDialog } from './create-dialog';
import { EditVehicleDialog } from './edit-dialog';
import { DeleteVehicleDialog } from './delete-dialog';
import { filter } from './filter';

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
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end">
        <EditVehicleDialog vehicle={row.original} />
        <DeleteVehicleDialog vehicle={row.original} />
      </div>
    ),
  },
];

export const VehiclesPage = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery(['vehicles'], () =>
    new API().getVehicles()
  );

  const getChildren = () => {
    if (isLoading) {
      return <div className="flex py-6">Carregando...</div>;
    }

    if (!data) {
      return null;
    }

    return (
      <DataTable
        columns={columns}
        data={data.filter(filter(normalizeString(search)))}
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

          <CreateVehicleDialog />
        </div>

        {getChildren()}
      </div>
    </Layout>
  );
};
