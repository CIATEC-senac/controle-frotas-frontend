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
import { User } from '@/models/user.type';

export const DeleteUserDialog = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (user: User) => new API().deleteUser(user),
    {
      onError: (e: any) => {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data?.message ?? e.message);
        } else {
          toast.error('Não foi possível excluir usuário');
        }

        setOpen(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        setOpen(false);
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" children={<Trash2 />} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Excluir Usuário</DialogTitle>

          <DialogDescription className="text-left">
            <p className="py-4">
              Deseja mesmo excluir <b>{user.name}</b>? Essa ação não pode ser
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
              onClick={() => mutate(user)}
            >
              Sim
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
