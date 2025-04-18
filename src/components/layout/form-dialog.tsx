import { JSX, ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const FormDialog = ({
  title,
  open,
  onOpenChange,
  trigger,
  children,
}: {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: JSX.Element;
  children: ReactNode;
}) => {
  const newLocal = <DialogTrigger asChild>{trigger}</DialogTrigger>;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {newLocal}

      <DialogContent className="max-h-[100%] overflow-auto h-full min-w-full rounded-none md:h-auto md:min-w-auto md:rounded-lg">
        <DialogHeader>
          <DialogTitle children={title} />
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
