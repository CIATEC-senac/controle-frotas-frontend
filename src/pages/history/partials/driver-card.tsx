import { User2 } from 'lucide-react';

import { User } from '@/models/user.type';
import { Detail } from '@/pages/routes/partials/route-details';
import { SectionCard } from './history-cards';

export const DriverCard = ({ driver }: { driver: User }) => {
  return (
    <SectionCard icon={<User2 size={16} />} title="Motorista">
      <div className="space-y-2">
        <p className="text-sm">{driver.name}</p>
        <p className="text-sm">CNH: {driver.cnh}</p>
      </div>

      <div className="space-y-2">
        <Detail label="CPF" value={driver.cpf.toString()} />

        <Detail label="Email" value={driver.email} />
      </div>
    </SectionCard>
  );
};
