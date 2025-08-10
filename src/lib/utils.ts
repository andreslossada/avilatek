import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | undefined): string | undefined {
    if (!date) {
        return undefined;
    }

    // ✨ Verificamos si la variable ya es un objeto Date
    const dateObject = typeof date === 'string' ? new Date(date) : date;

    // ✨ Comprobamos si la conversión a Date fue exitosa
    if (isNaN(dateObject.getTime())) {
        console.error('Invalid date provided to formatDate:', date);
        return 'Invalid Date';
    }

    // `dd MMM yyyy` format (e.g., 09 Aug 2025)
    return format(dateObject, 'dd MMM yyyy');
}

export const stringToDate = (dateString: string): Date | undefined => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error(`Error: String "${dateString}" has invalid format.`);
        return undefined;
    }

    return date;
};

export function calculateAge(birthDate: Date | undefined): number | null   {
    if (birthDate === undefined) {
        return null; 
      }
    const today: Date = new Date();
    const dob: Date = new Date(birthDate);
  
    let age: number = today.getFullYear() - dob.getFullYear();
    const monthDiff: number = today.getMonth() - dob.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    return age;
  }

  export function calculateFlightDuration(departure: string, arrival: string) {
      const departureDate = new Date(departure);
      const arrivalDate = new Date(arrival);

      if (isNaN(departureDate.getTime()) || isNaN(arrivalDate.getTime())) {
          return 'Invalid date';
      }

      const duration = new Date(arrivalDate.getTime() - departureDate.getTime());
      const hours = duration.getUTCHours();
      const minutes = duration.getUTCMinutes();

      return `${hours}h ${minutes}m`;
  }

  export function formatFlightTime(date: string): string {
      const flightDate = new Date(date);
      if (isNaN(flightDate.getTime())) {
          return 'Invalid time';
      }
      return flightDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
