// src/store/flightDateStore.ts

import { create } from 'zustand';

interface FlightDateState {
  departureDate?: Date; // La fecha de salida puede ser nula al inicio
  returnDate?: Date;    // La fecha de regreso puede ser nula al inicio
  
  // Acciones para actualizar las fechas
  setDepartureDate: (date?: Date) => void;
  setReturnDate: (date?: Date) => void;
}

export const useFlightDateStore = create<FlightDateState>((set) => ({
  departureDate: undefined,
  returnDate: undefined,
  
  // Función para establecer la fecha de salida
  setDepartureDate: (date) => set({ departureDate: date }),
  
  // Función para establecer la fecha de regreso
  setReturnDate: (date) => set({ returnDate: date }),
}));