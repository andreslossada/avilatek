'use client';
import Image from "next/image";
import { useState } from 'react';
import { FlightSearchForm } from '../components/flights/FlightSearchForm';
import { Flight } from '@/types/flight';
import { FlightDetailsSheet } from '@/components/flights/FlightDetailsSheet';
import { BookingDetails, initialBookingState } from "@/types/booking";


export default function Home() {
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>(initialBookingState);

    const handleFlightSelect = (flight: Flight) => {
        setBookingDetails(prev => ({ ...prev, flight: flight }));
    };

    const handleCloseSheet = (isOpen: boolean) => {
        if (!isOpen) {
            setBookingDetails(initialBookingState); // Reinicia el estado al cerrar
        }
    };


    console.log('hay booking', !!bookingDetails.flight)

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
            <div className="absolute top-1/3 transform  text-white min-w-4/5 content-end mb-24">
                <div className=" mx-auto mb-0 px-5 ">
                    <h1 className="mb-6 text-4xl md:text-6xl text-shadow-md ">Find Your Perfect Flight</h1>
                    <p className="text-lg md:text-xl text-muted">
                        Search and book flights to destinations worldwide with the best prices
                        guaranteed.
                    </p>
                    <p className="text-lg md:text-lg text-muted  mb-8">Your journey starts here.</p>
                </div>
                <FlightSearchForm onFlightSelect={handleFlightSelect} />
                {/* <div className="absolute w-full border">
                    {renderFlightDisplay()}
                </div> */}
            </div>
            <FlightDetailsSheet
                isOpen={!!bookingDetails.flight}
                // onOpenChange={handleCloseSheet}
                bookingDetails={bookingDetails}
                setBookingDetails={setBookingDetails}
            />
        </section>
    );
}
