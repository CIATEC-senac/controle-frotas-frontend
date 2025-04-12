import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';

import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { API } from '@/lib/api';
import { maskedNumber, Vehicle } from '@/models/vehicle.type';

export const fromModel = (vehicle?: Vehicle) => {
  return {
    id: vehicle?.id,
    model: vehicle?.model,
    capacity: vehicle?.capacity,
    plate: vehicle?.plate,
    type: vehicle?.type,
    year: vehicle?.year,
  } as Vehicle;
};

type VehicleFormAttr = {
  vehicle: Vehicle;
  onSuccess: VoidFunction;
  onFailure: VoidFunction;
};

export const VehicleForm = ({
  vehicle,
  onSuccess,
  onFailure,
}: VehicleFormAttr) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(vehicle);

  const { mutate, isLoading } = useMutation(
    (vehicle: Vehicle) => new API().updateVehicle(vehicle),
    {
      onError: (e: any) => {
        const options = { onClose: () => onFailure() };

        if (e instanceof AxiosError) {
          let message = e.message;

          const apiMessage = e.response?.data?.message;

          if (apiMessage != undefined) {
            message = Array.isArray(apiMessage) ? apiMessage.at(0) : apiMessage;
          }

          toast.error(message, options);
        } else {
          toast.error(
            state.id
              ? 'Não foi possível adicionar veículo'
              : 'Não foi possível editar veículo',
            options
          );
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['vehicles']);
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

        <div className="w-full flex gap-6 justify-end">
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
