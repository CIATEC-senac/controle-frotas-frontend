import { useState } from 'react';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';

import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { User } from '@/models/user.type';
import { API } from '@/lib/api';
import { DialogClose } from '@/components/ui/dialog';

export const fromModel = (user?: User) => {
  return {
    id: user?.id,
    registry: user?.registry,
    name: user?.name,
    email: user?.email,
    cpf: user?.cpf,
    cnh: user?.cnh,
    admittedAt:
      user?.admittedAt != undefined && dayjs(user?.admittedAt).isValid()
        ? dayjs(user?.admittedAt).format('DD/MM/YYYY')
        : undefined,
    status: user?.status,
  } as User;
};

export const UsersForm = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState(user);

  const { mutate, isLoading } = useMutation(
    (user: User) => new API().updateUser(user),
    {
      onError: (e: any) => {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data?.message ?? e.message);
        } else {
          toast.error(
            state.id
              ? 'Não foi possível adicionar usuário'
              : 'Não foi possível editar usuário'
          );
        }

        console.error(e);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
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
            value={state.cpf}
            maxLength={11}
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
            maxLength={8}
            disabled={isLoading}
          />

          <TextField
            onChange={onChange}
            id="admittedAt"
            label="Data Admissão"
            value={state.admittedAt}
            maxLength={10}
            disabled={isLoading}
          />
        </div>

        <div className="w-full flex gap-6 justify-end">
          <DialogClose asChild>
            <Button disabled={isLoading} variant="secondary">
              Cancelar
            </Button>
          </DialogClose>

          <Button disabled={isLoading} type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
};
