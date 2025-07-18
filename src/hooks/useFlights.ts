import { useState, useCallback } from 'react';
import { Flight, FlightSearchParams, UseFlightsResult } from '@/types/types';
import { FETCH_DELAY, FLIGHT_API_URL } from '@/lib/constants';
import { useSearchFormStore } from '@/store/searchFormStore';

export function useFlights(): UseFlightsResult {
    const { isLoading, setIsLoading } = useSearchFormStore();
    const [error, setError] = useState<string | null>(null);

    const setAvailableFlights = useSearchFormStore((state) => state.setAvailableFlights);

    const fetchFlights = useCallback(
        async (params?: FlightSearchParams) => {
            setIsLoading(true);

            setError(null);

            try {
                await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY));

                const response = await fetch(FLIGHT_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAvailableFlights(data as Flight[]);
            } catch (err) {
                console.error('Failed to fetch flights:', err);
                setError('We were unable to load the flights. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        },
        [setAvailableFlights, setIsLoading],
    );

    return { isLoading, error, fetchFlights };
}
