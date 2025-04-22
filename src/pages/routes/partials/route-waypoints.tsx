import { LucideWaypoints } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { Button } from '@/components/ui/button';
import React from 'react';
import { Detail } from './route-details';

export const RouteWaypoints = ({ waypoints }: { waypoints: string[] }) => {
  const MAX_ITEMS = 1;

  if (!waypoints.length) {
    return null;
  }

  const getWaypoint = (waypoint: string) => {
    return <Detail value={waypoint.toUpperCase()} />;
  };

  return (
    <Collapsible>
      <div className="flex justify-between gap-[10px] items-center">
        <h3 className="flex gap-[10px] items-center text-gray-600 text-sm">
          <LucideWaypoints size={14} /> Paradas ({waypoints.length}):
        </h3>

        {waypoints.length > MAX_ITEMS && (
          <CollapsibleTrigger asChild>
            <Button variant="link" className="p-0" size="sm">
              Ver mais
            </Button>
          </CollapsibleTrigger>
        )}
      </div>

      <div className="flex relative flex-col gap-[10px] pl-6 pt-2 pb-2">
        <div
          className="border-l-1 absolute left-[7px] top-[50%] translate-y-[-50%]"
          style={{ height: 'calc(100% - 10px)' }}
        />

        {waypoints.slice(0, MAX_ITEMS).map(getWaypoint)}

        <CollapsibleContent asChild>
          <React.Fragment>
            {waypoints.slice(MAX_ITEMS, waypoints.length).map(getWaypoint)}
          </React.Fragment>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
