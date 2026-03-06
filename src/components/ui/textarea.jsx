import * as React from 'react';
import { cn } from '../../lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'flex min-h-[80px] w-full rounded-md border border-[--portfolio-border] bg-white px-3 py-2 text-sm font-dm-sans',
                'placeholder:text-[--portfolio-text-muted] text-[--portfolio-text]',
                'focus:outline-none focus:ring-2 focus:ring-[--portfolio-accent] focus:ring-offset-1',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'resize-vertical transition-colors duration-200',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };
