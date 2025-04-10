import { PenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { User } from '@/models/user.type';

import { UserFormDialog } from './user-form-dialog';

export const EditUserDialog = ({ user }: { user: User }) => {
  return (
    <UserFormDialog title="Editar Usuário" user={user}>
      <Button variant="ghost" size="icon" children={<PenLine />} />
    </UserFormDialog>
  );
};
