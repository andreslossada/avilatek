'use client'
import { useEffect, useState } from "react";
import { FlightSearchForm } from "../components/FlightSearch";
import { Flight, SearchFormData } from "@/types/types";

export default function Home() {
    const [allFlights, setAllFlights] = useState<Flight[]>([]);
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAllActive, setShowAllActive] = useState<boolean>(false);

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch flights");
                }
                const data = await response.json();
                setAllFlights(data as Flight[]);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchFlights();
    }, []);
    // console.log("All flights fetched:", allFlights);

    const handleSearchSubmit = (formData: SearchFormData) => {
        setSearchParams(formData);
        if (allFlights.length > 0) {
            const results = allFlights.filter(flight => {

                const destinationMatch = flight.destination.toLowerCase().includes(formData.destination.toLowerCase())
                // for this example we will assume there are infinite dates available
                // const departureDateMatch = flight.departureDate.toLowerCase().includes(formData.departureDate.toLowerCase())
                // const returnDateMatch = flight.returnDate.toLowerCase().includes(formData.returnDate.toLowerCase())
                return destinationMatch;
            });
            setFilteredFlights(results);
        }
        setShowAllActive(false);
    }
    const handleShowAllFlights = () => {
        setFilteredFlights(allFlights); // Establece los vuelos filtrados a todos los vuelos disponibles
        setShowAllActive(true); // Activa el estado para indicar que se están mostrando todos
        setSearchParams(null); // Opcional: Limpia los parámetros de búsqueda si se muestran todos
    };

    // Determina qué lista de vuelos mostrar
    const flightsToDisplay = showAllActive ? allFlights : filteredFlights;


    return (
        <section className="relative font-sans grid items-center justify-items-center min-h-screen  bg-gray-900">
            <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop"
                alt="Airplane in sky"
                className="  absolute inset-0 z-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 text-white mb-28">

                <div className=" max-w-3xl mx-auto mb-8">
                    <h1 className="mb-6 text-4xl md:text-6xl">
                        Find Your Perfect Flight
                    </h1>
                    <p className="text-lg md:text-xl text-muted mb-8">
                        Search and book flights to destinations worldwide with the best prices guaranteed.
                        Your journey starts here.
                    </p>
                </div>
                <FlightSearchForm onSubmit={handleSearchSubmit} />

                <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg text-gray-900 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Resultados de la Búsqueda</h2>
                    {isLoading && <p>Cargando vuelos...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!isLoading && allFlights.length > 0 && (
                        <button
                            onClick={handleShowAllFlights}
                            className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Mostrar Todos los Vuelos
                        </button>
                    )}
                    {!isLoading && !error && filteredFlights.length === 0 && searchParams && (
                        <p>No se encontraron vuelos para tu búsqueda.</p>
                    )}
                    {!isLoading && !error && filteredFlights.length === 0 && !searchParams && (
                        <p>Ingresa tus criterios de búsqueda para encontrar vuelos.</p>
                    )}

                    {!isLoading && !error && filteredFlights.length > 0 && (
                        <ul className="space-y-4">
                            {flightsToDisplay.map((flight, index) => (
                                <li key={`${flight.destination}-${index}`} className="border-b pb-2 last:border-b-0">
                                    <p className="font-semibold"> {flight.destination}</p>
                                    {/* <p>Salida: {flight.departureDate}</p>
                                    <p>Regreso: {flight.returnDate}</p> */}
                                    <p>Precio: ${flight.priceUSD}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>


            </div>

        </section>
    );
}
