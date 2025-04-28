import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { ReactNode } from 'react';
dayjs.extend(duration);

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { History } from '@/models/history.type';

import { DriverCard } from './driver-card';
import { ScheduledRouteCard } from './scheduled-route-card';
import { StatusCard } from './status-card';
import { TrackingCard } from './tracking-card';
import { UnplannedStopsCard } from './unplanned-stops-card';
import { VehicleCard } from './vehicle-card';

export const Detail = ({ label, value }: { label: string; value?: string }) => {
  return (
    <p className="flex flex-[1] gap-3 justify-between">
      <span className="text-gray-500 text-sm min-w-[150px]">{label}:</span>
      <span className="text-sm text-right">{value ?? 'N/A'}</span>
    </p>
  );
};

type SectionCardAttr = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
};

export const SectionCard = ({
  icon,
  title,
  children,
  className,
}: SectionCardAttr) => {
  return (
    <div className={cn(className)}>
      <Card className="rounded-sm h-full">
        <CardContent className="space-y-2">
          <h3 className="flex gap-3 items-center text-left">
            {icon}
            {title}
          </h3>

          <div className="space-y-2">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export const HistoryCards = ({ history }: { history: History }) => {
  return (
    <React.Fragment>
      <DriverCard driver={history.driver} />

      <VehicleCard history={history} />

      <ScheduledRouteCard history={history} />

      {history.track.length >= 2 ? <TrackingCard history={history} /> : null}

      <UnplannedStopsCard history={history} />

      <StatusCard history={history} />
    </React.Fragment>
  );
};
