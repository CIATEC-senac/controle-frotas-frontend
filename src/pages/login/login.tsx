import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { Eye, EyeClosed, Lock, UserRound } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { format } from '@react-input/mask';
import { AxiosError } from 'axios';

import { TextField } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { API } from '@/lib/api';

import { LoginForm } from './login.types';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<LoginForm>({ cpf: '', password: '' });

  const [isVisible, setVisible] = useState(false);

  // Mutation = alteração de dados
  const { mutate, isLoading } = useMutation(
    (user: LoginForm) => new API().login(user.cpf, user.password),
    {
      onError: (e: any) => {
        // Verifica se erro foi http e não outro erro qualquer
        if (e instanceof AxiosError) {
          // Verifica se a api retornou uma mensagem de erro
          // Usa mensagem do erro como padrão
          toast.error(e.response?.data?.message ?? e.message);
        } else {
          // Mensagem genérica
          toast.error('Não foi possível fazer login');
        }
      },
      onSuccess: (token) => {
        // Salvar token
        localStorage.setItem('token', token);

        toast.success('Logado com sucesso', {
          delay: 1000,
          onClose: () => navigate('/'),
        });
      },
    }
  );

  const onChange = (e: any) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ ...state, cpf: state.cpf.replace(/[.-]/g, '') });
  };

  const PasswordVisibilityIcon = () => {
    const props = {
      onClick: () => setVisible(!isVisible),
      className: 'cursor-pointer',
      size: 18,
    };

    return !isVisible ? <EyeClosed {...props} /> : <Eye {...props} />;
  };

  const maskedCPF = format(state.cpf, {
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

  return (
    <main className="flex flex-col justify-center items-center gap-6 p-6 h-full">
      <form onSubmit={onSubmit}>
        <Card className="bg-primary">
          <CardContent className="flex flex-col gap-4">
            <img
              style={{ margin: '20px auto' }}
              src="/assets/images/logo.png"
              width="150px"
              title="ALFA ID"
            />

            <TextField
              className="text-white w-[300px]"
              name="cpf"
              value={maskedCPF}
              onChange={onChange}
              maxLength={14}
              label="Usuário (CPF)"
              labelProps={{ className: 'text-white' }}
              disabled={isLoading}
              autoComplete="off"
              prefixIcon={<UserRound size={18} />}
            />

            <TextField
              className="text-white w-[300px]"
              name="password"
              value={state.password}
              onChange={onChange}
              label="Senha"
              labelProps={{ className: 'text-white' }}
              type={isVisible ? 'text' : 'password'}
              disabled={isLoading}
              autoComplete="off"
              prefixIcon={<Lock size={18} />}
              suffixIcon={<PasswordVisibilityIcon />}
            />

            <Button
              className="bg-white hover:bg-white text-primary mt-16"
              type="submit"
              disabled={isLoading}
            >
              Entrar
            </Button>
          </CardContent>
        </Card>
      </form>

      <ToastContainer />
    </main>
  );
};
