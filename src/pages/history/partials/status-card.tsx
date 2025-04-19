import dayjs from 'dayjs';
import { RotateCcw } from 'lucide-react';
import React from 'react';

import { getStatus, HistoryApproval } from '@/models/history';
import { Detail, SectionCard } from './history-cards';

export const StatusCard = ({ approval }: { approval?: HistoryApproval }) => {
  return (
    <SectionCard icon={<RotateCcw size={16} />} title="Status">
      <Detail label="Status" value={getStatus(approval)} />

      {approval && (
        <React.Fragment>
          <Detail label="Aprovada por" value={approval.approvedBy.name} />

          <Detail
            label="Aprovada em"
            value={dayjs(approval.date).format('DD/MM/YYYY HH:mm:ss')}
          />
        </React.Fragment>
      )}
    </SectionCard>
  );
};
