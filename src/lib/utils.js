import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes without conflicts.
 * Usage: cn('base-class', condition && 'conditional-class', className)
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
