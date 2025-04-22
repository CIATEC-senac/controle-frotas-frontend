import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router';

import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { API } from '@/lib/api';
import { fromISO } from '@/lib/date-parser';
import { HistoryApprovalStatus } from '@/models/history.type';
import { getStreet } from '@/models/route.type';

export const ManagerRoutesPage = () => {
  const {
    data: histories,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: 'histories',
    queryFn: () => new API().getHistories(),
    refetchOnMount: true,
  });

  const [status, setStatus] = useState<HistoryApprovalStatus>();

  const chooseStatus = (status: string) => {
    switch (status) {
      case HistoryApprovalStatus.APPROVED.toString():
        setStatus(HistoryApprovalStatus.APPROVED);
        break;
      case HistoryApprovalStatus.DISAPPROVED.toString():
        setStatus(HistoryApprovalStatus.DISAPPROVED);
        break;
      default:
        setStatus(HistoryApprovalStatus.PENDING);
        break;
    }
  };

  const statuses = [
    {
      label: 'Pendentes',
      value: HistoryApprovalStatus.PENDING,
    },
    {
      label: 'Aprovadas',
      value: HistoryApprovalStatus.APPROVED,
    },
    {
      label: 'Reprovadas',
      value: HistoryApprovalStatus.DISAPPROVED,
    },
  ];

  const getFiltered = () => {
    switch (status) {
      case HistoryApprovalStatus.APPROVED:
      case HistoryApprovalStatus.DISAPPROVED:
        return histories?.filter(
          (history) => history.approval?.status === status
        );

      default:
        return histories?.filter((history) => history.approval === null);
    }
  };

  const getChildren = () => {
    if (isLoading || isRefetching) {
      return <LoadingMessage />;
    }

    if (error) {
      // em caso de erro, tentar novamente
      return (
        <FetchError message="Não foi possível listar rotas" onClick={refetch} />
      );
    }

    const filtered = getFiltered();

    return (
      <div className="border-1 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Origem / Destino</TableHead>
              <TableHead>Motorista</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered?.map((history) => {
              return (
                <TableRow key={history.id}>
                  <TableCell>
                    {fromISO(history.startedAt, 'DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex gap-3 items-center">
                        <MapPin size={14} />
                        {getStreet(history.route.path.origin)}
                      </span>

                      <span className="flex gap-3 items-center">
                        <MapPin size={14} />
                        {getStreet(history.route.path.destination)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>{history.driver.name}</TableCell>
                  <TableCell>{history.vehicle.plate}</TableCell>
                  <TableCell>
                    {history.approval?.approvedBy.name ?? 'Pendente'}
                  </TableCell>

                  <TableCell>
                    <Button variant="link" size="sm" asChild>
                      <Link
                        to={`/route/${history.route.id}/history/${history.id}`}
                      >
                        Detalhes
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}

            {!filtered?.length && (
              <TableRow>
                <TableCell className="text-center p-6" colSpan={6}>
                  Não há registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Layout title="Rotas">
      <div className="space-y-3">
        <div className="flex justify-end">
          <Select
            defaultValue={HistoryApprovalStatus.PENDING.toString()}
            onValueChange={chooseStatus}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue
                className="shadow-none"
                placeholder="Selecione o status..."
              />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {statuses.map((status) => (
                  <SelectItem
                    key={status.value.toString()}
                    value={status.value.toString()}
                  >
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {getChildren()}
      </div>
    </Layout>
  );
};
