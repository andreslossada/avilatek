'use client';

import { useState } from 'react';
import { CityInput } from '@/components/flights/CityInput/index';
import { Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ClassInput } from './ClassInput';
import { DateInput } from './DateInput';
import { PassengerCounter } from '../passengers/PassengerCounter';
import { useFlights } from '@/hooks/useFlights';
import type { CitySelectEvent } from '@/types/ui';
import type { Flight } from '@/types/flight';
import { FlightClassOptions } from "./ClassInput/types";
import { FlightCard } from "./FlightCard";

interface FlightSearchData {
    departureCity: string;
    destinationCity: string;
    departureDate?: Date | null;
    returnDate?: Date | null;
    flightClass: 'economy' | 'business' | 'first-class' | 'any-class';
    numberOfTravelers: number;
}

interface SearchResults {
    flights: Flight[];
    isLoading: boolean;
    error: string | null;
    hasSearched: boolean;
}

interface FlightSearchFormProps {
    onFlightSelect: (flight: Flight) => void; // Recibe la función para seleccionar vuelo
}

export function FlightSearchForm({ onFlightSelect }: FlightSearchFormProps) {
    // 🎯 Estado del formulario - toda la data de búsqueda
    const [searchData, setSearchData] = useState<FlightSearchData>({
        departureCity: '',
        destinationCity: '',
        departureDate: null,
        flightClass: 'economy',
        numberOfTravelers: 1,
    });

    // 📊 Estado de los resultados de búsqueda
    const [searchResults, setSearchResults] = useState<SearchResults>({
        flights: [],
        isLoading: false,
        error: null,
        hasSearched: false,
    });

    // 🔌 Hook para obtener vuelos de la API
    const { fetchFlights } = useFlights();

    // 🏙️ Maneja la selección de ciudades desde los CityInput components
    const handleCitySelect = ({ city, type }: CitySelectEvent) => {
        setSearchData(prev => ({
            ...prev,
            // Actualiza dinámicamente la propiedad correcta según el tipo
            [type === 'departure' ? 'departureCity' : 'destinationCity']: city
        }));

        // Limpia errores previos cuando el usuario selecciona una ciudad válida
        if (searchResults.error) {
            setSearchResults(prev => ({ ...prev, error: null }));
        }
    };

    // 📅 Maneja la selección de fecha de salida
    const handleDepartureDateSelect = (date?: Date | undefined) => {
        setSearchData(prev => ({
            ...prev,
            departureDate: date ?? null,
            // Auto-ajuste: si la fecha de regreso es anterior a la de salida, la limpiamos
            returnDate: prev.returnDate && date && prev.returnDate < date ? null : prev.returnDate
        }));
    };

    // 📅 Maneja la selección de fecha de regreso
    const handleReturnDateSelect = (date?: Date | undefined) => {
        setSearchData(prev => ({ ...prev, returnDate: date ?? null }));
    };

    // 👥 Maneja cambios en número de pasajeros
    const handlePassengersChange = (count: number) => {
        setSearchData(prev => ({ ...prev, numberOfTravelers: count }));
    };

    // ✈️ Maneja cambios en clase de vuelo
    const handleFlightClassChange = (flightClass: FlightClassOptions) => {
        setSearchData(prev => ({ ...prev, flightClass }));
    };





    // 🔍 Lógica principal de búsqueda
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // ✅ Validación de campos requeridos
        if (!searchData.departureCity || !searchData.destinationCity) {
            setSearchResults(prev => ({
                ...prev,
                error: 'Please select both departure and destination cities',
            }));
            return;
        }

        if (!searchData.departureDate) {
            setSearchResults(prev => ({
                ...prev,
                error: 'Please select a departure date',
            }));
            return;
        }

        // 🏃‍♂️ Iniciar estado de carga
        setSearchResults(prev => ({
            ...prev,
            isLoading: true,
            error: null,
            hasSearched: true,
        }));

        try {
            // 📡 Fetch todos los vuelos disponibles
            const allFlights = await fetchFlights();

            if (!allFlights || allFlights.length === 0) {
                setSearchResults(prev => ({
                    ...prev,
                    flights: [],
                    isLoading: false,
                    error: 'No flights available at the moment',
                }));
                return;
            }

            // 🔽 Filtrar vuelos según los criterios de búsqueda
            const filteredFlights = allFlights.filter((flight) => {
                // Comparación case-insensitive para ciudades
                const matchesDeparture = flight.departure_city.toLowerCase() === searchData.departureCity.toLowerCase();
                const matchesDestination = flight.destination_city.toLowerCase() === searchData.destinationCity.toLowerCase();

                // TODO: Implementar filtros adicionales
                // const matchesDate = flight.departureDate === searchData.departureDate?.toISOString().split('T')[0];
                // const matchesClass = flight.class_type.toLowerCase() === searchData.flightClass.toLowerCase();

                // Por ahora solo filtramos por ciudad de salida y llegada
                return matchesDeparture && matchesDestination;
            });

            // 📊 Actualizar resultados
            setSearchResults(prev => ({
                ...prev,
                flights: filteredFlights,
                isLoading: false,
                error: filteredFlights.length === 0 ? 'No flights found for your search criteria' : null,
            }));

            // 📤 Notificar al componente padre si existe callback
            // onSearchResults?.(filteredFlights);

            // 🐛 Log para debugging


        } catch (error) {
            // 💥 Manejo de errores
            console.error('Error searching flights:', error);
            setSearchResults(prev => ({
                ...prev,
                flights: [],
                isLoading: false,
                error: 'Failed to search flights. Please try again.',
            }));
        }
    };

    const showAllFlights = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSearchResults(prev => ({
            ...prev,
            isLoading: true,
            error: null,
            hasSearched: true,
        }));

        try {
            const allFlights = await fetchFlights();

            if (allFlights) {
                setSearchResults({
                    flights: allFlights,
                    isLoading: false,
                    error: null,
                    hasSearched: true,
                });
                // onSearchResults?.(allFlights);

            }

        } catch (error) {
            console.error('Error fetching all flights:', error);
            setSearchResults(prev => ({
                ...prev,
                flights: [],
                isLoading: false,
                error: 'Failed to load all flights. Please try again.',
            }));
        }
    }

    // 🚫 Funciones para deshabilitar fechas inválidas
    const disablePastDates = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const disableDepartureDates = (date: Date) => {
        // No permite fechas pasadas
        if (disablePastDates(date)) return true;

        // No permite fechas después del regreso (si está seleccionado)
        if (searchData.returnDate && date > searchData.returnDate) return true;

        return false;
    };

    const disableReturnDates = (date: Date) => {
        // No permite fechas pasadas
        if (disablePastDates(date)) return true;

        // No permite fechas antes de la salida (si está seleccionada)
        if (searchData.departureDate && date < searchData.departureDate) return true;

        return false;
    };

    // 🧮 Estado derivado para validaciones
    const isFormValid = searchData.departureCity &&
        searchData.destinationCity &&
        searchData.departureDate;

    const isSubmitDisabled = !isFormValid || searchResults.isLoading;



    return (
        <div className={cn("w-full ")}>
            <Card className="w-full  shadow-lg">
                <CardContent className="px-6 py-4">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
                    >
                        {/* 🛫 Ciudad de Salida */}
                        <div className="space-y-2 relative">
                            <Label htmlFor="departure-city">From</Label>
                            <CityInput
                                type="departure"
                                value={searchData.departureCity}
                                onCitySelect={handleCitySelect}
                                placeholder="Caracas"
                                className="w-full"
                                required
                            />
                        </div>

                        {/* 🛬 Ciudad de Destino */}
                        <div className="space-y-2 relative">
                            <Label htmlFor="destination-city">To</Label>
                            <CityInput
                                type="destination"
                                value={searchData.destinationCity}
                                onCitySelect={handleCitySelect}
                                placeholder="Brisbane"
                                className="w-full"
                                required
                            />
                        </div>

                        {/* 📅 Fecha de Salida */}
                        <div className="space-y-2">
                            <Label>Departure</Label>
                            <DateInput
                                selectedDate={searchData.departureDate ?? undefined}
                                onDateSelect={handleDepartureDateSelect}
                                placeholderText="When?"
                                disabledPredicate={disableDepartureDates}
                            />
                        </div>

                        {/* 📅 Fecha de Regreso (Opcional) */}
                        <div className="space-y-2">
                            <Label>Return</Label>
                            <DateInput
                                selectedDate={searchData.returnDate ?? undefined}
                                onDateSelect={handleReturnDateSelect}
                                placeholderText="When? (optional)"
                                disabledPredicate={disableReturnDates}
                            />
                        </div>

                        {/* 👥 Pasajeros y Clase */}
                        <div className="space-y-2">
                            <Label>Passengers</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div
                                        className={cn(
                                            'inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm transition-all',
                                            'h-9 py-2 w-full px-4 cursor-pointer',
                                            'border bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground',
                                        )}
                                    >
                                        <Users className="h-4 w-4" />
                                        {searchData.numberOfTravelers} passenger{searchData.numberOfTravelers !== 1 ? 's' : ''}, {' '}
                                        {searchData.flightClass.charAt(0).toUpperCase() + searchData.flightClass.slice(1)}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto py-4 px-4 grid gap-2" align="start">
                                    <PassengerCounter
                                        value={searchData.numberOfTravelers}
                                        onChange={handlePassengersChange}
                                    />
                                    <ClassInput
                                        value={searchData.flightClass}
                                        onChange={handleFlightClassChange}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* 🔍 Botón de Búsqueda */}
                        <div className="grid relative">

                            <Button
                                type="submit"
                                size="default"
                                className="px-8"
                                disabled={isSubmitDisabled}
                            >
                                {searchResults.isLoading ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Search Flights
                                    </>
                                )}
                            </Button>
                            <Button
                                type='submit'
                                variant='link'
                                size='default'
                                className=" absolute right-0 top-12 p-0 m-0 leading-0 text-xs h-auto"
                                onClick={showAllFlights}
                            >
                                All Flights
                            </Button>
                        </div>
                    </form>

                    {searchResults.error && (
                        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                            <p className="text-sm text-destructive">{searchResults.error}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 📊 Mostrar resultados (opcional - puede ser un componente separado) */}
            {searchResults.hasSearched && !searchResults.isLoading && searchResults.flights.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Found {searchResults.flights.length} flight{searchResults.flights.length !== 1 ? 's' : ''}
                    </h3>
                    {/* Aquí renderizarías tu componente de lista de vuelos */}
                    <div className="space-y-2">
                        {searchResults.flights.map((flight) => (
                            <div key={flight.id} className="w-full">
                                <FlightCard flight={flight} onSelect={onFlightSelect} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}