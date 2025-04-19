import { ColumnDef } from '@tanstack/react-table';

import { EditButton } from '@/components/layout/edit-button';
import { Status } from '@/components/layout/status';
import { maskedCPF, roleOptions, User } from '@/models/user.type';

import dayjs from 'dayjs';
import { DeleteUserDialog } from '../delete-dialog';
import { FormDialog } from '../form-dialog';

export const UserActions = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-2 justify-end">
      <FormDialog trigger={<EditButton />} title="Editar Usuário" user={user} />
      <DeleteUserDialog user={user} />
    </div>
  );
};

export const columns: ColumnDef<User>[] = [
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
    header: 'Cargo',
    cell: ({ row }) =>
      roleOptions.find((role) => role.value === row.original.role.toString())
        ?.label,
  },
  {
    header: 'Data de Admissão',
    accessorFn: (row) => dayjs(row.admittedAt).format('DD/MM/YYYY'),
  },
  {
    header: 'Status',
    cell: ({ row }) => <Status status={row.original.status} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
