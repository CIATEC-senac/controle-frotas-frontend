import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { FormLoading } from '@/components/layout/form-loading';
import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { API } from '@/lib/api';
import { fromISO, toISO } from '@/lib/date-parser';
import { toastOptions } from '@/lib/toast.options';
import {
  Maintenance,
  maintenanceTypeOptions,
  maskedMaintenanceDate,
} from '@/models/maintenance.type';
import { Vehicle } from '@/models/vehicle.type';
import { FormAttr } from '@/types/form';

export const fromModel = (maintenance?: Maintenance) => {
  return {
    id: maintenance?.id,
    date: maintenance?.date
      ? fromISO(maintenance?.date, 'DD/MM/YYYY HH:mm')
      : '',
    description: maintenance?.description,
    vehicles: maintenance?.vehicles || [],
    type: maintenance?.type ?? 0,
  } as Maintenance;
};

export const MaintenanceForm = ({
  data,
  onSuccess,
  onFailure,
}: FormAttr<Maintenance>) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(data);

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
          state.id != undefined
            ? 'Não foi possível editar manutenção'
            : 'Não foi possível adicionar manutenção'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['maintenances']);

        toast.success(
          state.id != undefined
            ? 'Manutenção editada com sucesso'
            : 'Manutenção adicionada com sucesso',
          toastOptions()
        );

        onSuccess();
      },
    }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      ...state,
      date: toISO(state.date),
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateData(e.target.id as keyof Maintenance, e.target.value);

  const updateData = (key: keyof Maintenance, value: any) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const vehiclesOptions = (vehicles || []).map((vehicle) => ({
    label: vehicle.plate,
    value: vehicle.id.toString(),
  }));

  const toggleVehicle = (id: number) => {
    setState((state) => {
      const vehicles = [...state.vehicles];

      const index = vehicles.findIndex((vehicle) => vehicle.id === id);

      if (index != -1) {
        vehicles.splice(index, 1);
      } else {
        vehicles.push({ id } as Vehicle);
      }

      return { ...state, vehicles };
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormLoading loading={isLoading} />

      <div className="space-y-6">
        <div className="space-y-6">
          <TextField
            onChange={onChange}
            id="date"
            label="Data"
            placeholder="01/01/2025 12:00"
            value={maskedMaintenanceDate(state.date)}
            disabled={isLoading}
            required
          />

          <div className="grid gap-2">
            <Label>Descrição</Label>

            <Textarea
              className="max-h-[100px]"
              onChange={(e) => updateData('description', e.target.value)}
              value={state.description}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label>Tipo</Label>

            <Combobox
              onChange={(id) => updateData('type', Number(id))}
              placeholder="Seleciona o tipo..."
              value={state.type.toString() ?? ''}
              options={maintenanceTypeOptions}
            />
          </div>

          <div className="grid gap-2">
            <Label>Veículos</Label>

            <Combobox
              onChange={(id) => toggleVehicle(Number(id))}
              placeholder="Seleciona o(s) veículo(s)..."
              value={state.vehicles.map(({ id }) => id.toString()) ?? ''}
              options={vehiclesOptions}
              multiple
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
