import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { FetchError } from '@/components/layout/fetch-error';
import { getBreadcrumbs, Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { useTitle } from '@/hooks/use-title';
import { API } from '@/lib/api';
import { getName } from '@/models/route.type';

import { HistoryCards } from './partials/history-cards';

export const DetailedHistoryPage = () => {
  useTitle('Histórico detalhado');

  const id = useParams().historyId;

  const { data, isLoading, error, refetch } = useQuery([`history-${id}`], () =>
    new API().getHistory(Number(id))
  );

  const getChildren = () => {
    if (error) {
      return (
        <FetchError
          message="Não foi possível buscar histórico"
          onClick={refetch}
        />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
        <HistoryCards history={data!} />
      </div>
    );
  };

  const title = [
    { label: 'Rotas', link: '/routes' },
    {
      label: (data && getName(data?.route)) || '',
      link: `/routes/${data?.route.id}`,
    },
    { label: 'Histórico', link: `/routes/${data?.route.id}/history` },
    { label: data?.id.toString() ?? '' },
  ];

  return <Layout title={getBreadcrumbs(title)}>{getChildren()}</Layout>;
};
