import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
dayjs.extend(duration);

import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { API } from '@/lib/api';
import { HistoryCards } from './partials/history-cards';

export const DetailedHistoryPage = () => {
  const id = useParams().historyId;

  const { data, isLoading, error, refetch } = useQuery(['history', id], () =>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HistoryCards history={data!} />
      </div>
    );
  };

  return <Layout title="Histórico">{getChildren()}</Layout>;
};
