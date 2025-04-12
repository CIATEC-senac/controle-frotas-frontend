import { useState } from 'react';
import { PenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Vehicle } from '@/models/vehicle.type';
import { FormDialog } from '@/components/layout/form-dialog';

import { fromModel, VehicleForm } from './form';

export const EditVehicleDialog = ({ vehicle }: { vehicle: Vehicle }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const trigger = <Button variant="ghost" size="icon" children={<PenLine />} />;

  return (
    <FormDialog
      open={open}
      onOpenChange={setOpen}
      title="Editar Veículo"
      trigger={trigger}
    >
      <VehicleForm
        onSuccess={close}
        onFailure={close}
        vehicle={fromModel(vehicle)}
      />
    </FormDialog>
  );
};
