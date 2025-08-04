// src/types/hooks.ts
import { Flight } from './flight'; // Asume que Flight está en otro archivo de tipos
import { FlightSearchParams } from './search'; // Asume que FlightSearchParams está en otro archivo

export interface UseFlightsResult {
    isLoading: boolean;
    error: string | null;
    fetchFlights: (params?: FlightSearchParams) => Promise<Flight[] | undefined>;
}
