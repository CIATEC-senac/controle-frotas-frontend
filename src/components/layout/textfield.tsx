import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as LabelPrimitive from '@radix-ui/react-label';
import { ReactNode } from 'react';

type TextFieldAtrr = React.ComponentProps<'input'> & {
  label?: string;
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root>;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
};

export const TextField = ({ label, labelProps, ...props }: TextFieldAtrr) => {
  return (
    <div className="flex flex-col gap-2">
      {label != null ? <Label {...labelProps}>{label}</Label> : null}
      <Input {...props} />
    </div>
  );
};
