import { Clock, MapPin, Plus } from 'lucide-react';
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
import { Route } from '@/models/route.type';
import { FormAttr } from '@/types/form';

import { RouteStop } from './stop';

export const fromModel = (route?: Route) => {
  return {
    id: route?.id,
    driver: route?.driver,
    vehicle: route?.vehicle,
    path: route?.path || {
      origin: '',
      destination: '',
      stops: [''],
    },
    startAt: route?.startAt,
  } as Route;
};

export const RouteForm = ({ data, onSuccess, onFailure }: FormAttr<Route>) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(data);

  const { data: drivers } = useQuery(['drivers'], () =>
    new API().getUsers().then((users) => users.filter((i) => i.role == 2))
  );

  const { data: vehicles } = useQuery(['vehicles'], () =>
    new API().getVehicles()
  );

  const { mutate, isLoading } = useMutation(
    (route: Route) => new API().updateRoute(route),
    {
      onError: (e: any) => {
        const options = toastOptions({ onClose: onFailure });

        const message = API.handleError(
          e,
          state.id != undefined
            ? 'Não foi possível editar rota'
            : 'Não foi possível adicionar rota'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['routes']);

        toast.success(
          state.id != undefined
            ? 'Rota editada com sucesso'
            : 'Rota adicionada com sucesso',
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
    updateData(e.target.id as keyof Route, e.target.value);
  };

  const updateData = (key: keyof Route, value: any) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const addStop = () =>
    setState((state) => ({
      ...state,
      path: { ...state.path, stops: [...state.path.stops, ''] },
    }));

  const deleteStop = (index: number) =>
    setState((state) => {
      const stops = [...state.path.stops];
      stops.splice(index, 1);

      return { ...state, path: { ...state.path, stops } };
    });

  const editStop = (stop: string, index: number) =>
    setState((state) => {
      const stops = [...state.path.stops];
      stops[index] = stop;

      return { ...state, path: { ...state.path, stops } };
    });

  const driversOptions = (drivers || []).map((i) => ({
    label: i.name,
    value: i.id.toString(),
  }));

  const vehiclesOptions = (vehicles || []).map((i) => ({
    label: i.plate,
    value: i.id.toString(),
  }));

  const updatePath =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setState((state) => ({
        ...state,
        path: { ...state.path, [key]: e.target.value },
      }));

  return (
    <form onSubmit={onSubmit}>
      <Loading className="mb-6" loading={isLoading} />

      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <div className="grid gap-2 flex-[1]">
              <Label>Veículo</Label>

              <Combobox
                onChange={(id) => updateData('vehicle', { id: Number(id) })}
                placeholder="Seleciona o veículo..."
                value={state.vehicle?.id?.toString() ?? ''}
                options={vehiclesOptions}
              />
            </div>

            <div className="grid gap-2 flex-[1]">
              <Label>Motorista</Label>

              <Combobox
                onChange={(id) => updateData('driver', { id: Number(id) })}
                placeholder="Seleciona o motorista..."
                value={state.driver?.id?.toString() ?? ''}
                options={driversOptions}
              />
            </div>
          </div>

          <TextField
            label="Horário de Partida"
            prefixIcon={<Clock size={16} />}
            id="startAt"
            onChange={onChange}
            value={state.startAt}
            placeholder="Digite a hora"
            disabled={isLoading}
          />

          <TextField
            label="Origem"
            prefixIcon={<MapPin size={16} />}
            onChange={updatePath('origin')}
            value={state.path.origin}
            placeholder="Digite o endereço de origem"
            disabled={isLoading}
          />

          <TextField
            label="Destino"
            prefixIcon={<MapPin size={16} />}
            onChange={updatePath('destination')}
            value={state.path.destination}
            placeholder="Digite o endereço de destino"
            disabled={isLoading}
          />

          <div className="space-y-6">
            <div className="flex justify-between">
              <h3>Paradas</h3>

              <Button variant="ghost" onClick={addStop} disabled={isLoading}>
                <Plus size={16} /> Adicionar Parada
              </Button>
            </div>

            <div className="space-y-3">
              {state.path.stops.map((stop, index) => (
                <RouteStop
                  key={index}
                  value={stop}
                  disabled={isLoading}
                  onChange={(e) => editStop(e.target.value, index)}
                  onDelete={isLoading ? undefined : () => deleteStop(index)}
                />
              ))}
            </div>
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
