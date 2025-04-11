import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fromModel, UserForm } from '@/pages/users/user-form';
import { FormDialog } from '@/components/layout/form-dialog';

export const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const trigger = (
    <Button className="h-[40px]">
      <Plus />
      Novo usuário
    </Button>
  );

  return (
    <FormDialog
      open={open}
      onOpenChange={setOpen}
      title="Novo Usuário"
      trigger={trigger}
    >
      <UserForm onSuccess={close} onFailure={close} user={fromModel()} />
    </FormDialog>
  );
};
