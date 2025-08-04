export interface Flight {
  id: string;
  departure_city: string;
  destination_city: string;
  departure_airport_code: string;
  destination_airport_code: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  airline: string;
  duration: number;
}

export interface City {
  name: string;
  code: string; // IATA code
  country: string;
  timezone?: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}