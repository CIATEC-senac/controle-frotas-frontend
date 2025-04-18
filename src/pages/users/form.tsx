import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';

import { Loading } from '@/components/layout/loading';
import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { maskedAdmittedAt, maskedCPF, User } from '@/models/user.type';
import { API } from '@/lib/api';
import { toastOptions } from '@/lib/toast.options';
import { FormAttr } from '@/types/form';

export const fromModel = (user?: User) => {
  return {
    id: user?.id,
    registration: user?.registration,
    name: user?.name,
    email: user?.email,
    cpf: user?.cpf,
    cnh: user?.cnh,
    admittedAt: user?.admittedAt,
    status: user?.status || true,
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

        const message =
          API.handleError(e) ?? state.id != undefined
            ? 'Não foi possível editar usuário'
            : 'Não foi possível adicionar usuário';

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
    mutate({ ...state, cpf: state.cpf?.replace(/[.-]/g, '') });
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
            id="registry"
            label="Matrícula"
            value={state.registration}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="name"
            label="Nome"
            value={state.name}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="cpf"
            label="CPF"
            value={maskedCPF(state.cpf)}
            maxLength={14}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="email"
            label="E-mail"
            value={state.email}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="cnh"
            label="CNH"
            value={state.cnh}
            maxLength={11}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="admittedAt"
            label="Data Admissão"
            value={maskedAdmittedAt(state.admittedAt)}
            maxLength={10}
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
