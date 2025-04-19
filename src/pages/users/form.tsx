import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { FormLoading } from '@/components/layout/form-loading';
import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { API } from '@/lib/api';
import { fromISO, toISO } from '@/lib/date-parser';
import { toastOptions } from '@/lib/toast.options';
import {
  maskedAdmittedAt,
  maskedCPF,
  roleOptions,
  User,
} from '@/models/user.type';
import { FormAttr } from '@/types/form';

export const fromModel = (user?: User) => {
  return {
    id: user?.id,
    registration: user?.registration,
    name: user?.name,
    email: user?.email,
    cpf: user?.cpf,
    cnh: user?.cnh,
    admittedAt: user?.admittedAt ? fromISO(user?.admittedAt, 'DD/MM/YYYY') : '',
    status: user?.status ?? true,
    role: user?.role ?? 2,
  } as User;
};

export const UserForm = ({ data, onSuccess, onFailure }: FormAttr<User>) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(data);

  const { mutate, isLoading } = useMutation(
    (user: User) => new API().updateUser(user),
    {
      onError: (e: any) => {
        const options = toastOptions({ onClose: onFailure });

        const message = API.handleError(
          e,
          state.id != undefined
            ? 'Não foi possível editar usuário'
            : 'Não foi possível adicionar usuário'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);

        toast.success(
          state.id != undefined
            ? 'Usuário editado com sucesso'
            : 'Usuário adicionado com sucesso',
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
      cpf: state.cpf?.replace(/[.-]/g, ''),
      admittedAt: toISO(state.admittedAt, 'DD/MM/YYYY'),
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateData(e.target.id as keyof User, e.target.value);

  const updateData = (key: keyof User, value: any) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <FormLoading loading={isLoading} />

      <div className="space-y-6">
        <div className="space-y-6">
          <TextField
            onChange={onChange}
            id="registration"
            label="Matrícula"
            value={state.registration}
            disabled={isLoading}
            required
          />

          <TextField
            onChange={onChange}
            id="name"
            label="Nome"
            value={state.name}
            disabled={isLoading}
            required
          />

          <TextField
            onChange={onChange}
            id="cpf"
            label="CPF"
            value={maskedCPF(state.cpf)}
            maxLength={14}
            disabled={isLoading}
            required
          />

          <TextField
            onChange={onChange}
            id="email"
            label="E-mail"
            value={state.email}
            disabled={isLoading}
            required
          />

          <TextField
            onChange={onChange}
            id="cnh"
            label="CNH"
            value={state.cnh}
            maxLength={11}
            disabled={isLoading}
            required
          />

          <TextField
            onChange={onChange}
            id="admittedAt"
            label="Data Admissão"
            value={maskedAdmittedAt(state.admittedAt)}
            maxLength={10}
            disabled={isLoading}
            required
          />

          <div className="grid gap-2">
            <Label>Cargo</Label>

            <Combobox
              onChange={(id) => updateData('role', Number(id))}
              placeholder="Seleciona o cargo..."
              value={state.role.toString() ?? ''}
              options={roleOptions}
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
