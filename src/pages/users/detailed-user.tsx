import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTitle } from '@/hooks/use-title';
import { API } from '@/lib/api';
import {
  getRegistration,
  getRole,
  getSource,
  maskedCPF,
} from '@/models/user.type';

import { fromISO } from '@/lib/date-parser';
import { Detail } from '../history/partials/history-cards';

export const DetailedUserPage = () => {
  const id = useParams().id;

  const { data, isLoading, error, refetch } = useQuery(['user', id], () =>
    new API().getUser(Number(id))
  );

  useTitle(data?.name ?? 'Usuário detalhado');

  const getChildren = () => {
    if (error) {
      return (
        <FetchError
          message="Não foi possível buscar usuário"
          onClick={refetch}
        />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações de registro</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-3">
              <Detail label="Nome" value={data?.name} />

              <Detail
                label="Matrícula"
                value={getRegistration(data?.registration.toString())}
              />

              <Detail
                label="Data Admissão"
                value={fromISO(data?.admittedAt!, 'DD/MM/YYYY')}
              />

              <Detail label="Cargo" value={getRole(data?.role)} />

              <Detail label="Empresa" value={getSource(data?.source)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações pessoais</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-3">
              <Detail label="CPF" value={maskedCPF(data?.cpf)} />
              <Detail label="CNH" value={data?.cnh} />
              <Detail label="Email" value={data?.email} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return <Layout title="Usuário">{getChildren()}</Layout>;
};
