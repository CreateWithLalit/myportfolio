import * as React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-[rgba(73,136,196,0.1)] text-[--portfolio-accent]',
        outline: 'border border-[--portfolio-border] text-[--portfolio-text]',
        secondary: 'bg-[--portfolio-alt-bg] text-[--portfolio-text-muted]',
    };
    return (
        <span
            ref={ref}
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
                variants[variant] || variants.default,
                className
            )}
            {...props}
        />
    );
});
Badge.displayName = 'Badge';

export { Badge };
