// components/FlightCard.tsx
import React from 'react';
import { Flight, FlightCardProps } from '../types/types'; // Asegúrate de que la ruta sea correcta

// Define las props que FlightCard recibirá


export function FlightCard({ flight, onSelect }: FlightCardProps) {
    return (
        <li
            className="border-b pb-2 last:border-b-0 cursor-pointer p-4 hover:bg-gray-50 transition-colors duration-200 rounded-md"
            onClick={() => onSelect(flight)} // Cuando se haga clic, llama a onSelect con el vuelo
        >
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-gray-900">{flight.destination}</p>
                <p className="text-xl font-bold text-green-900">${flight.priceUSD} <span className="text-primary text-sm">each</span></p>
            </div>
            {/* <p className="text-sm text-gray-700">Salida: {flight.departureDate}</p>
            <p className="text-sm text-gray-700">Regreso: {flight.returnDate}</p> */}
            {/* <p className="text-sm text-gray-700">Clase: {flight.class}</p> */}
            {/* Puedes añadir más detalles aquí según lo que quieras mostrar directamente */}
        </li>
    );
}