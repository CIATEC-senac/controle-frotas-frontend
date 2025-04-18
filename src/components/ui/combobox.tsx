'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
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

export type ComboboxOption = { label: string; value: string }[];

export type ComboboxProps = {
  options: ComboboxOption;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
};

export function Combobox({
  options,
  placeholder,
  onChange,
  value,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const onSelect = (value: string): void => {
    onChange(value);
    setOpen(false);
  };

  const valueCn =
    'max-w-[175px] pointer-events-none overflow-hidden overflow-ellipsis flex-[1]';

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <PopoverAnchor>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left flex-nowrap font-normal"
          >
            {value ? (
              <span className={valueCn}>
                {options.find((option) => option.value === value)?.label}
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

      <PopoverContent className="max-w-[225px] p-0 z-50">
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
                      value === option.value ? 'opacity-100' : 'opacity-0'
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
