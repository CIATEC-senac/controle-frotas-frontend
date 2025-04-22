import { useQuery } from 'react-query';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { API } from '@/lib/api';

export const MostRecentHistories = () => {
  const { data } = useQuery({
    queryKey: ['stats-recent-histories'],
    queryFn: () => new API().getRecentHistoriesStats(),
    refetchOnMount: true,
  });

  return (
    <Card className="col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Rotas executadas recentemente</CardTitle>
        <CardDescription>
          {data?.length} rota(s) executadas hoje
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Motoritsta</TableHead>
              <TableHead>Rota</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Distância percorrida</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{data.driver}</TableCell>
                  <TableCell>{data.route}</TableCell>
                  <TableCell>{data.duration} minutos</TableCell>
                  <TableCell>
                    {Number(data.distance).toLocaleString('pt-Br')} Km
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
