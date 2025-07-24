'use client';
import Image from "next/image";
import { useState } from 'react';
import { FlightSearchForm } from '../components/flights/FlightSearch';
import { Flight } from '@/types/types';
import { FlightCard } from '../components/flights/FlightCard';
import { FlightDetailsSheet } from '@/components/flights/FlightDetailsSheet';
import { useFlights } from '../hooks/useFlights';
import { useSearchFormStore } from '@/store/searchFormStore';
import { CardSkeleton } from '@/components/flights/CardSkeleton';
import { NUMBER_SKELETONS } from '@/lib/constants';
import { supabase } from '@/lib/supabase'
import { useEffect } from "react";

export default function Home() {
    const { filteredFlights, hasSearched } = useSearchFormStore();
    const { isLoading, error } = useFlights();
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);




    const handleFlightSelect = (flight: Flight) => {
        setSelectedFlight(flight);
        setIsSheetOpen(true);
    };

    const renderFlightDisplay = () => {
        if (isLoading && hasSearched) {
            return (
                <div className="mt-8 p-4 border bg-opacity-90 rounded-lg shadow-lg text-gray-900">
                    <h2 className="text-lg font-semibold text-muted-foreground mb-4 p-4">
                        Searching...
                    </h2>
                    <ul className="space-y-4">
                        {Array.from({ length: NUMBER_SKELETONS }).map((_, index) => (
                            <li key={index}>
                                <CardSkeleton />
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (!isLoading && hasSearched && filteredFlights.length > 0) {
            return (
                <div className="mt-8   bg-opacity-90 rounded-lg  ">
                    <h2 className="text-lg font-bold  px-4 text-shadow-md pb-4">Found ({filteredFlights.length}):</h2>
                    <ul className="space-y-4">
                        {filteredFlights.map((flight, index) => (
                            <FlightCard
                                key={`${index}-${flight.departure_airport.name}-${flight.departureDate}-${flight.price}`}
                                flight={flight}
                                onSelect={handleFlightSelect}
                            />
                        ))}
                    </ul>
                </div>
            );
        }

        if (!isLoading && hasSearched && filteredFlights.length === 0) {
            return (
                <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg text-gray-900 text-center">
                    <p className="text-gray-600 text-center">Try looking for another city :( </p>
                    <span className="text-[11px] text-muted-foreground">
                        (New York, Madrid or Buenos aires)
                    </span>
                </div>
            );
        }

        if (error && hasSearched) {
            return (
                <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg text-gray-900">
                    <p className="text-red-600 text-center">Error: {error}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="relative font-sans grid md:items-center items-baseline p-0 justify-items-center min-h-screen  ">
            <div className="fixed inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop"
                    alt="Airplane in sky"
                    fill
                    style={{ objectFit: 'cover', opacity: 0.5 }}
                    priority
                />
            </div>
            <div className="relative z-10 text-white max-w-4xl  content-end mb-24">
                <div className=" mx-auto mb-0 px-5 ">
                    <h1 className="mb-6 text-4xl md:text-6xl text-shadow-md ">Find Your Perfect Flight</h1>
                    <p className="text-lg md:text-xl text-muted">
                        Search and book flights to destinations worldwide with the best prices
                        guaranteed.
                    </p>
                    <p className="text-lg md:text-lg text-muted  mb-8">Your journey starts here.</p>
                </div>
                <FlightSearchForm />
                <div className="absolute w-full">
                    {renderFlightDisplay()}
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
