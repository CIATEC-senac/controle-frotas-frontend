import { Check } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { API } from '@/lib/api';
import { toastOptions } from '@/lib/toast.options';
import { HistoryApprovalStatus } from '@/models/history.type';

export const ApproveRouteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    () => new API().updateHistoryStatus(id, HistoryApprovalStatus.APPROVED),
    {
      onError: (e: any) => {
        const message = API.handleError(e, 'Não foi possível aprovar rota');
        toast.error(message, toastOptions());
      },
      onSettled() {
        queryClient.invalidateQueries(`history-${id}`);
      },
    }
  );

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex-[1] text-green-500 hover:text-green-500"
      onClick={() => mutate()}
    >
      <Check />
      Aprovar
    </Button>
  );
};
