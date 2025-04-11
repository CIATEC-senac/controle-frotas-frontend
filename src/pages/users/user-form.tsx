import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { format } from '@react-input/mask';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { User } from '@/models/user.type';
import { API } from '@/lib/api';

export const fromModel = (user?: User) => {
  return {
    id: user?.id,
    registry: user?.registry,
    name: user?.name,
    email: user?.email,
    cpf: user?.cpf,
    cnh: user?.cnh,
    admittedAt: user?.admittedAt,
    status: user?.status,
  } as User;
};

type UserFormAttr = {
  user: User;
  onSuccess: VoidFunction;
  onFailure: VoidFunction;
};

export const UserForm = ({ user, onSuccess, onFailure }: UserFormAttr) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(user);

  const { mutate, isLoading } = useMutation(
    (user: User) => new API().updateUser(user),
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
              ? 'Não foi possível adicionar usuário'
              : 'Não foi possível editar usuário',
            options
          );
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        onSuccess();
      },
    }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ ...state, status: true });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const maskedCPF = format(state.cpf, {
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

  const maskedAdmittedAt = format(
    state.admittedAt ? dayjs(state.admittedAt).format('DDMMYYYY') : '',
    {
      mask: '__/__/____',
      replacement: { _: /\d/ },
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
          <TextField
            onChange={onChange}
            id="registry"
            label="Matrícula"
            value={state.registry}
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
            value={maskedCPF}
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
            value={maskedAdmittedAt}
            maxLength={10}
            disabled={isLoading}
          />
        </div>

        <div className="w-full flex gap-6 justify-end">
          <Button disabled={isLoading} variant="secondary">
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
