import { Search } from 'lucide-react';
import { useQuery } from 'react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Layout } from '@/components/layout/layout';
import { TextField } from '@/components/layout/textfield';
import { API } from '@/lib/api';
import { DataTable } from '@/components/layout/data-table';
import { User } from '@/models/user.type';

import { CreateUserDialog } from './create-user-dialog';
import { EditUserDialog } from './edit-user-dialog';
import { DeleteUserDialog } from './delete-user-dialog';
import { filter } from './filter';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'registry',
    header: 'Matrícula',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
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
        data={data.filter(filter(search))}
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

        <ToastContainer />
      </div>
    </Layout>
  );
};
