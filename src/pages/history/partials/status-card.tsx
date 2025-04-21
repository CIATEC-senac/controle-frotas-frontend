import { RotateCcw } from 'lucide-react';
import React from 'react';

import { fromDate } from '@/lib/date-parser';
import { getStatus, HistoryApproval } from '@/models/history.type';
import { Detail, SectionCard } from './history-cards';

export const StatusCard = ({ approval }: { approval?: HistoryApproval }) => {
  return (
    <SectionCard icon={<RotateCcw size={16} />} title="Status">
      <Detail label="Status" value={getStatus(approval)} />

      {approval && (
        <React.Fragment>
          <Detail label="Responsável" value={approval.approvedBy.name} />

          <Detail label="Data" value={fromDate(approval.date)} />

          {approval.observation && (
            <React.Fragment>
              <p className="text-gray-500 text-sm">Observação:</p>
              <p className="text-sm">{approval.observation ?? 'N/A'}</p>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </SectionCard>
  );
};
