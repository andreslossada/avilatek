import { useState, useRef, useCallback } from 'react';
import { useFlights } from '@/hooks/useFlights';
import type { CityInputType, CitySelectEvent } from '@/types/ui';

interface UseCitySearchProps {
    type: CityInputType;
    onCitySelect?: (event: CitySelectEvent) => void;
}

export function useCitySearch({ type, onCitySelect }: UseCitySearchProps) {
    const debounceTimeout = 400;
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState<string[]>([]);

    const { fetchFlights } = useFlights();

    const searchCities = useCallback(
        async (value: string) => {
            if (!value.trim()) {
                setCities([]);
                return;
            }

            setIsSearching(true);

            try {
                const flights = await fetchFlights();
                if (!flights) return;

                const filteredFlights = flights.filter((flight) => {
                    const cityToCheck =
                        type === 'departure' ? flight.departure_city : flight.destination_city;
                    return cityToCheck.toLowerCase().includes(value.toLowerCase());
                });

                const matchCities = filteredFlights.map((flight) =>
                    type === 'departure' ? flight.departure_city : flight.destination_city,
                );

                const uniqueCities = [...new Set(matchCities)];
                setCities(uniqueCities);
                setIsOpen(true);
            } catch (error) {
                console.error(`Error fetching ${type} cities:`, error);
                setCities([]);
            } finally {
                setIsSearching(false);
            }
        },
        [fetchFlights, type],
    );

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value);

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                searchCities(value);
            }, debounceTimeout);
        },
        [searchCities],
    );

    const handleCitySelect = useCallback(
        (city: string) => {
            setSelectedCity(city);
            setSearchTerm(city);
            setIsOpen(false);
            onCitySelect?.({ city, type });
        },
        [onCitySelect, type],
    );

    const resetSelection = useCallback(() => {
        setSelectedCity('');
        setSearchTerm('');
        setCities([]);
    }, []);

    return {
        isOpen,
        setIsOpen,
        isSearching,
        searchTerm,
        selectedCity,
        cities,
        handleSearchChange,
        handleCitySelect,
        resetSelection,
    };
}
