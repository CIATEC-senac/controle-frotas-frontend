import { Search } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/layout/data-table';
import { TextField } from '@/components/layout/textfield';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { normalizeString } from '@/lib/normalize';
import { History, HistoryApprovalStatus } from '@/models/history.type';

import { filter } from './filter';
import { columns } from './history-details';

export const HistoryTable = ({ histories }: { histories: History[] }) => {
  const [search, setSearch] = useState('');
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

  const filtered = getFiltered();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3 place-content-between">
        <TextField
          containerProps={{ className: 'w-[500px] max-w-[100%]' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefixIcon={<Search size={16} />}
          placeholder="Busque por rota, motorista, veículo ou responsável..."
        />

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
                  children={status.label}
                />
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={filtered.filter(filter(normalizeString(search)))}
        columns={columns}
        empty="Não há registros"
      />
    </div>
  );
};
