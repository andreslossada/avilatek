// components/FlightDetailsSheet.tsx
import React, { useState } from 'react';
import { Flight, FlightDetailsSheetProps } from '../types/types'; // Asegúrate de que la ruta sea correcta

// Importa los componentes de Shadcn UI para el Sheet
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"; // Ajusta la ruta si es diferente
import { FlightConfirmationDialog } from "./FlightConfirmationDialog";

// Define las props que este componente recibirá


export function FlightDetailsSheet({ isOpen, onOpenChange, flight }: FlightDetailsSheetProps) {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>(false);

    // Esta función se llama cuando se hace clic en "Seleccionar este vuelo" en el Sheet
    const handleSelectFlight = () => {
        setIsAlertDialogOpen(true); // Abre el AlertDialog
    };
    const handleConfirmBooking = () => {
        alert(`¡Reserva para el vuelo a ${flight?.destination} confirmada!`);
        setIsAlertDialogOpen(false);
        onOpenChange(false);
    };
    return (
        <>
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent side="right"> {/* side="right" para que abra desde la derecha */}
                <SheetHeader>
                    <SheetTitle>Detalles del Vuelo</SheetTitle>
                    <SheetDescription>
                        Información detallada del vuelo seleccionado.
                    </SheetDescription>
                </SheetHeader>
                {flight ? (
                    <div className="py-4 text-gray-900">
                        <p className="text-xl font-bold mb-2">{flight.destination}</p>
                        {/* <p><strong>Salida:</strong> {flight.departureDate}</p>
                        <p><strong>Regreso:</strong> {flight.returnDate}</p>
                        <p><strong>Clase:</strong> {flight.class}</p> */}
                        <p className="text-2xl font-bold mt-4">Precio: ${flight.priceUSD}</p>
                        {/* Aquí puedes añadir más detalles del vuelo según tu JSON */}

                        <button
                                onClick={handleSelectFlight}
                            className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Seleccionar este vuelo
                        </button>
                    </div>
                ) : (
                    <p className="py-4 text-gray-900">Selecciona un vuelo para ver sus detalles.</p>
                )}
            </SheetContent>
        </Sheet>
            <FlightConfirmationDialog
                isOpen={isAlertDialogOpen}
                onOpenChange={setIsAlertDialogOpen}
                flight={flight}
                onConfirm={handleConfirmBooking}
            />
        </>
    );
}