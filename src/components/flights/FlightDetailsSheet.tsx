import React, { useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { FlightConfirmationDialog } from './FlightConfirmationDialog';
import { Button } from '../ui/button';
import { TravelerDetail, useSearchFormStore } from '@/store/searchFormStore';
import { DateInput } from './DateInput';
import { PassengersInput } from '../passengers/PassengersInput';
import { ScrollArea } from '../ui/scroll-area';
import { CornerUpLeft, CornerUpRight, Plane } from 'lucide-react';
import { COST_PER_EXTRA_BAG, COST_PER_PET } from '@/lib/constants';
import { FlightDetailsSheetProps } from "@/types/flight";

export interface BookingDetails {
    numberOfTravelers: number;
    travelerDetails: TravelerDetail[];
    hasPets: boolean;
    numberOfPets?: number;
    hasExtraBags: boolean;
    numberOfExtraBags?: number;
    hasInsurance: boolean;
    hasPreferentialSeating: boolean;
    hasSpecialNeeds: boolean;
    specialAssistanceDescription: string;
}

const initialBookingState: BookingDetails = {
    numberOfTravelers: 1,
    travelerDetails: [],
    hasPets: false,
    numberOfPets: undefined,
    hasExtraBags: false,
    numberOfExtraBags: undefined,
    hasInsurance: false,
    hasPreferentialSeating: false,
    hasSpecialNeeds: false,
    specialAssistanceDescription: '',
};
export function FlightDetailsSheet({ isOpen, onOpenChange, flight }: FlightDetailsSheetProps) {
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>(initialBookingState);

    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>(false);

    const disablePastDates = (date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0));
    const disableDepartureDates = (date: Date) => {
        //Disable past dates
        if (disablePastDates(date)) {
            return true;
        }
        //If returnDate is selected, disable any departure date after returnDate
        // if (returnDate && date > returnDate) {
        //     return true;
        // }
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
        alert(`Flight booking to ${flight?.destination_airport} confirmed!`);
        setIsAlertDialogOpen(false);
        onOpenChange(false);
    };
    let totalPrice = flight ? flight.price * useSearchFormStore.getState().numberOfTravelers : 0;

    if (bookingDetails.hasPets && bookingDetails.numberOfPets > 0) {
        totalPrice += (bookingDetails.numberOfPets ?? 0) * COST_PER_PET;
    }

    if (bookingDetails.hasExtraBags && bookingDetails.numberOfExtraBags > 0) {
        totalPrice += (bookingDetails.numberOfExtraBags ?? 0) * COST_PER_EXTRA_BAG;
    }

    const areAllEssentialFieldsFilled = () => {
        //Validate departure and return dates
        // if (!departureDate || !returnDate) {
        //     return false;
        // }

        //Validate the travelerDetails array has the same number of items as numberOfTravelers
        console.log(`🚀 ~ travelerDetails:`, bookingDetails.travelerDetails)
        if (bookingDetails.travelerDetails.length !== bookingDetails.numberOfTravelers) {
            return false;
        }

        for (let i = 0; i < bookingDetails.numberOfTravelers; i++) {
            const traveler = bookingDetails.travelerDetails[i];
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
        if (bookingDetails.hasPets && (bookingDetails.numberOfPets === undefined || bookingDetails.numberOfPets <= 0)) {
            return false;
        }
        if (bookingDetails.hasExtraBags && (bookingDetails.numberOfExtraBags === undefined || bookingDetails.numberOfExtraBags <= 0)) {
            return false;
        }
        if (bookingDetails.hasSpecialNeeds && !bookingDetails.specialAssistanceDescription) {
            return false;
        }

        //if all validations passed
        return true;
    };
    return (
        <>
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetContent side="right" className="px-4 bg-gray-100 ">
                    <SheetHeader className="px-0 pb-0">
                        <SheetTitle>Flight Details</SheetTitle>
                    </SheetHeader>

                    <ScrollArea className="flex-1 border rounded-md bg-white overflow-y-scroll inset-shadow-sm p-4">
                        {flight ? (
                            <div className=" text-gray-900 ">
                                <h4 className="flex text-xl  font-bold mb-4 w-full  leading-none gap-3 text-gray-600">
                                    {flight.departure_city}
                                    <Plane className="min-w-1 rotate-45" />
                                    {flight.destination_city}
                                </h4>
                                <div className="flex gap-2  items-center">
                                        <CornerUpRight />
                                    <DateInput
                                        // selectedDate={departureDate}
                                        // onDateSelect={setDepartureDate}
                                            placeholderText="Departure"
                                            disabledPredicate={disableDepartureDates}
                                        />


                                </div>
                                <PassengersInput
                                    bookingDetails={bookingDetails}
                                    setBookingDetails={setBookingDetails}
                                />
                            </div>
                        ) : (
                            <p className="p-4 text-gray-900">Select a flight to see its details.</p>
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
