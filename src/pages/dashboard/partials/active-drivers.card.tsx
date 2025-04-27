import { User2 } from 'lucide-react';
import { useQuery } from 'react-query';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { API } from '@/lib/api';

export const ActiveDrivers = () => {
  const { data } = useQuery({
    queryKey: ['stats-active-drivers'],
    queryFn: () => new API().getActiveDriversStats(),
    refetchOnMount: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center gap-3">
            <span className="text-sm font-medium">Motoristas ativos</span>
            <User2 size={16} />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-2xl font-bold">{data?.activeCount} motoristas</p>

        <p className="text-xs text-muted-foreground">
          {data?.inactiveCount} motorista(s) sem rota no momento
        </p>
      </CardContent>
    </Card>
  );
};
