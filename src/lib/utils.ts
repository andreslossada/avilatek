import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date | undefined) => {
    if (!date) return 'Select date'
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}


export const stringToDate = (dateString: string): Date | undefined => {
    // Intenta crear un objeto Date a partir de la cadena.
    const date = new Date(dateString);
  
    // Valida si la fecha es válida.
    // new Date() con una cadena no válida a menudo resulta en un objeto Date con un valor NaN.
    if (isNaN(date.getTime())) {
      console.error(`Error: La cadena "${dateString}" no es un formato de fecha válido.`);
      return undefined; // Retorna null si la cadena no se puede convertir a una fecha válida
    }
  
    return date;
  };
