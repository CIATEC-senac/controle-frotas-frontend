import { Trash2 } from 'lucide-react';

import {
  FormTextField,
  FormTextFieldAttr,
} from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';

type RouteStopAttr = FormTextFieldAttr & {
  onDelete?: VoidFunction;
};

export const RouteStop = ({ onDelete, ...props }: RouteStopAttr) => {
  return (
    <div className="flex justify-between gap-3">
      <FormTextField placeholder="Digite a parada..." {...props} />

      <Button
        className="text-red-500 hover:text-red-500"
        size="icon"
        variant="ghost"
        onClick={onDelete}
        children={<Trash2 />}
      />
    </div>
  );
};
