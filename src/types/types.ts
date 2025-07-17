export interface Flight {
    destination: string;
    departureDate?: Date;
    returnDate?: Date;
    priceUSD: number;
    class: FlightClassOptions;
}

export type FlightClassOptions = 'Economy' | 'Business' | 'First Class' | 'Any Class';

export interface SearchFormData {
    destination: string;
    departureDate?: Date;
    returnDate?: Date;
    numberOfTravelers: number;
    flightClass: FlightClassOptions;
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
    search: SearchFormData | null;
}

export interface UseFlightsResult {
    allFlights: Flight[];
    isLoading: boolean;
    error: string | null;
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
