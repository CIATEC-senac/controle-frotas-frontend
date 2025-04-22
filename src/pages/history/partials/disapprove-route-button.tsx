import { X } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { API } from '@/lib/api';
import { toastOptions } from '@/lib/toast.options';
import { HistoryApprovalStatus } from '@/models/history.type';

export const DisapproveRouteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [observation, setObservation] = useState('');

  const { mutate, isLoading } = useMutation(
    () =>
      new API().updateHistoryStatus(
        id,
        HistoryApprovalStatus.DISAPPROVED,
        observation
      ),
    {
      onError: (e: any) => {
        const message = API.handleError(e, 'Não foi possível reprovar rota');
        toast.error(message, toastOptions());
      },
      onSuccess: () => {
        setOpen(false);
      },
      onSettled() {
        queryClient.invalidateQueries(`history-${id}`);
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={(open) => !isLoading && setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex-[1]  text-red-500 hover:text-red-500"
        >
          <X />
          Reprovar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reprovar rota</DialogTitle>

          <Textarea
            disabled={isLoading}
            onChange={(e) => setObservation(e.target.value)}
            value={observation}
            className="shadow-none border-t-0 border-l-0 border-r-0 border-b-2 rounded-none h-[96px] max-h-[96px]"
            placeholder="Por favor, insira uma observação explicando o motivo da reprovação"
          />
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="ghost" size="sm">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            disabled={isLoading || !observation.length}
            variant="ghost"
            size="sm"
            onClick={() => mutate()}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
