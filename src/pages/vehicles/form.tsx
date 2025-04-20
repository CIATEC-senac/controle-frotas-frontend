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
import { API } from '@/lib/api';
import { toastOptions } from '@/lib/toast.options';
import { maskedNumber, Vehicle } from '@/models/vehicle.type';
import { FormAttr } from '@/types/form';

import { Enterprise } from '@/models/enterprise.type';
import { toZod, vehicleSchema } from './form.validation';

export const VehicleForm = ({
  data,
  onSuccess,
  onFailure,
}: FormAttr<Vehicle>) => {
  const queryClient = useQueryClient();

  const { data: enterprises } = useQuery(['enterprises'], () =>
    new API().getEnterprises()
  );

  const { mutate, isLoading } = useMutation(
    (vehicle: Vehicle) => new API().updateVehicle(vehicle),
    {
      onError: (e: any) => {
        const options = toastOptions({ onClose: onFailure });

        const message = API.handleError(
          e,
          data?.id != undefined
            ? 'Não foi possível editar veículo'
            : 'Não foi possível adicionar veículo'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['vehicles']);

        toast.success(
          data?.id != undefined
            ? 'Veículo editado com sucesso'
            : 'Veículo adicionado com sucesso',
          toastOptions()
        );

        onSuccess();
      },
    }
  );

  const onSubmit = (values: z.infer<typeof vehicleSchema>) => {
    mutate({
      ...values,
      id: Number(values.id) || undefined,
      capacity: Number(values.capacity),
      enterprise: { id: Number(values.enterprise) } as Enterprise,
      year: Number(values.year),
    } as Vehicle);
  };

  const enterprisesOptions = (enterprises || []).map((enterprise) => ({
    label: enterprise.name,
    value: enterprise.id.toString(),
  }));

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: toZod(data),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={onSuccess}>
        <FormLoading loading={isLoading} />

        <div className="space-y-6">
          <div className="space-y-6">
            <FormTextField
              label="Modelo"
              name="model"
              control={form.control}
              disabled={isLoading}
            />

            <FormTextField
              label="Placa"
              name="plate"
              control={form.control}
              placeholder="AAA0000"
              disabled={isLoading}
            />

            <FormTextField
              label="Ano"
              name="year"
              mask={(value) => maskedNumber(Number(value), 4)}
              control={form.control}
              placeholder={new Date().getFullYear().toString()}
              maxLength={4}
              disabled={isLoading}
            />

            <FormTextField
              label="Capacidade"
              name="capacity"
              mask={(value) => maskedNumber(Number(value), 2)}
              control={form.control}
              placeholder="5"
              maxLength={2}
              disabled={isLoading}
            />

            <FormCombobox
              label="Empresa"
              name="enterprise"
              control={form.control}
              placeholder="Seleciona a empresa..."
              options={enterprisesOptions}
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
