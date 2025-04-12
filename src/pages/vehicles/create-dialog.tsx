import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormDialog } from '@/components/layout/form-dialog';

import { fromModel, VehicleForm } from './form';

export const CreateVehicleDialog = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const trigger = (
    <Button className="h-[40px]">
      <Plus />
      Novo veículo
    </Button>
  );

  return (
    <FormDialog
      open={open}
      onOpenChange={setOpen}
      title="Novo Veículo"
      trigger={trigger}
    >
      <VehicleForm onSuccess={close} onFailure={close} vehicle={fromModel()} />
    </FormDialog>
  );
};
