import dayjs from 'dayjs';
import { TriangleAlert } from 'lucide-react';

import { getUnplannedStopType, History } from '@/models/history.type';
import { SectionCard } from './history-cards';

// @ts-ignore
export const UnshceduledStopsCard = ({ history }: { history: History }) => {
  return (
    <SectionCard
      icon={<TriangleAlert size={16} />}
      title="Paradas não programadas"
    >
      <p className="text-sm">Interrupções registradas durante o percurso</p>

      <div className="grid gap-1.5">
        {history.unplannedStops.map((unplannedStop) => (
          <p className="text-sm">
            {getUnplannedStopType(unplannedStop.type)} às{' '}
            {dayjs(unplannedStop.date).format('HH:mm:ss')}
          </p>
        ))}
      </div>
    </SectionCard>
  );
};
