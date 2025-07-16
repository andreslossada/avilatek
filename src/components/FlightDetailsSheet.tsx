// components/FlightDetailsSheet.tsx
import React, { useState } from 'react';
import { Flight, FlightDetailsSheetProps } from '../types/types'; // Asegúrate de que la ruta sea correcta

// Importa los componentes de Shadcn UI para el Sheet
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
import { cn, formatDate, stringToDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Calendar } from "lucide-react";
import { useFlightDateStore } from "@/store";

// Define las props que este componente recibirá


export function FlightDetailsSheet({ isOpen, onOpenChange, flight, search }: FlightDetailsSheetProps) {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>(false);


    const { returnDate, departureDate, setDepartureDate, setReturnDate } = useFlightDateStore();

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
                <SheetContent side="right" className="p-1">
                    <SheetHeader>
                        <SheetTitle>Detalles del Vuelo</SheetTitle>
                        <SheetDescription>
                            Información detallada del vuelo seleccionado.
                        </SheetDescription>
                    </SheetHeader>
                    {flight ? (
                        <div className="p-4 text-gray-900">
                            <p className="text-xl font-bold mb-2">{flight.destination}</p>

                            {returnDate ? (
                                <p className="text-2xl font-bold mt-4">Return: {formatDate(returnDate)}</p>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className={cn(
                                            "inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm transition-all",
                                            "h-9 px-4 py-2 w-full cursor-pointer",
                                            "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                                        )}>
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(returnDate)}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={returnDate}
                                            onSelect={setReturnDate}
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}

                            {/* {departureDate && (
                                <p className="text-2xl font-bold mt-4">Departure Date: {departureDate}</p>
                            )} */}
                            <p className="text-2xl font-bold mt-4">Precio: ${flight.priceUSD}</p>
                            <p className="text-2xl font-bold mt-4">Type: {flight.class}</p>


                        </div>
                    ) : (
                        <p className="p-4 text-gray-900">Selecciona un vuelo para ver sus detalles.</p>
                    )}
                    <SheetFooter>
                        <Button onClick={handleSelectFlight}>Continue</Button>
                        <SheetClose asChild>
                            <Button variant="outline">Close</Button>
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