import { Flight } from '@/types/types';
import { create } from 'zustand';

// Types

export type FlightClassOptions = 'Economy' | 'Business' | 'First Class' | 'Any Class';

export interface TravelerDetail {
    id: string;
    fullName: string;
    documentType: string;
    documentNumber: string;
    dateOfBirth: Date | undefined;
}

//FORM
interface SearchFormState {

    destination: string;
    departureDate?: Date; 
    returnDate?: Date; 
    flightClass: FlightClassOptions; 
    numberOfTravelers: number;

    travelerDetails: TravelerDetail[]; 

    hasPets: boolean;
    numberOfPets: number;
    hasExtraBags: boolean;
    numberOfExtraBags: number;
    hasInsurance: boolean;
    hasPreferentialSeating: boolean;
    hasSpecialNeeds: boolean;
    specialAssistanceDescription: string;
    dateOfBirth?: Date;
    // -----------------------------------------------------
    availableFlights: Flight[];
    filteredFlights: Flight[];

    hasSearched: boolean;

    isLoading: boolean;
    error: string | null;

    // Actions

    setHasSearched: (value: boolean) => void;
    setAvailableFlights: (flights: Flight[]) => void;
    setFilteredFlights: (flights: Flight[]) => void;

    setDestination: (destination: string) => void;
    setDepartureDate: (date?: Date) => void;
    setReturnDate: (date?: Date) => void;
    setFlightClass: (flightClass: FlightClassOptions) => void;
    setNumberOfTravelers: (count: number) => void;
    setTravelerDetails: (details: TravelerDetail[]) => void;
    setHasSpecialNeeds: (has: boolean) => void;
    setSpecialAssistanceDescription: (description: string) => void;
    setDateOfBirth: (date?: Date) => void;

    setHasPets: (has: boolean) => void;
    setNumberOfPets: (count?: number) => void;

    setHasExtraBags: (has: boolean) => void;
    setNumberOfExtraBags: (count?: number) => void;

    setHasInsurance: (has: boolean) => void;
    setHasPreferentialSeating: (has: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

// Create store
export const useSearchFormStore = create<SearchFormState>((set, get) => ({
    destination: '',
    departureDate: undefined,
    returnDate: undefined,
    flightClass: 'Any Class',
    numberOfTravelers: 1,
    travelerDetails: [], 

    hasPets: false,
    numberOfPets: 0,

    hasExtraBags: false,
    numberOfExtraBags: 0,

    hasInsurance: false,
    hasPreferentialSeating: false,
    hasSpecialNeeds: false,
    specialAssistanceDescription: '',
    dateOfBirth: undefined,

    availableFlights: [],
    filteredFlights: [],

    hasSearched: false,
    isLoading: false,
    error: null,

    setAvailableFlights: (flights) => set({ availableFlights: flights }),
    setFilteredFlights: (flights) => set({ filteredFlights: flights }),
    setHasSearched: (value: boolean) => set({ hasSearched: value }), 

    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),

    setDestination: (destination) => set({ destination }),
    setDepartureDate: (date) => set({ departureDate: date }),
    setReturnDate: (date) => set({ returnDate: date }),
    setFlightClass: (fc) => set({ flightClass: fc }),
    setHasPreferentialSeating: (has) => set({ hasPreferentialSeating: has }),
    setHasInsurance: (has) => set({ hasInsurance: has }),
    setHasSpecialNeeds: (hasNeeds) => set({ hasSpecialNeeds: hasNeeds }),
    setSpecialAssistanceDescription: (description) => set({ specialAssistanceDescription: description }),
    setDateOfBirth: (date) => set({ dateOfBirth: date }),


    setNumberOfTravelers: (count) => {

        const newCount = Math.max(1, Math.min(10, count));
        set((state) => {

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
