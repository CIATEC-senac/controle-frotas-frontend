import { useState } from 'react';
import { useQuery } from 'react-query';
import { Search } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Layout } from '@/components/layout/layout';
import { TextField } from '@/components/layout/textfield';
import { API } from '@/lib/api';
import { normalizeString } from '@/lib/normalize';
import { DataTable } from '@/components/layout/data-table';
import { maskedCPF, User } from '@/models/user.type';

import { CreateUserDialog } from './create-dialog';
import { EditUserDialog } from './edit-dialog';
import { DeleteUserDialog } from './delete-dialog';
import { filter } from './filter';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'registration',
    header: 'Matrícula',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    header: 'CPF',
    cell: ({ row }) => maskedCPF(row.original.cpf),
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end">
        <EditUserDialog user={row.original} />
        <DeleteUserDialog user={row.original} />
      </div>
    ),
  },
];

export const UsersPage = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery(['users'], () => new API().getUsers());

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
    <Layout title="Usuários">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-wrap gap-3 place-content-between">
          <TextField
            containerProps={{ className: 'w-[350px] max-w-[100%]' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefixIcon={<Search size={16} />}
            placeholder="Busque por nome, cpf ou e-mail..."
          />

          <CreateUserDialog />
        </div>

        {getChildren()}
      </div>
    </Layout>
  );
};
