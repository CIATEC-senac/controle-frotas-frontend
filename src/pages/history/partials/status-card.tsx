import { RotateCcw } from 'lucide-react';
import React from 'react';

import { useAuth } from '@/auth.context';
import { fromDate } from '@/lib/date-parser';
import { getStatus, History } from '@/models/history.type';
import { UserRole } from '@/models/user.type';

import { ApproveRouteButton } from './approve-route-button';
import { DisapproveRouteButton } from './disapprove-route-button';
import { Detail, SectionCard } from './history-cards';

export const StatusCard = ({ history }: { history: History }) => {
  const { user } = useAuth();

  const getChildren = () => {
    if (history.approval) {
      return (
        <React.Fragment>
          <Detail
            label="Responsável"
            value={history.approval.approvedBy.name}
          />

          <Detail label="Data" value={fromDate(history.approval.date)} />

          {history.approval.observation && (
            <React.Fragment>
              <p className="text-gray-500 text-sm">Observação:</p>
              <p className="text-sm">{history.approval.observation ?? 'N/A'}</p>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }

    if (user?.role === UserRole.MANAGER) {
      return (
        <div className="flex gap-3 mt-6">
          <DisapproveRouteButton id={history.id} />
          <ApproveRouteButton id={history.id} />
        </div>
      );
    }
  };

  return (
    <SectionCard icon={<RotateCcw size={16} />} title="Status">
      <Detail label="Status" value={getStatus(history.approval)} />

      {getChildren()}
    </SectionCard>
  );
};
