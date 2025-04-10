import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User } from '@/models/user.type';
import { fromModel, UsersForm } from '@/pages/users/user-form';

export const UserFormDialog = ({
  user,
  title,
  children,
}: {
  user: User;
  title: string;
  children: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[100%] overflow-auto h-full min-w-full rounded-none md:h-auto md:min-w-auto md:rounded-lg">
        <DialogHeader>
          <DialogTitle children={title} />
        </DialogHeader>

        <UsersForm user={fromModel(user)} />
      </DialogContent>
    </Dialog>
  );
};
