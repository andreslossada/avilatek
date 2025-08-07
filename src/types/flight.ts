import { FLIGHT_CLASS_LABELS } from '@/components/flights/ClassInput/types';
type FlightClassType = keyof typeof FLIGHT_CLASS_LABELS;
export interface Flight {
    id: string;
    departure_city: string;
    destination_city: string;
    departure_airport: Airport;
    destination_airport: Airport;
    departure_at: string;
    arrival_at: string;
    price: number;
    airline: Airline;
    duration: number;
    class_type: FlightClassType;
    flight_number: string;
}

export interface City {
    name: string;
    code: string; // IATA code
    country: string;
    timezone?: string;
}

export interface Airport {
    iataCode: string;
    name: string;
}
export interface Airline {
    name: string;
    iataCode: string; // IATA code
}

export interface FlightDetailsSheetProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    flight: Flight | null;
}
