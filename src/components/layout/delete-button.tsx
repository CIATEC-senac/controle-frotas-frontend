import { Trash2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const DeleteButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>((props, ref) => {
  return (
    <Button
      className="text-red-500"
      variant="ghost"
      size="icon"
      {...props}
      ref={ref}
      children={<Trash2 />}
    />
  );
});
