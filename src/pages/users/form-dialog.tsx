import { ReactNode, useState } from 'react';

import { fromModel, UserForm } from '@/pages/users/form';
import { FormDialog as BaseFormDialog } from '@/components/layout/form-dialog';
import { User } from '@/models/user.type';

export const FormDialog = ({
  title,
  trigger,
  user,
}: {
  title: string;
  trigger: ReactNode;
  user?: User;
}) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <BaseFormDialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      trigger={trigger}
    >
      <UserForm onSuccess={close} onFailure={() => {}} data={fromModel(user)} />
    </BaseFormDialog>
  );
};
