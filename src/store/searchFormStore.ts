// src/store/searchFormStore.ts

import { create } from 'zustand';

// -----------------------------------------------------
// 1. Tipos de datos para el estado del formulario
// -----------------------------------------------------

export type FlightClassOptions = 'Economy' | 'Business' | 'First Class' | 'Any Class';

export interface TravelerDetail {
    id: string; // Un ID único para identificar a cada viajero
    fullName: string;
    documentType: string;
    documentNumber: string;
    dateOfBirth?: Date; // Fecha de nacimiento (opcional)
}

// Interfaz que define la forma completa del estado de tu store
interface SearchFormState {
    // -- Paso 1: Información del Viaje --
    destination: string;
    departureDate?: Date; // Puede ser undefined si no se ha seleccionado
    returnDate?: Date; // Puede ser undefined si no se ha seleccionado
    flightClass: FlightClassOptions; // Clase de vuelo
    numberOfTravelers: number;

    // -- Paso 2: Información de los Viajeros y Opcionales --
    travelerDetails: TravelerDetail[]; // Array para los detalles de cada viajero

    hasPets: boolean; // ¿Viaja con mascotas?
    numberOfPets?: number; // Cantidad de mascotas (opcional, si hasPets es true)

    hasExtraBags: boolean; // ¿Necesita maletas extra?
    numberOfExtraBags?: number; // Cantidad de maletas extra (opcional, si hasExtraBags es true)

    // -----------------------------------------------------
    // 2. Acciones para modificar el estado (funciones setter)
    // -----------------------------------------------------
    setDestination: (destination: string) => void;
    setDepartureDate: (date?: Date) => void;
    setReturnDate: (date?: Date) => void;
    setFlightClass: (flightClass: FlightClassOptions) => void;
    setNumberOfTravelers: (count: number) => void;
    setTravelerDetails: (details: TravelerDetail[]) => void;

    setHasPets: (has: boolean) => void;
    setNumberOfPets: (count?: number) => void;

    setHasExtraBags: (has: boolean) => void;
    setNumberOfExtraBags: (count?: number) => void;
}

// -----------------------------------------------------
// 3. Creación de la store de Zustand
// -----------------------------------------------------
export const useSearchFormStore = create<SearchFormState>((set) => ({
    // -- Valores iniciales del estado --
    destination: '',
    departureDate: undefined,
    returnDate: undefined,
    flightClass: 'Any Class', // 'Cualquier Clase' como valor inicial por defecto
    numberOfTravelers: 1, // Mínimo 1 viajero
    travelerDetails: [], // Array vacío inicialmente, se poblará según `numberOfTravelers`

    hasPets: false,
    numberOfPets: undefined, // undefined por defecto si no hay mascotas

    hasExtraBags: false,
    numberOfExtraBags: undefined, // undefined por defecto si no hay maletas extra

    // -- Implementación de las acciones --
    setDestination: (destination) => set({ destination }),
    setDepartureDate: (date) => set({ departureDate: date }),
    setReturnDate: (date) => set({ returnDate: date }),
    setFlightClass: (fc) => set({ flightClass: fc }),

    setNumberOfTravelers: (count) => {
        // Asegura que el número de viajeros esté entre 1 y 10 (o los límites que necesites)
        const newCount = Math.max(1, Math.min(10, count));
        set((state) => {
            // Ajusta el array travelerDetails:
            // Si se reduce el número, corta el array.
            // Si se aumenta, añade nuevos objetos de viajero con valores por defecto.
            const updatedTravelerDetails = Array.from({ length: newCount }, (_, i) => {
                return (
                    state.travelerDetails[i] || {
                        id: `traveler-${i + 1}`, // Un ID simple (puedes usar una UUID real para mayor robustez)
                        fullName: '',
                        documentType: '',
                        documentNumber: '',
                        dateOfBirth: undefined, // Asegúrate de que la fecha de nacimiento se inicialice también
                    }
                );
            });
            return {
                numberOfTravelers: newCount,
                travelerDetails: updatedTravelerDetails,
            };
        });
    },

    setTravelerDetails: (details) => set({ travelerDetails: details }),

    // ✨ Acciones para mascotas
    setHasPets: (has) =>
        set((state) => ({
            hasPets: has,
            // Si 'has' es false, reinicia numberOfPets a undefined.
            // Si 'has' es true, mantiene el valor actual o lo establece en 0 si es undefined.
            numberOfPets: has ? (state.numberOfPets ?? 0) : undefined,
        })),
    setNumberOfPets: (count) => set({ numberOfPets: count }),

    // ✨ Acciones para maletas extra
    setHasExtraBags: (has) =>
        set((state) => ({
            hasExtraBags: has,
            // Similar a mascotas, si 'has' es false, reinicia numberOfExtraBags a undefined.
            // Si 'has' es true, mantiene el valor actual o lo establece en 0 si es undefined.
            numberOfExtraBags: has ? (state.numberOfExtraBags ?? 0) : undefined,
        })),
    setNumberOfExtraBags: (count) => set({ numberOfExtraBags: count }),
}));
