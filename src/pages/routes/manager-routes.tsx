import { useQuery } from 'react-query';

import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { API } from '@/lib/api';

import { HistoryTable } from '../history/partials/history-table';

export const ManagerRoutesPage = () => {
  const {
    data: histories,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: 'histories',
    queryFn: () => new API().getHistories(),
    refetchOnMount: true,
  });

  const getChildren = () => {
    if (isLoading || isRefetching) {
      return <LoadingMessage />;
    }

    if (error) {
      // em caso de erro, tentar novamente
      return (
        <FetchError message="Não foi possível listar rotas" onClick={refetch} />
      );
    }

    return <HistoryTable histories={histories ?? []} />;
  };

  return (
    <Layout title="Histórico de Rotas">
      <div className="space-y-3">{getChildren()}</div>
    </Layout>
  );
};
