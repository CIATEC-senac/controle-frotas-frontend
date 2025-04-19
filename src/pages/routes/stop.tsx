import { Trash2 } from 'lucide-react';

import { TextField, TextFieldAtrr } from '@/components/layout/textfield';
import { Button } from '@/components/ui/button';

export const RouteStop = ({
  onDelete,
  ...props
}: TextFieldAtrr & { onDelete?: VoidFunction }) => {
  return (
    <div className="flex justify-between gap-3">
      <TextField
        containerProps={{ style: { flex: 1 } }}
        placeholder="Digite a parada..."
        {...props}
      />

      <Button
        className="text-red-500 hover:text-red-500"
        size="icon"
        variant="ghost"
        onClick={onDelete}
      >
        <Trash2 />
      </Button>
    </div>
  );
};
