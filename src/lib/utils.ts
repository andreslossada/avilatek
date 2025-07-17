import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | undefined) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export const stringToDate = (dateString: string): Date | undefined => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error(`Error: String "${dateString}" has invalid format.`);
        return undefined; 
    }

    return date;
};
