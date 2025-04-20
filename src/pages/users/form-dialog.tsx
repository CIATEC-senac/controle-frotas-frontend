import { JSX, useState } from 'react';

import { FormDialog as BaseFormDialog } from '@/components/layout/form-dialog';
import { User } from '@/models/user.type';
import { UserForm } from '@/pages/users/form';

export const FormDialog = ({
  title,
  trigger,
  user,
}: {
  title: string;
  trigger: JSX.Element;
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
      <UserForm onSuccess={close} onFailure={() => {}} data={user} />
    </BaseFormDialog>
  );
};
