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
