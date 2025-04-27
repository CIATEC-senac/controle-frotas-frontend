'use client';

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  from: Date;
  to: Date;
  placeholder: string;
  onValueChange: (value: DateRange | undefined) => void;
};

export const DatePickerWithRange = ({
  className,
  from,
  to,
  placeholder,
  onValueChange,
}: DatePickerWithRangeProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from,
    to,
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverAnchor>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y', { locale: pt })} -{' '}
                    {format(date.to, 'LLL dd, y', { locale: pt })}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y', { locale: pt })
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
        </PopoverAnchor>

        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            lang="pt-Br"
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              onValueChange(range);
              setDate(range);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
