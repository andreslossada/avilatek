// src/app/page.tsx
'use client'; // Necesario para usar useState y manejar interacciones del cliente

import React, { useState } from 'react';
import FlightSearchForm from '@/components/FlightSearchForm';
import FlightDetailsSheet from '@/components/FlightDetailsSheet';
import { Flight } from '@/types/flights'; // Asegúrate de importar tu tipo Flight

export default function HomePage() {
    // 1. Estado para almacenar el vuelo seleccionado
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

    // Función que se pasará a FlightCards para cuando un vuelo sea seleccionado
    const handleFlightSelect = (flight: Flight) => {
        setSelectedFlight(flight);
    };

    // Función para cerrar la hoja de detalles
    const handleCloseSheet = () => {
        setSelectedFlight(null);
    };

    return (
        <div className="relative min-h-screen"> {/* 'relative' para posicionar la hoja de detalles */}
            {/* FlightSearchForm recibe la función para seleccionar un vuelo */}
            <FlightSearchForm onFlightSelect={handleFlightSelect} />

            {/* 4. Renderizado condicional de FlightDetailsSheet */}
            {selectedFlight && (
                <FlightDetailsSheet
                    flight={selectedFlight} // Pasa los datos del vuelo seleccionado
                    onClose={handleCloseSheet} // Pasa la función para cerrar
// Añade aquí props para el CSS de la animación de entrada/salida
// Por ejemplo: isVisible={!!selectedFlight}
                />
            )}
        </div>
    );
}

// src/components/FlightSearchForm.tsx
import React from 'react';
import FlightCards from './FlightCards'; // Asegúrate de la ruta correcta
import { Flight } from '@/types/flights'; // Importa tu tipo Flight
// import { useSearchFormStore } from '@/stores/searchFormStore'; // Si usas Zustand para otros estados

interface FlightSearchFormProps {
    onFlightSelect: (flight: Flight) => void; // Recibe la función para seleccionar vuelo
}

export default function FlightSearchForm({ onFlightSelect }: FlightSearchFormProps) {
    // Aquí tendrías la lógica de tu formulario de búsqueda
    // ...

    // Asumiendo que FlightCards recibe la lista de vuelos disponibles
    // y la función para seleccionar un vuelo
    const availableFlights = []; // Reemplaza con tus vuelos reales del store o fetch
    // const availableFlights = useSearchFormStore.getState().availableFlights; // Si usas Zustand

    return (
        <div>
            {/* Tu formulario de búsqueda */}
            {/* ... */}

            {/* FlightCards recibe la función para seleccionar un vuelo */}
            <FlightCards flights={availableFlights} onFlightSelect={onFlightSelect} />
      </div>
    );
}

// src/components/FlightCards.tsx
import React from 'react';
import { Flight } from '@/types/flights'; // Importa tu tipo Flight

interface FlightCardsProps {
    flights: Flight[];
    onFlightSelect: (flight: Flight) => void; // Recibe la función para seleccionar vuelo
}

export default function FlightCards({ flights, onFlightSelect }: FlightCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flights.map((flight) => (
                <div
                    key={flight.id}
                    className="flight-card p-4 border rounded-lg shadow-md cursor-pointer"
                    onClick={() => onFlightSelect(flight)} // Cuando se hace clic, llama a la función con los datos del vuelo
                >
                    {/* Contenido de tu tarjeta de vuelo */}
                    <h3>Vuelo {flight.flight_number}</h3>
                    <p>{flight.departure_city} ({flight.departure_airport_code}) a {flight.destination_city} ({flight.destination_airport_code})</p>
                    <p>Clase: {flight.class_type} - Precio: ${flight.price}</p>
                    {/* ... más detalles del vuelo */}
                </div>
            ))}
        </div>
    );
}

// src/components/FlightDetailsSheet.tsx
import React from 'react';
import { Flight } from '@/types/flights'; // Importa tu tipo Flight

interface FlightDetailsSheetProps {
    flight: Flight; // Recibe los datos del vuelo a mostrar
    onClose: () => void; // Recibe la función para cerrar la hoja
// isVisible: boolean; // Si necesitas una prop para controlar la visibilidad desde el padre
}

export default function FlightDetailsSheet({ flight, onClose }: FlightDetailsSheetProps) {
    // Aquí va tu lógica de CSS para que la hoja salga desde la derecha.
    // Por ejemplo, usando clases de Tailwind CSS condicionales o animaciones.
    // La prop 'isVisible' (si la usas) te ayudaría a controlar el estado de la animación.

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"> {/* Overlay y posicionamiento */}
            <div className="bg-white w-full max-w-md h-full shadow-lg p-6 relative"> {/* Contenido de la hoja */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    &times; {/* Botón de cerrar */}
                </button>
                <h2 className="text-2xl font-bold mb-4">Detalles del Vuelo {flight.flight_number}</h2>
                <p>Origen: {flight.departure_city} ({flight.departure_airport_code})</p>
                <p>Destino: {flight.destination_city} ({flight.destination_airport_code})</p>
                <p>Salida: {new Date(flight.departure_at).toLocaleString()}</p>
                <p>Llegada: {new Date(flight.arrival_at).toLocaleString()}</p>
                <p>Aerolínea: {flight.airline}</p>
                <p>Clase: {flight.class_type}</p>
                <p>Precio: ${flight.price}</p>
                {/* ... más detalles del vuelo */}
            </div>
        </div>
    );
}