import { Bus } from 'lucide-react';

import { History } from '@/models/history.type';
import { getType } from '@/models/vehicle.type';
import { Detail, SectionCard } from './history-cards';

export const Tag = ({ text }: { text: string }) => {
  return <span className="bg-gray-300 rounded px-2 py-1 text-xs">{text}</span>;
};

export const VehicleCard = ({ history }: { history: History }) => {
  return (
    <SectionCard icon={<Bus size={16} />} title="Veículo">
      <div className="space-y-2">
        <p className="text-sm">{history.vehicle.model}</p>
        <p className="text-sm">CNH: {history.driver.cnh}</p>

        <div className="flex gap-3">
          <Tag text={history.vehicle.plate} />
          <Tag text={getType(history.vehicle.type)} />
        </div>
      </div>

      <div className="space-y-2">
        <Detail
          label="Odômetro inicial"
          value={history.odometerInitial.toString() + ' Km'}
        />

        <Detail
          label="Odômetro final"
          value={history.odometerFinal.toString() + ' Km'}
        />
      </div>
    </SectionCard>
  );
};
