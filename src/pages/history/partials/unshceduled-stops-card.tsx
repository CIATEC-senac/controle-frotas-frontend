import { TriangleAlert } from 'lucide-react';

import { History } from '@/models/history';
import { SectionCard } from './history-cards';

export const UnshceduledStopsCard = ({ history }: { history: History }) => {
  return (
    <SectionCard
      icon={<TriangleAlert size={16} />}
      title="Paradas não programadas"
    >
      <p className="text-sm">Interrupções registradas durante o percurso</p>
    </SectionCard>
  );
};
