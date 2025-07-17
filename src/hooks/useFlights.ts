// hooks/useFlights.ts
import { useState, useEffect } from 'react';
import { Flight } from '@/types/types'; 

interface UseFlightsResult {
    flights: Flight[];
    isLoading: boolean;
    error: string | null;
}

export function useFlights(): UseFlightsResult {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFlights = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json',
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFlights(data as Flight[]);
            } catch (err) {
                console.error('Failed to fetch flights:', err);
                setError('We were unable to load the flights. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFlights();
    }, []);

    return { flights, isLoading, error };
}
