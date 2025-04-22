import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

import { EditButton } from '@/components/layout/edit-button';
import { Status } from '@/components/layout/status';
import { Button } from '@/components/ui/button';
import { fromDate } from '@/lib/date-parser';
import {
  getRegistration,
  getRole,
  getSource,
  maskedCPF,
  User,
} from '@/models/user.type';

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
    header: 'Matrícula',
    cell: ({ row }) => (
      <Button variant="link" asChild>
        <Link to={`/user/${row.original.id}`}>
          {getRegistration(row.original.registration.toString())}
          <ExternalLink />
        </Link>
      </Button>
    ),
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
    cell: ({ row }) => getRole(row.original.role),
  },
  {
    header: 'Tipo',
    cell: ({ row }) => getSource(row.original.source),
  },
  {
    header: 'Data de Admissão',
    accessorFn: (row) => fromDate(row.admittedAt, 'DD/MM/YYYY'),
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
