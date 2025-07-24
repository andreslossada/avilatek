export interface Flight {
    destination_airport: Airport;
    departure_airport: Airport;
    departureDate?: Date;
    returnDate?: Date;
    price: number;
    class_type: string;
    airline: Airline;
    
}
export interface Airport {
    iataCode: string;
    name: string;
}

interface Airline {
    iataCode: string;
    name: string;
}

export type FlightClassOptions = 'Economy' | 'Business' | 'First Class' | 'Any Class';

export interface SearchFormData {
    destination: string;
    departureDate?: Date;
    returnDate?: Date;
    numberOfTravelers: number;
    flightClass?: FlightClassOptions;
}

export interface FlightSearchFormProps {
    onSubmit: (formData: SearchFormData) => void;
}
export interface FlightCardProps {
    flight: Flight;
    onSelect: (flight: Flight) => void;
}

export interface FlightConfirmationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    flight: Flight | null;
    onConfirm: () => void;
}

export interface FlightDetailsSheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    flight: Flight | null;
}

export interface SearchFormState {
    destination: string;
    departureDate?: Date;
    returnDate?: Date;
    flightClass: FlightClassOptions;
    numberOfTravelers: number;

    setDestination: (destination: string) => void;
    setDepartureDate: (date?: Date) => void;
    setReturnDate: (date?: Date) => void;
    setFlightClass: (flightClass: FlightClassOptions) => void;
    setNumberOfTravelers: (count: number) => void;
}

export interface DateInputProps {
    selectedDate?: Date;
    onDateSelect: (date?: Date) => void;
    placeholderText: string;
    disabledPredicate?: (date: Date) => boolean;
    calendarCaptionLayout?: 'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years';
}

// useFlights hook interface
export interface FlightSearchParams {
    destination?: string;
    departureDate?: Date;
    returnDate?: Date;
    flightClass?: FlightClassOptions;
}
export interface UseFlightsResult {
    isLoading: boolean;
    error: string | null;
    fetchFlights: (params?: FlightSearchParams) => Promise<void>;
}
