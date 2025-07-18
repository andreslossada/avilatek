'use client';
import { useState } from 'react';
import { FlightSearchForm } from '../components/flights/FlightSearch';
import { Flight, SearchFormData } from '@/types/types';
import { FlightCard } from '../components/flights/FlightCard';
import { FlightDetailsSheet } from '@/components/flights/FlightDetailsSheet';
import { useFlights } from '../hooks/useFlights';
import { useSearchFormStore } from "@/store/searchFormStore";

export default function Home() {

    const { filteredFlights, setFilteredFlights } = useSearchFormStore();
    const { isLoading, error } = useFlights();


    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);



    const handleFlightSelect = (flight: Flight) => {
        setSelectedFlight(flight);
        setIsSheetOpen(true);
    };



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
                <FlightSearchForm />

                <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg text-gray-900 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Flights</h2>
                    {isLoading && <p>loading flights...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {/* {!isLoading  && (
                        <button
                            onClick={handleShowAllFlights}
                            className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Show all flighs
                        </button>
                    )} */}
                    {!isLoading && !error && filteredFlights.length === 0 && (
                        <p>Not found</p>
                    )}
                    {!isLoading && !error && filteredFlights.length === 0 && (
                        <p>Missing information</p>
                    )}

                    {!isLoading && !error && filteredFlights.length > 0 && (
                        <ul className="space-y-4">
                            {filteredFlights.map((flight, index) => (
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
            />
        </section>
    );
}
