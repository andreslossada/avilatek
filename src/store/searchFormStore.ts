import { Flight } from "@/types/types";
import { create } from 'zustand';

// -----------------------------------------------------
// Types
// -----------------------------------------------------

export type FlightClassOptions = 'Economy' | 'Business' | 'First Class' | 'Any Class';

export interface TravelerDetail {
    id: string; 
    fullName: string;
    documentType: string;
    documentNumber: string;
    dateOfBirth?: Date; 
}

//FORM
interface SearchFormState {
    // Información del Viaje --
    destination: string;
    departureDate?: Date; // Puede ser undefined si no se ha seleccionado
    returnDate?: Date; // Puede ser undefined si no se ha seleccionado
    flightClass: FlightClassOptions; // Clase de vuelo
    numberOfTravelers: number;

    // Información de los Viajeros y Opcionales --
    travelerDetails: TravelerDetail[]; // Array para los detalles de cada viajero

    hasPets: boolean;
    numberOfPets: number;
    hasExtraBags: boolean; 
    numberOfExtraBags: number; 
    hasInsurance: boolean;
    hasPreferentialSeating: boolean; 

    availableFlights: Flight[];
    filteredFlights: Flight[];

    hasSearched: boolean;


    // -----------------------------------------------------
    // Actions
    // -----------------------------------------------------
     setHasSearched: (value: boolean) => void;
    setAvailableFlights: (flights: Flight[]) => void;
    setFilteredFlights: (flights: Flight[]) => void;
    
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

    setHasInsurance: (has: boolean) => void;
    setHasPreferentialSeating: (has: boolean) => void;
}

// -----------------------------------------------------
// Create store
// -----------------------------------------------------
export const useSearchFormStore = create<SearchFormState>((set,get) => ({
    // -- Valores iniciales del estado --
    destination: '',
    departureDate: undefined,
    returnDate: undefined,
    flightClass: 'Any Class', // 'Cualquier Clase' como valor inicial por defecto
    numberOfTravelers: 1, 
    travelerDetails: [], // Array vacío inicialmente, se poblará según `numberOfTravelers`

    hasPets: false,
    numberOfPets: 0, 

    hasExtraBags: false,
    numberOfExtraBags: 0, 

    hasInsurance: false, 
    hasPreferentialSeating: false, 

    availableFlights: [],
    filteredFlights: [],

    hasSearched: false,

    setAvailableFlights: (flights) => set({ availableFlights: flights }),
    setFilteredFlights: (flights) => set({ filteredFlights: flights }),
    setHasSearched: (value: boolean) => set({ hasSearched: value }), // ✨ Implementa la nueva acción



    setDestination: (destination) => set({ destination }),
    setDepartureDate: (date) => set({ departureDate: date }),
    setReturnDate: (date) => set({ returnDate: date }),
    setFlightClass: (fc) => set({ flightClass: fc }),
    setHasPreferentialSeating: (has) => set({ hasPreferentialSeating: has }),
    setHasInsurance: (has) => set({ hasInsurance: has }),

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
                        id: `traveler-${i + 1}`, 
                        fullName: '',
                        documentType: '',
                        documentNumber: '',
                        dateOfBirth: undefined,
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

    // PETS
    setHasPets: (has) =>
        set((state) => ({
            hasPets: has,
            numberOfPets: has ? (state.numberOfPets ?? 0) : undefined,
        })),
    setNumberOfPets: (count) => set({ numberOfPets: count }),

    //BAGS
    setHasExtraBags: (has) =>
        set((state) => ({
            hasExtraBags: has,
            numberOfExtraBags: has ? (state.numberOfExtraBags ?? 0) : undefined,
        })),
    setNumberOfExtraBags: (count) => set({ numberOfExtraBags: count }),

}));
