import { useState } from 'react';
import { PenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { User } from '@/models/user.type';
import { FormDialog } from '@/components/layout/form-dialog';

import { fromModel, UserForm } from './form';

export const EditUserDialog = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const trigger = <Button variant="ghost" size="icon" children={<PenLine />} />;

  return (
    <FormDialog
      open={open}
      onOpenChange={setOpen}
      title="Editar Usuário"
      trigger={trigger}
    >
      <UserForm onSuccess={close} onFailure={close} data={fromModel(user)} />
    </FormDialog>
  );
};
