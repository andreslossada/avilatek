'use client';
import { useState } from 'react';
import { FlightSearchForm } from '../components/FlightSearch';
import { Flight, SearchFormData } from '@/types/types';
import { FlightCard } from '../components/FlightCard';
import { FlightDetailsSheet } from '@/components/FlightDetailsSheet';
import { useFlights } from '../hooks/useFlights';

export default function Home() {
    const { flights: allFlights, isLoading, error } = useFlights();

    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);
    const [showAllActive, setShowAllActive] = useState<boolean>(false);

    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

    const handleSearchSubmit = (formData: SearchFormData) => {
        setSearchParams(formData);
        if (allFlights.length > 0) {
            const results = allFlights.filter((flight) => {
                const destinationMatch = flight.destination
                    .toLowerCase()
                    .includes(formData.destination.toLowerCase());

                // for this example we will assume there are infinite dates available
                // const departureDateMatch = flight.departureDate.toLowerCase().includes(formData.departureDate.toLowerCase())
                // const returnDateMatch = flight.returnDate.toLowerCase().includes(formData.returnDate.toLowerCase())

                //match true when both classes are the same or when the user selects "Any class"
                const classTypeMatch =
                    formData.flightClass === 'Any Class' || flight.class === formData.flightClass;

                return destinationMatch && classTypeMatch;
            });
            setFilteredFlights(results);
        }
        setShowAllActive(false);
    };
    const handleShowAllFlights = () => {
        setFilteredFlights(allFlights); // Establece los vuelos filtrados a todos los vuelos disponibles
        setShowAllActive(true); // Activa el estado para indicar que se están mostrando todos
        setSearchParams(null); // Opcional: Limpia los parámetros de búsqueda si se muestran todos
    };

    const handleFlightSelect = (flight: Flight) => {
        setSelectedFlight(flight);
        setIsSheetOpen(true);
    };

    // Determina qué lista de vuelos mostrar
    const flightsToDisplay = showAllActive ? allFlights : filteredFlights;

    return (
        <section className="relative font-sans grid items-center justify-items-center min-h-screen  bg-gray-900 p-4">
            <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop"
                alt="Airplane in sky"
                className="  absolute inset-0 z-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 text-white mb-28">
                <div className=" max-w-3xl mx-auto mb-8 ">
                    <h1 className="mb-6 text-4xl md:text-6xl">Find Your Perfect Flight</h1>
                    <p className="text-lg md:text-xl text-muted mb-8">
                        Search and book flights to destinations worldwide with the best prices
                        guaranteed. Your journey starts here.
                    </p>
                </div>
                <FlightSearchForm onSubmit={handleSearchSubmit} />

                <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg text-gray-900 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Flights</h2>
                    {isLoading && <p>loading flights...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!isLoading && allFlights.length > 0 && (
                        <button
                            onClick={handleShowAllFlights}
                            className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Show all flighs
                        </button>
                    )}
                    {!isLoading && !error && filteredFlights.length === 0 && searchParams && (
                        <p>Not found</p>
                    )}
                    {!isLoading && !error && filteredFlights.length === 0 && !searchParams && (
                        <p>Missing information</p>
                    )}

                    {!isLoading && !error && filteredFlights.length > 0 && (
                        <ul className="space-y-4">
                            {flightsToDisplay.map((flight, index) => (
                                <FlightCard
                                    key={`${index}-${flight.destination}-${flight.departureDate}-${flight.priceUSD}`}
                                    flight={flight}
                                    onSelect={handleFlightSelect}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <FlightDetailsSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                flight={selectedFlight}
                search={searchParams}
            />
        </section>
    );
}
