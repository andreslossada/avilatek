export interface Flight {
    destination: string;
    departureDate?: Date; 
    returnDate?: Date; 
    priceUSD: number;
    class: FlightClassOptions;
}

export type FlightClassOptions = "Economy" | "Business" | "First Class" | "Any Class";

export interface SearchFormData {
    destination: string;
    departureDate?: Date ;
    returnDate?: Date;
    passengers: number;
    classType: FlightClassOptions;
}

export interface FlightSearchFormProps {
    onSubmit: (formData: SearchFormData) => void;
}
export interface FlightCardProps {
    flight: Flight;
    onSelect: (flight: Flight) => void; // Función para notificar al padre qué vuelo fue seleccionado
}

export  interface FlightConfirmationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void; // Función para controlar el estado de apertura/cierre
    flight: Flight | null; // El vuelo seleccionado para mostrar el resumen
    onConfirm: () => void; // Función para ejecutar cuando se confirma la reserva
}

export interface FlightDetailsSheetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void; // Función para controlar el estado de apertura/cierre
    flight: Flight | null; // El vuelo seleccionado para mostrar
    search: SearchFormData | null; // Los parámetros de búsqueda actuales, si es necesario
}


export interface UseFlightsResult {
    allFlights: Flight[];
     isLoading: boolean;
  error: string | null;
//   refetch: () => void;
}
