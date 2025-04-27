import { Bus } from 'lucide-react';
import { useQuery } from 'react-query';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { API } from '@/lib/api';

export const ActiveVehicles = () => {
  const { data } = useQuery({
    queryKey: ['stats-active-vehicles'],
    queryFn: () => new API().getActiveVehiclesStats(),
    refetchOnMount: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center gap-3">
            <span className="text-sm font-medium">Veículos ativos</span>
            <Bus size={16} />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-2xl font-bold">{data?.activeCount} veículos</p>

        <p className="text-xs text-muted-foreground">
          {data?.inactiveCount} veículo(s) sem rota no momento
        </p>
      </CardContent>
    </Card>
  );
};
