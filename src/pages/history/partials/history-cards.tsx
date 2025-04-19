import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { ReactNode } from 'react';
dayjs.extend(duration);

import { Card, CardContent } from '@/components/ui/card';
import { History } from '@/models/history';

import { DriverCard } from './driver-card';
import { ScheduledRouteCard } from './scheduled-route-card';
import { StatusCard } from './status-card';
import { UnshceduledStopsCard } from './unshceduled-stops-card';
import { VehicleCard } from './vehicle-card';

export const Detail = ({ label, value }: { label: string; value?: string }) => {
  return (
    <p className="flex gap-3 justify-between">
      <span className="text-gray-500 text-sm">{label}:</span>
      <span className="text-sm">{value ?? 'N/A'}</span>
    </p>
  );
};

export const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) => {
  return (
    <Card className="rounded-sm">
      <CardContent className="space-y-2">
        <h3 className="flex gap-3 items-center text-left">
          {icon}
          {title}
        </h3>

        <div className="space-y-2">{children}</div>
      </CardContent>
    </Card>
  );
};

export const HistoryCards = ({ history }: { history: History }) => {
  return (
    <React.Fragment>
      <DriverCard driver={history.driver} />

      <VehicleCard history={history} />

      <div className="col-span-2">
        <ScheduledRouteCard history={history} />
      </div>

      <UnshceduledStopsCard history={history} />

      <StatusCard approval={history.approval} />
    </React.Fragment>
  );
};
