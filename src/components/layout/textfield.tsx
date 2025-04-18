import { ReactNode } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';

export type TextFieldAtrr = React.ComponentProps<'input'> & {
  label?: string;
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root>;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

export const TextField = ({
  label,
  labelProps,
  containerProps,
  ...props
}: TextFieldAtrr) => {
  if (!containerProps) containerProps = {};
  if (!containerProps.className) containerProps.className = '';

  containerProps.className = cn(containerProps.className, 'grid gap-2');

  return (
    <div {...containerProps}>
      {label != null ? <Label {...labelProps}>{label}</Label> : null}
      <Input {...props} />
    </div>
  );
};
