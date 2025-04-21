import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getType, Maintenance } from '@/models/maintenance.type';
import { Detail } from '@/pages/history/partials/history-cards';

export const MaintenancesCalendar = ({
  from,
  to,
  maintenances,
}: {
  from: Date;
  to: Date;
  maintenances: Maintenance[];
}) => {
  const [columns, setColumns] = useState<Date[]>([]);

  useEffect(() => {
    const columns: Date[] = [];

    let aux = from;

    while (aux.getTime() < to.getTime()) {
      columns.push(aux);
      aux = dayjs(aux).add(1, 'day').toDate();
    }

    setColumns(columns);
  }, []);

  const maintenancesPerDay = maintenances.reduce(
    (acc: Record<string, Maintenance[]>, maintenance) => {
      const key = dayjs(maintenance.date).format('DD/MM HH');

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(maintenance);

      return acc;
    },
    {}
  );

  const maintenancesPerHour = maintenances.reduce(
    (acc: Record<string, Maintenance[]>, maintenance) => {
      const key = dayjs(maintenance.date).format('HH');

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(maintenance);

      return acc;
    },
    {}
  );

  const MaintenanceCard = ({ hour, day }: { hour: string; day: string }) => {
    const key = `${day} ${hour}`;

    const maintenances = maintenancesPerDay[key];

    if (!maintenances) {
      return null;
    }

    return (
      <Dialog>
        <DialogTrigger>
          <Button size="icon">{maintenances.length}</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogDescription>
            Manutenções agendadas para {day} {hour}h
          </DialogDescription>

          <div className="flex flex-col gap-3 text-sm">
            {maintenances.map((i) => {
              return (
                <div className="flex flex-col gap-3 p-3 not-last:border-b-1">
                  <Detail label="Tipo" value={getType(i.type)} />

                  <Detail label="Descrição" value={i.description} />

                  <Detail
                    label={`Veículos (${i.vehicles.length})`}
                    value={i.vehicles
                      .map((vehicle) => vehicle.plate)
                      .join(', ')}
                  />
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const hours = Object.keys(maintenancesPerHour).sort();

  const emptyRow = () => {
    return Array(8).fill(1);
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {[null, ...columns].map((col) => {
            return (
              <TableHead>
                {col != null ? dayjs(col).format('DD/MM') : ''}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {hours.map((i) => {
          return (
            <TableRow>
              {emptyRow().map((_, index) => {
                return (
                  <TableCell>
                    {index === 0 ? (
                      i + 'h'
                    ) : (
                      <MaintenanceCard
                        hour={i}
                        day={dayjs(columns[index - 1]).format('DD/MM')}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
