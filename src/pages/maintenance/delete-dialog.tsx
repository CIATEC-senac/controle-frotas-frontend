import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { DeleteButton } from '@/components/layout/delete-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { API } from '@/lib/api';
import { getType, Maintenance } from '@/models/maintenance.type';

export const DeleteMaintenanceDialog = ({
  maintenance,
}: {
  maintenance: Maintenance;
}) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (maintenance: Maintenance) => new API().deleteMaintenance(maintenance),
    {
      onError: (e: any) => {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data?.message ?? e.message);
        } else {
          toast.error('Não foi possível excluir manutenção');
        }

        setOpen(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['maintenances']);
        setOpen(false);
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DeleteButton />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Excluir Usuário</DialogTitle>

          <DialogDescription className="text-left">
            <p className="py-4">
              Deseja mesmo excluir manutenção{' '}
              {getType(maintenance.type).toLowerCase()}? Essa ação não pode ser
              desfeita.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="w-full flex gap-6 justify-end">
            <DialogClose asChild>
              <Button variant="ghost" size="sm" disabled={isLoading}>
                Não
              </Button>
            </DialogClose>

            <Button
              className="text-primary"
              variant="ghost"
              size="sm"
              disabled={isLoading}
              onClick={() => mutate(maintenance)}
            >
              Sim
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
