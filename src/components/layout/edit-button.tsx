import React from 'react';
import { PenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const EditButton = React.forwardRef<HTMLButtonElement>((props, ref) => {
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
