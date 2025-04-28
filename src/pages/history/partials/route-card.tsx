import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Pin } from 'lucide-react';
dayjs.extend(duration);

import { fromDate } from '@/lib/date-parser';
import { History } from '@/models/history.type';
import { Detail, SectionCard } from './history-cards';

export const RouteCard = ({ history }: { history: History }) => {
  const estimatedDistance = (history.route.estimatedDistance! / 1000.0).toFixed(
    2
  );

  const elapsedDistance = (
    history.odometerFinal - history.odometerInitial
  ).toFixed(2);

  const estimatedDuration = Math.ceil(
    dayjs.duration(history.route.estimatedDuration!, 'seconds').asMinutes()
  );

  const elapsedDuration = Math.ceil(
    Math.abs(dayjs(history.startedAt).diff(history.endedAt, 'minutes'))
  );

  return (
    <SectionCard icon={<Pin size={16} />} title="Rota">
      <Detail label="Origem" value={history.route.path.origin.toUpperCase()} />

      <Detail
        label="Destino"
        value={history.route.path.destination.toUpperCase()}
      />

      <Detail label="Partida" value={fromDate(history.startedAt)} />

      <Detail label="Chegada" value={fromDate(history.endedAt)} />

      <Detail label="Duração prevista" value={estimatedDuration + ' minutos'} />

      <Detail label="Duração executada" value={elapsedDuration + ' minutos'} />

      <Detail label="Distância prevista" value={estimatedDistance + ' Km'} />

      <Detail label="Distância percorrida" value={elapsedDistance + ' Km'} />
    </SectionCard>
  );
};
