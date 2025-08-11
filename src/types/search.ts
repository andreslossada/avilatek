export interface FlightSearchParams {
    departureCity: string;
    destinationCity: string;
    departureDate: Date;
    returnDate?: Date;
    passengers: number;
    class: 'economy' | 'business' | 'first';
}

export interface SearchFilters {
  maxPrice?: number;
  airlines?: string[];
  maxStops?: number;
  departureTimeRange?: {
    start: string;
    end: string;
  };
}