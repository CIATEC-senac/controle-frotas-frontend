import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';

import { TextField } from '@/components/layout/textfield';
import { Loading } from '@/components/layout/loading';
import { Button } from '@/components/ui/button';
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
  } as Vehicle;
};

export const VehicleForm = ({
  data,
  onSuccess,
  onFailure,
}: FormAttr<Vehicle>) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(data);

  const { mutate, isLoading } = useMutation(
    (vehicle: Vehicle) => new API().updateVehicle(vehicle),
    {
      onError: (e: any) => {
        const options = toastOptions({ onClose: onFailure });

        console.log(state);

        const message =
          API.handleError(e) ?? state.id != undefined
            ? 'Não foi possível editar veículo'
            : 'Não foi possível adicionar veículo';

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
    setState((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Loading className="mb-6" loading={isLoading} />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
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
