import React, { useState } from 'react';
import { FlightDetailsSheetProps } from '../types/types'; // Asegúrate de que la ruta sea correcta

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'; // Ajusta la ruta si es diferente
import { FlightConfirmationDialog } from './FlightConfirmationDialog';
import { Button } from './ui/button';
import { useSearchFormStore } from '@/store/searchFormStore';
import { DateInput } from './DateInput';
import { PassengersInput } from './PassengersInput';
import { ScrollArea } from './ui/scroll-area';
import { CornerUpLeft, CornerUpRight, Plane } from 'lucide-react';
import { COST_PER_EXTRA_BAG, COST_PER_PET } from "@/lib/constants";

export function FlightDetailsSheet({ isOpen, onOpenChange, flight }: FlightDetailsSheetProps) {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>(false);
    const {
        returnDate,
        departureDate,
        setDepartureDate,
        setReturnDate,
        numberOfTravelers,
        hasPets,
        numberOfPets,
        hasExtraBags,
        numberOfExtraBags,
        travelerDetails,
    } = useSearchFormStore();
    const disablePastDates = (date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0));
    const disableDepartureDates = (date: Date) => {
        //Disable past dates
        if (disablePastDates(date)) {
            return true;
        }
        //If returnDate is selected, disable any departure date after returnDate
        if (returnDate && date > returnDate) {
            return true;
        }
        return false;
    };
    const disableReturnDates = (date: Date) => {
        //Disable past dates
        if (disablePastDates(date)) {
            return true;
        }
        //If departureDate is selected, disable any return dates prior to departureDate
        if (departureDate && date < departureDate) {
            return true;
        }
        return false;
    };

    const handleSelectFlight = () => {
        setIsAlertDialogOpen(true);
    };
    const handleConfirmBooking = () => {
        alert(`Flight booking to ${flight?.destination} confirmed!`);
        setIsAlertDialogOpen(false);
        onOpenChange(false);
    };
    let totalPrice = flight
        ? flight.priceUSD * useSearchFormStore.getState().numberOfTravelers
        : 0;

    if (hasPets && numberOfPets > 0) {
        totalPrice += (numberOfPets ?? 0) * COST_PER_PET;
    }

    if (hasExtraBags && numberOfExtraBags > 0) {
        totalPrice += (numberOfExtraBags ?? 0) * COST_PER_EXTRA_BAG;
    }

    const areAllEssentialFieldsFilled = () => {
        //Validate departure and return dates
        if (!departureDate || !returnDate) {
            return false;
        }

        //Validate the travelerDetails array has the same number of items as numberOfTravelers
        if (travelerDetails.length !== numberOfTravelers) {
            return false;
        }

        for (let i = 0; i < numberOfTravelers; i++) {
            const traveler = travelerDetails[i];
            if (
                !traveler ||
                !traveler.fullName ||
                !traveler.documentType ||
                !traveler.documentNumber ||
                !traveler.dateOfBirth
            ) {
                return false;
            }
        }
        if (hasPets && (numberOfPets === undefined || numberOfPets <= 0)) {
            return false; 
        }
        if (hasExtraBags && (numberOfExtraBags === undefined || numberOfExtraBags <= 0)) {
            return false; 
        }

        //if all validations passed
        return true;
    };
    return (
        <>
            <Sheet open={isOpen} onOpenChange={onOpenChange} >
                <SheetContent side="right" className="px-4 bg-gray-100 w-[90vw]">
                    <SheetHeader className="px-0 pb-0">
                        <SheetTitle>Flight Details</SheetTitle>
                    </SheetHeader>

                    <ScrollArea className="flex-1 border rounded-md bg-white overflow-y-scroll inset-shadow-sm">
                        {flight ? (
                            <div className="p-4 text-gray-900">
                                <div className="flex items-center gap-3 mb-1">
                                    <Plane />
                                    <h4 className="text-xl font-bold mb-2">
                                        {' '}
                                        {flight.destination}
                                    </h4>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex w-full space-x-1 items-center">
                                        <CornerUpRight />
                                        <DateInput
                                            selectedDate={departureDate}
                                            onDateSelect={setDepartureDate}
                                            placeholderText="Departure"
                                            disabledPredicate={disableDepartureDates}
                                        />
                                    </div>

                                    <div className="flex w-full space-x-1 items-center">
                                        <CornerUpLeft />
                                        <DateInput
                                            selectedDate={returnDate}
                                            onDateSelect={setReturnDate} 
                                            placeholderText="Return"
                                            disabledPredicate={disableReturnDates} 
                                        />
                                    </div>
                                </div>
                                <PassengersInput />
                            </div>
                        ) : (
                            <p className="p-4 text-gray-900">
                                    Select a flight to see its details.
                            </p>
                        )}
                    </ScrollArea>

                    <SheetFooter className="px-0 pt-0">
                        <p className="text-2xl font-bold my-1 text-green-900 ml-auto">
                            Total: ${totalPrice}
                        </p>
                        <Button
                            onClick={handleSelectFlight}
                            disabled={!areAllEssentialFieldsFilled()}
                        >
                            Continue
                        </Button>
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
