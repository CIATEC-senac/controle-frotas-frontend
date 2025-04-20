import { JSX, useState } from 'react';

import { FormDialog as BaseFormDialog } from '@/components/layout/form-dialog';
import { Maintenance } from '@/models/maintenance.type';
import { MaintenanceForm } from './form';

export const FormDialog = ({
  title,
  trigger,
  maintenance,
}: {
  title: string;
  trigger: JSX.Element;
  maintenance?: Maintenance;
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
      <MaintenanceForm
        onSuccess={close}
        onFailure={() => {}}
        data={maintenance}
      />
    </BaseFormDialog>
  );
};
