import { Map } from 'lucide-react';
import { useQuery } from 'react-query';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { API } from '@/lib/api';

export const OnGoingRoutes = () => {
  const { data } = useQuery({
    queryKey: ['stats-ongoing-routes'],
    queryFn: () => new API().getOnGoingRoutesStats(),
    refetchOnMount: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center gap-3">
            <span className="text-sm font-medium">Rotas em andamento</span>
            <Map size={16} />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-2xl font-bold">{data?.count ?? 0} rotas</p>

        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
};
