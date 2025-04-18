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
import { maskedCPF, User } from '@/models/user.type';

import { DeleteUserDialog } from './delete-dialog';
import { filter } from './filter';
import { FormDialog } from './form-dialog';

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
        <FormDialog
          trigger={<EditButton />}
          title="Editar Usuário"
          user={row.original}
        />
        <DeleteUserDialog user={row.original} />
      </div>
    ),
  },
];

export const UsersPage = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading, error, refetch } = useQuery(['users'], () =>
    new API().getUsers()
  );

  const getChildren = () => {
    if (error) {
      // em caso de erro, tentar novamente
      return (
        <FetchError
          message="Não foi possível listar usuários"
          onClick={() => refetch()}
        />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
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

          <FormDialog
            trigger={<CreateButton title="Novo usuário" />}
            title="Novo Usuário"
          />
        </div>

        {getChildren()}
      </div>
    </Layout>
  );
};
