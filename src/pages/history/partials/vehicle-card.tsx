import { Bus } from 'lucide-react';

import { History } from '@/models/history.type';
import { getType } from '@/models/vehicle.type';

import { Detail, SectionCard } from './history-cards';

export const Tag = ({ text }: { text: string }) => {
  return <span className="bg-gray-300 rounded px-2 py-1 text-xs">{text}</span>;
};

export const VehicleCard = ({ history }: { history: History }) => {
  const odometerInitial = history.odometerInitial
    ? history.odometerInitial.toString() + ' Km'
    : undefined;

  const odometerFinal = history.odometerFinal
    ? history.odometerFinal.toString() + ' Km'
    : undefined;

  const OdometerImg = ({ src, alt }: { src?: string; alt: string }) => {
    if (!src) {
      return <span className="text-sm">Sem imagem</span>;
    }

    return <img width={100} src={src} alt={alt} />;
  };

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
        <Detail label="Odômetro inicial" value={odometerInitial} />

        <OdometerImg src={history.imgOdometerInitial} alt="Odômetro inicial" />
      </div>

      <div className="space-y-2">
        <Detail label="Odômetro final" value={odometerFinal} />

        <OdometerImg src={history.imgOdometerFinal} alt="Odômetro final" />
      </div>
    </SectionCard>
  );
};
