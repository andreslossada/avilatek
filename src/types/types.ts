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
    numberOfTravelers: number;
    flightClass: FlightClassOptions;
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

export interface SearchFormState {
  // -- Información del Viaje --
  destination: string;
  departureDate?: Date; // Puede ser undefined si no se ha seleccionado
  returnDate?: Date;    // Puede ser undefined si no se ha seleccionado
  flightClass: FlightClassOptions; // Clase de vuelo
  numberOfTravelers: number; // Cantidad de viajeros (sin sus detalles individuales)

  // -----------------------------------------------------
  // 2. Acciones para modificar el estado
  // -----------------------------------------------------
  setDestination: (destination: string) => void;
  setDepartureDate: (date?: Date) => void;
  setReturnDate: (date?: Date) => void;
  setFlightClass: (flightClass: FlightClassOptions) => void;
  setNumberOfTravelers: (count: number) => void;
}

export interface DateInputProps {
    selectedDate?: Date; // La fecha seleccionada actualmente (puede ser undefined)
    onDateSelect: (date?: Date) => void; // Función que se llama cuando se selecciona una fecha
    placeholderText: string; // Texto a mostrar cuando no hay fecha seleccionada
    disabledPredicate?: (date: Date) => boolean; // Función opcional para deshabilitar fechas
    // Puedes añadir más props si necesitas personalizar otros aspectos (ej. className)
  }
