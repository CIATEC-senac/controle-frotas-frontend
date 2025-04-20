import { JSX, useState } from 'react';

import { FormDialog as BaseFormDialog } from '@/components/layout/form-dialog';
import { Route } from '@/models/route.type';

import { RouteForm } from './form';

export const FormDialog = ({
  title,
  trigger,
  route,
}: {
  title: string;
  trigger: JSX.Element;
  route?: Route;
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
      <RouteForm onSuccess={close} onFailure={() => {}} data={route} />
    </BaseFormDialog>
  );
};
