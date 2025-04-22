import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import { API } from '@/lib/api';

import { Calendar } from 'lucide-react';
import { FetchError } from './fetch-error';
import { MaintenancesCalendar } from './maintenances-calendar';
import { SkeletonGrid } from './skeleton-grid';

export const ScheduledMaintenances = () => {
  const from = dayjs().startOf('week');
  const to = from.add(6, 'days').endOf('day');

  const { data, isLoading, isRefetching, error, refetch } = useQuery(
    ['schedules-maintenances'],
    () => new API().getMaintenances(from.toDate(), to.toDate()),
    {
      refetchOnMount: true,
    }
  );

  const getChildren = () => {
    if (error) {
      // em caso de erro, tentar novamente
      return (
        <FetchError
          message="Não foi possível listar manutenções"
          onClick={refetch}
        />
      );
    }

    if (isLoading || isRefetching) {
      // se está carregando então exibe skeletons
      return (
        <div className="grid grid-cols-7 gap-6">
          <SkeletonGrid length={7} />
        </div>
      );
    }

    return (
      <MaintenancesCalendar
        maintenances={data!}
        from={from.toDate()}
        to={to.toDate()}
      />
    );
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-3 items-center">
        <Calendar size={16} />
        <h3>Manutenções da semana</h3>
      </div>

      {getChildren()}
    </div>
  );
};
