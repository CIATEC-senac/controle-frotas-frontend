import { MapPinned } from 'lucide-react';
import { useQuery } from 'react-query';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { API } from '@/lib/api';

export const ElapsedDistance = () => {
  const { data } = useQuery({
    queryKey: ['stats-elapsed-distance'],
    queryFn: () => new API().getElapsedDistanceStats(),
    refetchOnMount: true,
  });

  const diff = data?.diff ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center gap-3">
            <span className="text-sm font-medium">Distância percorrida</span>
            <MapPinned size={16} />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-2xl font-bold">
          {Number(data?.total).toLocaleString('pt-Br')} Km
        </p>

        <p className="text-xs text-muted-foreground">
          {diff > 0
            ? `${diff}% acima do mês passado`
            : `${diff}% abaixo do mês passado`}
        </p>
      </CardContent>
    </Card>
  );
};
