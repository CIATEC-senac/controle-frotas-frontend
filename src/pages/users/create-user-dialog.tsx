import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fromModel } from '@/pages/users/user-form';

import { UserFormDialog } from './user-form-dialog';

export const CreateUserDialog = () => {
  return (
    <UserFormDialog title="Novo Usuário" user={fromModel()}>
      <Button className="h-[40px]">
        <Plus />
        Novo usuário
      </Button>
    </UserFormDialog>
  );
};
