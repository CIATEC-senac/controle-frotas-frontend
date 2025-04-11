import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffixIcon, prefixIcon, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 items-center rounded-md border border-input text-sm ring-offset-background',
          className
        )}
      >
        {prefixIcon && <div className="pl-3">{prefixIcon}</div>}

        <input
          type={type}
          className={cn(
            'w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        {suffixIcon && <div className="pr-3">{suffixIcon}</div>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
