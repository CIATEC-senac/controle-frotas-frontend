import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, MapPin, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { FormLoading } from '@/components/layout/form-loading';
import { ResetButton } from '@/components/layout/reset-button';
import { SaveButton } from '@/components/layout/save-button';
import { FormCombobox, FormTextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { API } from '@/lib/api';
import { toastOptions } from '@/lib/toast.options';
import { maskedStartAt, Route } from '@/models/route.type';
import { User } from '@/models/user.type';
import { Vehicle } from '@/models/vehicle.type';
import { FormAttr } from '@/types/form';

import { routeSchema, toZod } from './form.validation';
import { RouteStop } from './stop';

export const RouteForm = ({ data, onSuccess, onFailure }: FormAttr<Route>) => {
  const queryClient = useQueryClient();

  const { data: drivers, isLoading: isLoadingDrivers } = useQuery(
    ['drivers'],
    () => new API().getUsers().then((users) => users.filter((i) => i.role == 2))
  );

  const { data: vehicles, isLoading: isLoadingVehicles } = useQuery(
    ['vehicles'],
    () => new API().getVehicles()
  );

  const { mutate, isLoading: isLoadingMutation } = useMutation(
    (route: Route) => new API().updateRoute(route),
    {
      onError: (e: any) => {
        const options = toastOptions({ onClose: onFailure });

        const message = API.handleError(
          e,
          data?.id != undefined
            ? 'Não foi possível editar rota'
            : 'Não foi possível adicionar rota'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['routes']);

        toast.success(
          data?.id != undefined
            ? 'Rota editada com sucesso'
            : 'Rota adicionada com sucesso',
          toastOptions()
        );

        onSuccess();
      },
    }
  );

  const isLoading = isLoadingDrivers || isLoadingVehicles || isLoadingMutation;

  const onSubmit = (values: z.infer<typeof routeSchema>) => {
    mutate({
      id: Number(values.id) || undefined,
      driver: { id: Number(values.driver) } as User,
      vehicle: { id: Number(values.vehicle) } as Vehicle,
      startAt: values.startAt,
      path: values.path,
    } as Route);
  };

  const driversOptions = (drivers || []).map((i) => ({
    label: i.name,
    value: i.id.toString(),
  }));

  const vehiclesOptions = (vehicles || []).map((i) => ({
    label: i.plate,
    value: i.id.toString(),
  }));

  const form = useForm<z.infer<typeof routeSchema>>({
    resolver: zodResolver(routeSchema),
    defaultValues: toZod(data),
  });

  const stops = form.watch('path.stops');

  const addStop = () => {
    form.setValue('path.stops', [...(form.getValues('path.stops') ?? []), '']);
  };

  const deleteStop = (index: number) => {
    const stops = form.getValues('path.stops') ?? [];
    // Remove index
    stops.splice(index, 1);
    form.setValue('path.stops', [...stops]);
  };

  const vehicleId = form.watch('vehicle');

  const maxCapacity: number =
    vehicles?.find(({ id }) => id == Number(vehicleId))?.capacity ?? 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={onSuccess}>
        <FormLoading loading={isLoading} />

        <div className="space-y-6">
          <div className="space-y-6">
            <FormCombobox
              label="Veículo"
              name="vehicle"
              control={form.control}
              placeholder="Seleciona o veículo..."
              options={vehiclesOptions}
              disabled={isLoading}
            />

            <FormCombobox
              label="Motorista"
              name="driver"
              control={form.control}
              placeholder="Seleciona o motorista..."
              options={driversOptions}
              disabled={isLoading}
            />

            <FormTextField
              label="Horário de Partida"
              name="startAt"
              control={form.control}
              mask={maskedStartAt}
              placeholder="Digite a hora"
              prefixIcon={<Clock size={16} />}
              disabled={isLoading}
            />

            <FormTextField
              control={form.control}
              label="Origem"
              name="path.origin"
              prefixIcon={<MapPin size={16} />}
              placeholder="Digite o endereço de origem"
              disabled={isLoading}
            />

            <FormTextField
              control={form.control}
              label="Destino"
              name="path.destination"
              prefixIcon={<MapPin size={16} />}
              placeholder="Digite o endereço de destino"
              disabled={isLoading}
            />

            <div className="space-y-6">
              <div className="flex justify-between">
                <h3>Paradas (máximo de {maxCapacity})</h3>

                <Button
                  variant="ghost"
                  onClick={addStop}
                  disabled={isLoading || (stops?.length ?? 0) >= maxCapacity}
                >
                  <Plus size={16} /> Adicionar Parada
                </Button>
              </div>

              {!stops?.length && (
                <div className="flex justify-center">
                  <span className="text-sm">Rota sem paradas</span>
                </div>
              )}

              <div className="space-y-3">
                {stops?.map((_, index) => (
                  <RouteStop
                    key={index}
                    control={form.control}
                    name={`path.stops.[${index}]`}
                    disabled={isLoading}
                    onDelete={isLoading ? undefined : () => deleteStop(index)}
                  />
                ))}
              </div>
            </div>
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
