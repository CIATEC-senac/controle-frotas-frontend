import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { DataTable } from '@/components/layout/data-table';
import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { API } from '@/lib/api';
import { getName } from '@/models/route.type';
import { columns } from './partials/history-details';

export const HistoryPage = () => {
  const id = useParams().id;

  const {
    data: history,
    isLoading,
    error,
    refetch,
  } = useQuery(['route-history', id], () =>
    new API().getRouteHistory(Number(id))
  );

  const route = history?.at(0)?.route;

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

    return (
      <DataTable
        columns={columns}
        data={history || []}
        empty="Nenhum resultado encontrado"
      />
    );
  };

  return (
    <Layout title="Histórico">
      <div className="space-y-6">
        <h3>{route && getName(route)}</h3>

        {getChildren()}
      </div>
    </Layout>
  );
};
