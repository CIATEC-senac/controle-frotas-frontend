import { PenLine } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const EditButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>((props, ref) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      {...props}
      ref={ref}
      children={<PenLine />}
    />
  );
});
