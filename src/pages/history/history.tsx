import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { FetchError } from '@/components/layout/fetch-error';
import { getBreadcrumbs, Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { useTitle } from '@/hooks/use-title';
import { API } from '@/lib/api';
import { getName } from '@/models/route.type';

import { HistoryTable } from './partials/history-table';

export const HistoryPage = () => {
  useTitle('Histórico');
  const id = useParams().id;

  const {
    data: histories,
    isLoading,
    error,
    refetch,
  } = useQuery(['route-history', id], () =>
    new API().getRouteHistory(Number(id))
  );

  const route = histories?.at(0)?.route;

  const getChildren = () => {
    if (error) {
      return (
        <FetchError
          message="Não foi possível listar histórico"
          onClick={refetch}
        />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    return <HistoryTable histories={histories ?? []} />;
  };

  const title = [
    { label: 'Rotas', link: '/routes' },
    { label: (route && getName(route)) || '', link: `/routes/${route?.id}` },
    { label: 'Histórico' },
  ];

  return (
    <Layout title={getBreadcrumbs(title)}>
      <div className="space-y-6">{getChildren()}</div>
    </Layout>
  );
};
