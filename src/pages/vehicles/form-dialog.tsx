import { JSX, useState } from 'react';

import { FormDialog as BaseFormDialog } from '@/components/layout/form-dialog';
import { Vehicle } from '@/models/vehicle.type';

import { fromModel, VehicleForm } from './form';

export const FormDialog = ({
  title,
  trigger,
  vehicle,
}: {
  title: string;
  trigger: JSX.Element;
  vehicle?: Vehicle;
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
      <VehicleForm
        onSuccess={close}
        onFailure={() => {}}
        data={fromModel(vehicle)}
      />
    </BaseFormDialog>
  );
};
