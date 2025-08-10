'use client';
import Image from "next/image";
import { useState } from 'react';
import { FlightSearchForm } from '../components/flights/FlightSearchForm';
import { Flight } from '@/types/flight';
import { FlightDetailsSheet } from '@/components/flights/FlightDetailsSheet';

export interface TravelerDetail {
    id: string;
    fullName: string;
    documentType: string;
    documentNumber: string;
    dateOfBirth?: Date;
}
export interface BookingDetails {
    flight?: Flight;
    numberOfTravelers: number;
    travelerDetails: TravelerDetail[];
    hasPets: boolean;
    numberOfPets?: number;
    hasExtraBags: boolean;
    numberOfExtraBags?: number;
    hasInsurance: boolean;
    hasPreferentialSeating: boolean;
    hasSpecialNeeds: boolean;
    specialAssistanceDescription: string;
}

const initialBookingState: BookingDetails = {
    flight: undefined,
    numberOfTravelers: 1,
    travelerDetails: [],
    hasPets: false,
    numberOfPets: undefined,
    hasExtraBags: false,
    numberOfExtraBags: undefined,
    hasInsurance: false,
    hasPreferentialSeating: false,
    hasSpecialNeeds: false,
    specialAssistanceDescription: '',
};
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

    const handleConfirmBooking = () => {
        // ✨ Aquí va la lógica para enviar la reserva a una API
        console.log('Booking confirmed with details:', bookingDetails);

        // Si la confirmación fue exitosa...
        alert('Booking confirmed!');

        // Resetear el estado para una nueva reserva
        setBookingDetails(initialBookingState);
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
                onOpenChange={handleCloseSheet}
                bookingDetails={bookingDetails} // ✨ Pasa el objeto completo
                setBookingDetails={setBookingDetails} // ✨ Pasa el setter para que el hijo lo use
                onConfirmBooking={handleConfirmBooking} 
            />
        </section>
    );
}
