import * as React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'flex h-10 w-full rounded-md border border-[--portfolio-border] bg-white px-3 py-2 text-sm font-dm-sans',
                'placeholder:text-[--portfolio-text-muted] text-[--portfolio-text]',
                'focus:outline-none focus:ring-2 focus:ring-[--portfolio-accent] focus:ring-offset-1',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'transition-colors duration-200',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = 'Input';

export { Input };
