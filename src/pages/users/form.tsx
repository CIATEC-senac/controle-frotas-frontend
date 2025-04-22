import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { FormLoading } from '@/components/layout/form-loading';
import { ResetButton } from '@/components/layout/reset-button';
import { SaveButton } from '@/components/layout/save-button';
import { FormCombobox, FormTextField } from '@/components/layout/textfield';
import { Form } from '@/components/ui/form';
import { API } from '@/lib/api';
import { toISO } from '@/lib/date-parser';
import { toastOptions } from '@/lib/toast.options';
import {
  maskedAdmittedAt,
  maskedCPF,
  roleOptions,
  sourceOptions,
  User,
} from '@/models/user.type';
import { FormAttr } from '@/types/form';

import { toZod, userSchema } from './form.validation';

export const UserForm = ({ data, onSuccess, onFailure }: FormAttr<User>) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (user: User) => new API().updateUser(user),
    {
      onError: (e: any) => {
        const options = toastOptions({ onClose: onFailure });

        const message = API.handleError(
          e,
          data?.id != undefined
            ? 'Não foi possível editar usuário'
            : 'Não foi possível adicionar usuário'
        );

        toast.error(message, options);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);

        toast.success(
          data?.id != undefined
            ? 'Usuário editado com sucesso'
            : 'Usuário adicionado com sucesso',
          toastOptions()
        );

        onSuccess();
      },
    }
  );

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    mutate({
      ...values,
      id: Number(values.id) || undefined,
      registration: values.registration,
      role: Number(values.role),
      cpf: values.cpf?.replace(/[.-]/g, ''),
      admittedAt: toISO(values.admittedAt),
      source: Number(values.source),
    } as User);
  };

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: toZod(data),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={onSuccess}>
        <FormLoading loading={isLoading} />

        <div className="space-y-6">
          <div className="space-y-6">
            <FormTextField
              control={form.control}
              name="registration"
              label="Matrícula"
              disabled={isLoading}
            />

            <FormTextField
              control={form.control}
              name="name"
              label="Nome"
              maxLength={50}
              disabled={isLoading}
            />

            <FormTextField
              control={form.control}
              name="cpf"
              label="CPF"
              placeholder="000.000.000-00"
              maxLength={14}
              mask={maskedCPF}
              disabled={isLoading}
            />

            <FormTextField
              control={form.control}
              name="email"
              label="Email"
              placeholder="usuario@alfaid.com.br"
              maxLength={30}
              disabled={isLoading}
            />

            <FormTextField
              control={form.control}
              name="cnh"
              label="CNH"
              placeholder="00000000000"
              maxLength={11}
              disabled={isLoading}
            />

            <FormTextField
              control={form.control}
              name="admittedAt"
              label="Data Admissão"
              placeholder="01/01/2025"
              mask={maskedAdmittedAt}
              maxLength={10}
              disabled={isLoading}
            />

            <FormCombobox
              control={form.control}
              name="role"
              label="Cargo"
              placeholder="Seleciona o cargo..."
              options={roleOptions}
              disabled={isLoading}
            />

            <FormCombobox
              control={form.control}
              name="source"
              label="Tipo"
              placeholder="Seleciona o tipo..."
              options={sourceOptions}
              disabled={isLoading}
            />
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
