// components/FlightConfirmationDialog.tsx
import React from 'react';
import { Flight, FlightConfirmationDialogProps } from '../types/types'; // Asegúrate de que la ruta sea correcta

// Importa los componentes de Shadcn UI para AlertDialog
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Ajusta la ruta si es diferente

// Define las props que este componente recibirá


export function FlightConfirmationDialog({
    isOpen,
    onOpenChange,
    flight,
    onConfirm,
}: FlightConfirmationDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirma tu Reserva</AlertDialogTitle>
                    <AlertDialogDescription>
                        Por favor, revisa los detalles de tu vuelo antes de confirmar.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {flight ? ( // Muestra los detalles del vuelo seleccionado
                    <div className="py-2 text-gray-900">
                        <p><strong>Vuelo:</strong>  {flight.destination}</p>
                        {/* <p><strong>Fechas:</strong> {flight.departureDate} - {flight.returnDate}</p> */}
                        {/* <p><strong>Clase:</strong> {flight.class}</p> */}
                        <p><strong>Precio Total:</strong> ${flight.priceUSD}</p>
                        {/* Aquí añadirás el resumen de todos los servicios y viajeros cuando los implementes */}
                        {/* Como se indica en el PDF, mostrar:
                - Cantidad de viajeros y sus edades (cuando lo implementes)
                - Cantidad de mascotas (si aplica)
                - Cantidad de maletas extra (si aplica)
                - Servicios adicionales seleccionados (seguro, asientos, asistencia)
            */}
                    </div>
                ) : (
                    <p className="py-2 text-gray-900">No hay detalles del vuelo para mostrar.</p>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Confirmar Reserva
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}