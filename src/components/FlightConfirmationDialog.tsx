import React from 'react';
import { Flight, FlightConfirmationDialogProps } from '../types/types'; // Asegúrate de que la ruta sea correcta

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'; // Ajusta la ruta si es diferente
import { useSearchFormStore } from '@/store/searchFormStore';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export function FlightConfirmationDialog({
    isOpen,
    onOpenChange,
    flight,
    onConfirm,
}: FlightConfirmationDialogProps) {
    const {
        departureDate,
        returnDate,
        flightClass,
        numberOfTravelers,
        travelerDetails,
        hasPets,
        numberOfPets,
        hasExtraBags,
        numberOfExtraBags,
    } = useSearchFormStore();
    console.log(`🚀 ~ departureDate:`, departureDate);

    const totalPrice = flight ? flight.priceUSD * numberOfTravelers : 0;
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Reserva de Vuelo</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4 text-gray-800">
                        <p className="mb-4">
                            Por favor, revisa cuidadosamente la información de tu reserva antes de
                            confirmar:
                        </p>

                        {/* --- Detalles del Vuelo --- */}
                        {flight && (
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-bold mb-2 text-blue-900">
                                    ✈️ Detalles del Vuelo
                                </h3>
                                <p>
                                    <strong>Destino:</strong> {flight.destination}
                                </p>

                                <p>
                                    <strong>Fecha de Salida:</strong>{' '}
                                    {departureDate
                                        ? new Date(departureDate).toLocaleDateString()
                                        : 'No especificada'}
                                </p>
                                <p>
                                    <strong>Fecha de Salida:</strong>{' '}
                                    {departureDate
                                        ? new Date(departureDate).toLocaleDateString()
                                        : 'No especificada'}
                                </p>

                                <p>
                                    <strong>Clase:</strong>{' '}
                                    {flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}
                                </p>
                                <p>
                                    <strong>Cantidad de Viajeros:</strong> {numberOfTravelers}
                                </p>
                            </div>
                        )}

                        {/* --- Información de los Viajeros --- */}
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-bold mb-2 text-blue-900">
                                👥 Información de los Viajeros
                            </h3>
                            <ScrollArea className="max-h-60 overflow-y-scroll">
                                {/* Mapea solo los viajeros necesarios según numberOfTravelers */}
                                {travelerDetails
                                    .slice(0, numberOfTravelers)
                                    .map((traveler, index) => (
                                        <div
                                            key={traveler.id}
                                            className="mb-3 p-3 border rounded-md bg-gray-50 shadow-sm"
                                        >
                                            <p className="font-semibold text-md mb-1">
                                                Viajero {index + 1}:
                                            </p>
                                            <p>
                                                <strong>Nombre Completo:</strong>{' '}
                                                {traveler.fullName}
                                            </p>
                                            <p>
                                                <strong>Tipo Doc.:</strong>{' '}
                                                {traveler.documentType.toUpperCase()}
                                            </p>
                                            <p>
                                                <strong>Número Doc.:</strong>{' '}
                                                {traveler.documentNumber}
                                            </p>
                                            {traveler.dateOfBirth && (
                                                <p>
                                                    <strong>Fecha de Nacimiento:</strong>{' '}
                                                    {new Date(
                                                        traveler.dateOfBirth,
                                                    ).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                            </ScrollArea>
                        </div>

                        {/* --- Opcionales (Mascotas, Maletas Extra) --- */}
                        {(hasPets || hasExtraBags) && (
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-bold mb-2 text-blue-700">
                                    🎒 Opcionales
                                </h3>
                                {hasPets && (
                                    <p>
                                        <strong>Mascotas:</strong> {numberOfPets}{' '}
                                        {numberOfPets === 1 ? 'mascota' : 'mascotas'}
                                    </p>
                                )}
                                {hasExtraBags && (
                                    <p>
                                        <strong>Maletas Extra:</strong> {numberOfExtraBags}{' '}
                                        {numberOfExtraBags === 1 ? 'maleta' : 'maletas'}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* --- Costo Total --- */}
                        <p className="text-2xl font-extrabold mt-6 text-green-900">
                            Total: ${totalPrice.toFixed(2)} USD
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={onConfirm}>Confirma</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
