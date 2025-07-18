import React from 'react';
import { FlightConfirmationDialogProps } from '@/types/types'; // Asegúrate de que la ruta sea correcta

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
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { COST_PER_EXTRA_BAG, COST_PER_PET } from '@/lib/constants';
import { Check, Package, Plane, Users } from 'lucide-react';

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
        hasInsurance,
        hasPreferentialSeating,
        hasSpecialNeeds,
        specialAssistanceDescription,
    } = useSearchFormStore();

    let totalPrice = flight ? flight.priceUSD * numberOfTravelers : 0;

    if (hasPets && numberOfPets > 0) {
        totalPrice += numberOfPets * COST_PER_PET;
    }

    if (hasExtraBags && numberOfExtraBags > 0) {
        totalPrice += numberOfExtraBags * COST_PER_EXTRA_BAG;
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Flight Booking</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="hidden">
                    Are you sure you want to book this flight?
                </AlertDialogDescription>

                <article className="space-y-2 text-gray-800">
                    {/* --- Details --- */}
                    {flight && (
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2">
                                <Plane className="text-muted-foreground" />
                                Flight Details
                            </h3>
                            <div>
                                <strong>Destination:</strong> {flight.destination}
                            </div>

                            <div>
                                <strong>Departure:</strong>{' '}
                                {departureDate
                                    ? new Date(departureDate).toLocaleDateString()
                                    : 'Not specified'}
                            </div>
                            <div>
                                <strong>Return:</strong>{' '}
                                {returnDate
                                    ? new Date(returnDate).toLocaleDateString()
                                    : 'Not specified'}
                            </div>

                            <div>
                                <strong>Clase:</strong>{' '}
                                {flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}
                            </div>
                            <div>
                                <strong>Passengers:</strong> {numberOfTravelers}
                            </div>
                        </div>
                    )}

                    <div className="border-t pt-4">
                        <h3 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2">
                            <Users className="text-muted-foreground" />
                            Passengers Details
                        </h3>
                        <ScrollArea className="max-h-60 overflow-y-scroll border rounded-lg ring-1 ring-muted-foreground p-2">
                            {travelerDetails.slice(0, numberOfTravelers).map((traveler, index) => (
                                <div
                                    key={traveler.id}
                                    className="mb-3 p-3 border rounded-md bg-gray-50 shadow-sm"
                                >
                                    <p className="font-semibold text-md mb-1">
                                        Passenger {index + 1}:
                                    </p>
                                    <p>
                                        <strong>Full Name:</strong> {traveler.fullName}
                                    </p>
                                    <p>
                                        <strong>Doc.:</strong> {traveler.documentType.toUpperCase()}
                                    </p>
                                    <p>
                                        <strong>Doc. Number:</strong> {traveler.documentNumber}
                                    </p>
                                    {traveler.dateOfBirth && (
                                        <p>
                                            <strong>Birthdate:</strong>{' '}
                                            {new Date(traveler.dateOfBirth).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    {(hasPets || hasExtraBags || hasInsurance || hasPreferentialSeating) && (
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2">
                                <Package className="text-muted-foreground" />
                                Additional
                            </h3>
                            {hasPets && (
                                <p className="flex items-center gap-2 ">
                                    <Check className="size-4 mt-[1px]" />
                                    <strong>Pets:</strong> {numberOfPets}{' '}
                                </p>
                            )}
                            {hasExtraBags && (
                                <p className="flex items-center gap-2 ">
                                    <Check className="size-4 mt-[1px]" />
                                    <strong>Extra Bags:</strong> {numberOfExtraBags}{' '}
                                </p>
                            )}
                            {hasInsurance && (
                                <p className="flex items-center gap-2 ">
                                    <Check className="size-4 mt-[1px]" />
                                    <strong>Insurance included</strong>
                                </p>
                            )}
                            {hasPreferentialSeating && (
                                <p className="flex items-center gap-2 ">
                                    <Check className="size-4 mt-[1px]" />
                                    <strong>Preferential Seating</strong>
                                </p>
                            )}
                            {hasSpecialNeeds && (
                                <p className="flex items-center gap-2 ">
                                    <Check className="size-4 mt-[1px]" />
                                    <strong>Special Assistance:</strong>{' '}
                                    {specialAssistanceDescription || 'Not specified'}
                                </p>
                            )}
                        </div>
                    )}

                    {/* --- Total --- */}
                    <p className="text-2xl font-bold mt-6 ">
                        Total: <span className="text-green-900">${totalPrice.toFixed(2)} USD</span>
                    </p>
                </article>

                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={onConfirm}>Confirm</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
