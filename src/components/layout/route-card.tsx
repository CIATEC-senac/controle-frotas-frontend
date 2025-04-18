import { ArrowRight, CircleUserRound, Map } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Route } from '@/models/route.type';

export const RouteCard = ({ route }: { route: Route }) => {
  const getStreet = (path: string) =>
    path.split('-').at(0)?.trim().toUpperCase();

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm">#{route.id}</p>

        <div className="flex items-center gap-x-2 text-xs">
          <CircleUserRound size={14} />
          <span>{route.driver?.name}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 text-xs">
          <Map size={14} />
          <span className="text-nowrap">{getStreet(route.path.origin)}</span>
          <ArrowRight size={14} />
          <span className="text-nowrap">
            {getStreet(route.path.destination)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
