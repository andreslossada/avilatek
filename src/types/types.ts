export interface Flight {
    destination: string;
    departureDate: Date; 
    returnDate: Date; 
    priceUSD: number;
}

export interface SearchFormData {
    destination: string;
    // departureDate: Date | undefined;
    // returnDate: Date    | undefined;
}

export interface FlightSearchFormProps {
    onSubmit: (formData: SearchFormData) => void;
}
export interface FlightCardProps {
    flight: Flight;
    onSelect: (flight: Flight) => void; // Función para notificar al padre qué vuelo fue seleccionado
    key: string
}