import { Flight } from "./types";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface FlightSearchResponse {
  flights: Flight[];
  totalResults: number;
  searchId: string;
  executionTime: number;
}