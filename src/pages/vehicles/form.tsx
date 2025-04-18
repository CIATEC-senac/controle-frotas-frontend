import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { Loading } from '@/components/layout/loading';
import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { API } from '@/lib/api';
import { toastOptions } from '@/lib/toast.options';
import { maskedNumber, Vehicle } from '@/models/vehicle.type';
import { FormAttr } from '@/types/form';

export const fromModel = (vehicle?: Vehicle) => {
  return {
    id: vehicle?.id,
    model: vehicle?.model,
    capacity: vehicle?.capacity,
    plate: vehicle?.plate,
    type: vehicle?.type,
    year: vehicle?.year,
    status: vehicle?.status || true,
    enterprise: vehicle?.enterprise,
  } as Vehicle;
};

export const VehicleForm = ({
  data,
  onSuccess,
  onFailure,
}: FormAttr<Vehicle>) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(data);

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
          state.id != undefined
            ? 'Não foi possível editar veículo'
            : 'Não foi possível adicionar veículo'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['vehicles']);

        toast.success(
          state.id != undefined
            ? 'Veículo editado com sucesso'
            : 'Veículo adicionado com sucesso',
          toastOptions()
        );

        onSuccess();
      },
    }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(state);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData(e.target.id as keyof Vehicle, e.target.value);
  };

  const updateData = (key: keyof Vehicle, value: any) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const enterprisesOptions = (enterprises || []).map((enterprise) => ({
    label: enterprise.name,
    value: enterprise.id.toString(),
  }));

  return (
    <form onSubmit={onSubmit}>
      <Loading className="mb-6" loading={isLoading} />

      <div className="space-y-6">
        <div className="space-y-6">
          <TextField
            onChange={onChange}
            id="model"
            label="Modelo"
            value={state.model}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="plate"
            label="Placa"
            value={state.plate}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="year"
            label="Ano"
            value={maskedNumber(state.year, 4)}
            maxLength={4}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="capacity"
            label="Capacidade"
            value={maskedNumber(state.capacity, 2)}
            maxLength={2}
            disabled={isLoading}
          />

          <div className="grid gap-2">
            <Label>Empresa</Label>

            <Combobox
              onChange={(id) => updateData('enterprise', { id: Number(id) })}
              placeholder="Seleciona a empresa..."
              value={state.enterprise?.id?.toString() ?? ''}
              options={enterprisesOptions}
            />
          </div>
        </div>

        <div className="w-full flex gap-3 justify-end">
          <Button
            disabled={isLoading}
            variant="secondary"
            type="reset"
            onClick={onSuccess}
          >
            Cancelar
          </Button>

          <Button disabled={isLoading} type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
};
