import { AxiosError } from 'axios';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

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
import { getName, Route } from '@/models/route.type';

type DeleteRouteDialogAttr = {
  route: Route;
};

export const DeleteRouteDialog = ({ route }: DeleteRouteDialogAttr) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (route: Route) => new API().deleteRoute(route),
    {
      onError: (e: any) => {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data?.message ?? e.message);
        } else {
          toast.error('Não foi possível excluir rota');
        }

        setOpen(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['routes']);
        setOpen(false);
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!route.status}
          variant="destructive"
          size="icon"
          children={<Trash2 />}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Excluir Rota</DialogTitle>

          <DialogDescription className="text-left">
            <p className="py-4">
              Deseja mesmo excluir <b>{getName(route)}</b>? Essa ação não pode
              ser desfeita.
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
              onClick={() => mutate(route)}
            >
              Sim
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
