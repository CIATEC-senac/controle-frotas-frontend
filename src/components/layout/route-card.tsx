import { ArrowRight, CircleUserRound, Clock, Route } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fromISO } from '@/lib/date-parser';
import { History } from '@/models/history.type';
import { getName, getStreet } from '@/models/route.type';

export const RouteCard = ({ history }: { history: History }) => {
  const Street = ({ path }: { path: string }) => {
    return <span className="text-nowrap">{getStreet(path)}</span>;
  };

  const StartedAt = ({ startedAt }: { startedAt?: string }) => {
    return (
      <div className="flex items-center gap-x-2 text-xs">
        <Clock size={14} />
        <span>{startedAt ? fromISO(startedAt, 'HH:mm') : 'N/A'}</span>
      </div>
    );
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex flex-col gap-3">
        <div className="absolute bg-green-500 h-full top-0 left-0 w-[4px]" />

        <p className="text-sm">{getName(history.route)}</p>

        <div className="flex items-center gap-x-2 text-xs">
          <CircleUserRound size={14} />
          <span>{history.driver?.name}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 text-xs">
          <Route size={14} />
          <Street path={history.route.path?.origin} />
          <ArrowRight size={14} />
          <Street path={history.route.path?.destination} />
        </div>

        <StartedAt startedAt={history.startedAt} />

        <div>
          <Button className="p-0 h-[24px]" variant="link" asChild>
            <Link to={`/route/${history.route.id}/history/${history.id}`}>
              Ver detalhes
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
