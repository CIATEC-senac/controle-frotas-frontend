import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { FormLoading } from '@/components/layout/form-loading';
import { ResetButton } from '@/components/layout/reset-button';
import { SaveButton } from '@/components/layout/save-button';
import { FormCombobox, FormTextField } from '@/components/layout/textfield';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { API } from '@/lib/api';
import { toISO } from '@/lib/date-parser';
import { toastOptions } from '@/lib/toast.options';
import {
  Maintenance,
  MaintenanceType,
  maintenanceTypeOptions,
  maskedMaintenanceDate,
} from '@/models/maintenance.type';
import { Vehicle } from '@/models/vehicle.type';
import { FormAttr } from '@/types/form';

import { maintenanceSchema, toZod } from './form.validation';

export const MaintenanceForm = ({
  data,
  onSuccess,
  onFailure,
}: FormAttr<Maintenance>) => {
  const queryClient = useQueryClient();

  const { data: vehicles } = useQuery(['vehicles'], () =>
    new API().getVehicles()
  );

  const { mutate, isLoading } = useMutation(
    (maintenance: Maintenance) => new API().updateMaintenance(maintenance),
    {
      onError: (e: any) => {
        const options = toastOptions({ onClose: onFailure });

        const message = API.handleError(
          e,
          data?.id != undefined
            ? 'Não foi possível editar manutenção'
            : 'Não foi possível adicionar manutenção'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['maintenances']);

        toast.success(
          data?.id != undefined
            ? 'Manutenção editada com sucesso'
            : 'Manutenção adicionada com sucesso',
          toastOptions()
        );

        onSuccess();
      },
    }
  );

  const onSubmit = (values: z.infer<typeof maintenanceSchema>) => {
    mutate({
      id: Number(values.id) || undefined,
      date: toISO(values.date, 'DD/MM/YYYY HH:mm'),
      description: values.description,
      type: Number(values.type) as MaintenanceType,
      vehicles: values.vehicles.map((id) => ({ id: Number(id) } as Vehicle)),
    });
  };

  const vehiclesOptions = (vehicles || []).map((vehicle) => ({
    label: vehicle.plate,
    value: vehicle.id.toString(),
  }));

  const form = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: toZod(data),
  });

  const selectedVehicles = new Set(form.watch('vehicles'));

  const toggleVehicle = (id: string) => {
    if (selectedVehicles.has(id)) {
      selectedVehicles.delete(id);
    } else {
      selectedVehicles.add(id);
    }

    form.setValue('vehicles', [...selectedVehicles]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={onSuccess}>
        <FormLoading loading={isLoading} />

        <div className="space-y-6">
          <div className="space-y-6">
            <FormTextField
              name="date"
              label="Data"
              control={form.control}
              placeholder="01/01/2025 12:00"
              mask={maskedMaintenanceDate}
              disabled={isLoading}
            />

            <FormTextField
              className="max-h-[100px]"
              control={form.control}
              widget={Textarea}
              name="description"
              label="Descrição"
              disabled={isLoading}
            />

            <FormCombobox
              label="Tipo"
              control={form.control}
              name="type"
              placeholder="Seleciona o tipo..."
              options={maintenanceTypeOptions}
            />

            <FormCombobox
              label="Veículos"
              placeholder="Seleciona o(s) veículo(s)..."
              name="vehicles"
              control={form.control}
              options={vehiclesOptions}
              onChange={(id) => toggleVehicle(id)}
              multiple
            />
          </div>

          <div className="w-full flex gap-3 justify-end">
            <ResetButton disabled={isLoading} />
            <SaveButton disabled={isLoading} />
          </div>
        </div>
      </form>
    </Form>
  );
};
