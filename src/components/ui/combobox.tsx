'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type ComboboxOption = { label: string; value: string }[];

export type ComboboxProps = {
  options: ComboboxOption;
  placeholder: string;
  onChange: (value: string) => void;
  value: string | string[];
  multiple?: boolean;
};

export function Combobox({
  options,
  placeholder,
  onChange,
  value,
  multiple,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const onSelect = (value: string): void => {
    onChange(value);
    !multiple && setOpen(false);
  };

  const valueCn =
    'max-w-[300px] pointer-events-none overflow-hidden overflow-ellipsis flex-[1]';

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <PopoverAnchor>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left flex-nowrap font-normal"
          >
            {value ? (
              <span className={valueCn}>
                {options
                  .filter(
                    (option) =>
                      (Array.isArray(value) &&
                        value.indexOf(option.value) != -1) ||
                      option.value === value
                  )
                  .map((option) => option.label)
                  .join(', ')}
              </span>
            ) : (
              <span className={valueCn} style={{ color: '#a9a9ac' }}>
                {placeholder}
              </span>
            )}

            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverAnchor>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0 z-50"
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={onSelect}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      (Array.isArray(value) &&
                        value.indexOf(option.value) != -1) ||
                        value === option.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
