import React, { useState } from 'react';
import { FlightDetailsSheetProps } from '../types/types'; // Asegúrate de que la ruta sea correcta

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"; // Ajusta la ruta si es diferente
import { FlightConfirmationDialog } from "./FlightConfirmationDialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useSearchFormStore } from "@/store/searchFormStore";
import { ClassInput } from "./ClassInput";
import { DateInput } from "./DateInput";
import { PassengersInput } from "./PassengersInput";
import { ScrollArea } from "./ui/scroll-area";
import { CornerUpLeft, CornerUpRight, Plane } from "lucide-react";

// Define las props que este componente recibirá


export function FlightDetailsSheet({ isOpen, onOpenChange, flight }: FlightDetailsSheetProps) {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>(false);
    const {
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        numberOfTravelers, // Necesario para iterar los viajeros
        travelerDetails
    } = useSearchFormStore();
    const disablePastDates = (date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0));
    const disableDepartureDates = (date: Date) => {
        // 1. Deshabilitar fechas pasadas
        if (disablePastDates(date)) {
            return true;
        }
        // 2. Si returnDate está seleccionada, deshabilitar cualquier fecha de salida posterior a returnDate
        if (returnDate && date > returnDate) { // ✨ date > returnDate
            return true;
        }
        return false;
    };
    const disableReturnDates = (date: Date) => {
        // 1. Deshabilitar fechas pasadas
        if (disablePastDates(date)) {
            return true;
        }
        // 2. Si departureDate está seleccionada, deshabilitar cualquier fecha de regreso anterior a departureDate
        if (departureDate && date < departureDate) { // ✨ date < departureDate
            return true;
        }
        return false;
    };


    const handleSelectFlight = () => {
        setIsAlertDialogOpen(true); 
    };
    const handleConfirmBooking = () => {
        alert(`¡Reserva para el vuelo a ${flight?.destination} confirmada!`);
        setIsAlertDialogOpen(false);
        onOpenChange(false);
    };
    const totalPrice = flight ? flight.priceUSD * useSearchFormStore.getState().numberOfTravelers : 0;

    const areAllEssentialFieldsFilled = () => {
        // 1. Validar fechas de salida y regreso
        if (!departureDate || !returnDate) {
            return false;
        }

        // 2. Validar los detalles de cada viajero
        // Asegúrate de que el array travelerDetails tenga la misma cantidad de elementos que numberOfTravelers
        if (travelerDetails.length !== numberOfTravelers) {
            return false;
        }

        for (let i = 0; i < numberOfTravelers; i++) {
            const traveler = travelerDetails[i];
            // Si el objeto del viajero no existe o alguno de sus campos esenciales está vacío/undefined
            if (
                !traveler ||
                !traveler.fullName ||
                !traveler.documentType ||
                !traveler.documentNumber ||
                !traveler.dateOfBirth
            ) {
                return false; // Falta información para este viajero
            }
        }

        // Si todas las comprobaciones pasaron
        return true;
    };
    return (
        <>
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetContent side="right" className="px-4 bg-gray-100 ">

                    <SheetHeader className="px-0 pb-0">
                        <SheetTitle>Flight Details</SheetTitle>
                    </SheetHeader>

                    <ScrollArea className="flex-1 border rounded-md bg-white overflow-y-scroll inset-shadow-sm">
                    {flight ? (
                            <div className="p-4 text-gray-900">
                                <div className="flex items-center gap-3 mb-1">
                                    <Plane />
                                    <h4 className="text-xl font-bold mb-2"> {flight.destination}</h4>
                                </div>
                                <div className="flex gap-2">

                                    <div className="flex w-full space-x-1 items-center">
                                        <CornerUpRight />
                                        <DateInput selectedDate={departureDate}
                                            onDateSelect={setDepartureDate}
                                            placeholderText="Departure"
                                            disabledPredicate={disableDepartureDates}
                                        />
                                    </div>

                                    <div className="flex w-full space-x-1 items-center">
                                        <CornerUpLeft />
                                        <DateInput selectedDate={returnDate} // Pasa el estado de regreso
                                            onDateSelect={setReturnDate} // Pasa la acción para actualizar el regreso
                                            placeholderText="Return"
                                            disabledPredicate={disableReturnDates} // Pasa la función para deshabilitar fechas de regreso
                                        />
                                    </div>
                                </div>
                                <PassengersInput />
                        </div>
                    ) : (
                        <p className="p-4 text-gray-900">Selecciona un vuelo para ver sus detalles.</p>
                    )}
                    </ScrollArea>

                    <SheetFooter className="px-0 pt-0">
                        <p className="text-2xl font-bold my-1 text-green-900 ml-auto">Total: ${totalPrice}</p>
                        <Button onClick={handleSelectFlight} disabled={!areAllEssentialFieldsFilled()}>Continue</Button>
                        <SheetClose asChild>
                            <Button variant="outline" >Close</Button>
                        </SheetClose>
                    </SheetFooter>

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