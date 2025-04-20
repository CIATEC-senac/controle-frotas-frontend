import { ReactNode } from 'react';

import { Combobox, ComboboxProps } from '@/components/ui/combobox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
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

export const TextField = (props: TextFieldAtrr) => {
  let { label, labelProps, containerProps, ...rest } = props;

  if (!containerProps) containerProps = {};
  if (!containerProps.className) containerProps.className = '';

  containerProps.className = cn(containerProps.className, 'grid gap-2');

  return (
    <div {...containerProps}>
      {label != null ? <Label {...labelProps}>{label}</Label> : null}
      <Input {...rest} />
    </div>
  );
};

type FormAttr = {
  label?: string;
  name: string;
  description?: string;
  control: any;
  disabled?: boolean;
};

export type FormTextFieldAttr = Omit<InputProps, 'label'> &
  FormAttr & { mask?: (data: string) => string };

export const FormTextField = (props: FormTextFieldAttr) => {
  const { label, name, disabled, control, description, mask, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        const masked =
          mask != null ? mask((field.value as string) ?? '') : field.value;

        return (
          <FormItem className="flex-[1]">
            {label && <FormLabel children={label} />}
            <FormControl
              children={<Input {...rest} {...field} value={masked} />}
            />
            {description && <FormDescription children={description} />}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export type FormComboboxAttr = Omit<ComboboxProps, 'onChange' | 'value'> &
  FormAttr;

export const FormCombobox = (props: FormComboboxAttr) => {
  const { label, name, disabled, control, description, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel children={label} />
          <FormControl children={<Combobox {...field} {...rest} />} />
          {description && <FormDescription children={description} />}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
