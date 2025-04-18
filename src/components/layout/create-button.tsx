import { Plus } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const CreateButton = React.forwardRef<
  HTMLButtonElement,
  { title: string }
>(({ title, ...props }, ref) => {
  return (
    <Button className="h-[40px]" {...props} ref={ref}>
      <Plus />
      {title}
    </Button>
  );
});
