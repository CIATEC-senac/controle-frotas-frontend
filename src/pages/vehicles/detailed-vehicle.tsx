import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { FetchError } from '@/components/layout/fetch-error';
import { getBreadcrumbs, Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTitle } from '@/hooks/use-title';
import { API } from '@/lib/api';
import { fromISO } from '@/lib/date-parser';
import {
  getType as getMaintenanceType,
  Maintenance,
} from '@/models/maintenance.type';
import { getType } from '@/models/vehicle.type';

import { Detail } from '../history/partials/history-cards';

export const DetailedVehiclePage = () => {
  const id = useParams().id;

  const { data, isLoading, error, refetch } = useQuery(['vehicle', id], () =>
    new API().getVehicle(Number(id))
  );

  useTitle(data?.plate ?? 'Veículo detalhado');

  const getMaintenancesTable = (title: string, maintenances: Maintenance[]) => {
    if (!maintenances.length) {
      return null;
    }

    return (
      <div className="space-y-3 relative w-full overflow-x-auto">
        <h3 className="text-sm">{title}</h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descrição</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {maintenances.map((maintenance) => {
              return (
                <TableRow>
                  <TableCell>
                    {fromISO(maintenance.date, 'DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell>{getMaintenanceType(maintenance.type)}</TableCell>
                  <TableCell>{maintenance.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const getChildren = () => {
    if (error) {
      return (
        <FetchError
          message="Não foi possível buscar veículo"
          onClick={refetch}
        />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    const today = dayjs().startOf('day');

    const next =
      data?.maintenances.filter(
        (maintenance) => !today.isAfter(maintenance.date)
      ) ?? [];

    const previous =
      data?.maintenances.filter((maintenance) =>
        today.isAfter(maintenance.date)
      ) ?? [];

    return (
      <div className="grid lg:grid-cols-2 gap-6 w-full overflow-hidden">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Informações do veículo</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3">
                <Detail label="Modelo" value={data?.model} />

                <Detail label="Placa" value={data?.plate} />

                <Detail label="Capacidade" value={data?.capacity.toString()} />

                <Detail label="Tipo" value={getType(data?.type)} />

                <Detail label="Empresa" value={data?.enterprise?.name} />

                <Detail label="Ano" value={data?.year.toString()} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full relative overflow-hidden">
          <Card>
            <CardHeader>
              <CardTitle>Manutenções</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3">
                {!data?.maintenances.length && (
                  <span className="text-sm">Sem manutenções</span>
                )}

                {getMaintenancesTable('Próximas', next)}

                {getMaintenancesTable('Recentes', previous)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const title = [
    { label: 'Veículos', link: '/vehicles' },
    { label: data?.plate ?? '' },
  ];

  return <Layout title={getBreadcrumbs(title)}>{getChildren()}</Layout>;
};
