import { faker } from '@faker-js/faker';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PassengerCounter } from './PassengerCounter';
import { ContactRound, IdCard, PawPrint, Briefcase, Shield, Crown, Sofa, Hospital, Undo2, Dices } from 'lucide-react';
import { DateInput } from '../flights/DateInput';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DOCUMENT_TYPES } from '@/lib/constants';
import { FLIGHT_CLASS_LABELS } from "../flights/ClassInput/types";
import { Flight } from "@/types/flight";
import { TravelerDetail } from "../flights/FlightDetailsSheet";
import { Button } from "../ui/button";
import { BookingDetails } from "@/app/page";

interface PassengersInputProps {
    flight?: Flight;
    bookingDetails: BookingDetails;
    setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
}

export function PassengersInput({ bookingDetails, setBookingDetails }: PassengersInputProps) {

    const {
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
        flight
    } = bookingDetails;

    const handleTravelerDetailChange = (
        index: number,
        field: keyof TravelerDetail,
        value: string | Date | undefined,
    ) => {

        // Create a copy of the travelerDetails array to avoid direct state mutation

        const updatedDetails = [...travelerDetails];

        // Ensure the traveler detail exists at the index, if not, create a new one
        if (!updatedDetails[index]) {
            updatedDetails[index] = {
                id: `traveler-${index + 1}`,
                fullName: '',
                documentType: '',
                documentNumber: '',
                dateOfBirth: undefined,
            };
        }
        // Copia el objeto traveler individual
        const updatedTraveler = {
            ...updatedDetails[index],
            [field]: value,
        };
        // Asigna el traveler copiado y actualizado de nuevo al array copiado
        updatedDetails[index] = updatedTraveler;

        setBookingDetails(prevDetails => ({
            ...prevDetails,
            travelerDetails: updatedDetails,
        }));
    };

    const disableFutureDates = (date: Date) => date > new Date();

    const handleRandomizeTravelerDetails = (index: number) => {
        const randomDocumentTypes = DOCUMENT_TYPES.map(type => type.value);

        setBookingDetails(prevDetails => {
            // Copia el array de viajeros para mantener la inmutabilidad
            const updatedTravelers = [...prevDetails.travelerDetails];

            // Crea un nuevo objeto de viajero con datos aleatorios
            const newRandomTraveler = {
                id: updatedTravelers[index]?.id || `traveler-${index + 1}`,
                fullName: faker.person.fullName(),
                documentType: randomDocumentTypes[Math.floor(Math.random() * randomDocumentTypes.length)],
                documentNumber: faker.string.numeric(8),
                dateOfBirth: faker.date.birthdate(),
            };

            // Reemplaza el viajero en el índice específico con el nuevo viajero aleatorio
            updatedTravelers[index] = newRandomTraveler;

            // Devuelve el nuevo estado con el array de viajeros actualizado
            return {
                ...prevDetails,
                travelerDetails: updatedTravelers,
            };
        });


    };

    const handleDeleteTravelerDetail = (index: number) => {
        setBookingDetails(prevDetails => {
            // Copia el array de viajeros para mantener la inmutabilidad
            const updatedTravelers = [...prevDetails.travelerDetails];

            // Crea un nuevo objeto de viajero con campos vacíos, manteniendo el ID
            const clearedTraveler = {
                id: updatedTravelers[index]?.id || `traveler-${index + 1}`,
                fullName: '',
                documentType: '',
                documentNumber: '',
                dateOfBirth: undefined,
            };

            // Reemplaza el viajero en el índice específico con el objeto limpio
            updatedTravelers[index] = clearedTraveler;

            // Devuelve el nuevo estado con el array de viajeros actualizado
            return {
                ...prevDetails,
                travelerDetails: updatedTravelers,
            };
        });
    };

    const handlePassengerCountChange = (count: number) => {
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            numberOfTravelers: count,
        }));
    };

    return (
        <div className="space-y-6 mt-5 max-w-full ">
            <div className="flex justify-between items-center ">
                <p className="flex gap-2 text-base font-medium text-muted-foreground ">
                    <Sofa />
                    {flight && FLIGHT_CLASS_LABELS[flight.class_type]}
                </p>
                <PassengerCounter numberOfPassengers={numberOfTravelers} onCountChange={handlePassengerCountChange} />
            </div>

            {Array.from({ length: numberOfTravelers }).map((_, index) => (
                <div
                    key={`traveler-form-${index}}`}
                    className="border p-4 rounded-md space-y-3 shadow"
                >
                    <header className="flex items-center justify-between ">
                    <h3 className="text-sm font-semibold">Passenger {index + 1}</h3>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="cursor-pointer"
                                onClick={() => handleRandomizeTravelerDetails(index)}
                            >
                                <Dices className="size-6 text-muted-foreground "
                                />
                            </Button>
                            <Button variant="ghost" size="icon" className="cursor-pointer"
                                onClick={() => handleDeleteTravelerDetail(index)}>
                                <Undo2 className="size-6 text-muted-foreground cursor-pointer" />
                            </Button>
                        </div>
                    </header>

                    {/* Name */}
                    <div className="flex gap-2 items-center">
                        <ContactRound className="h-5 w-5 text-muted-foreground" />
                        <Input
                            id={`fullName-${index}`}
                            placeholder="Full Name"
                            value={travelerDetails[index]?.fullName || ''}
                            onChange={(e) =>
                                handleTravelerDetailChange(index, 'fullName', e.target.value)
                            }
                            required
                        />
                    </div>

                    {/* Birthday */}
                    <div className="flex gap-2 items-center ">
                        <DateInput
                            selectedDate={travelerDetails[index]?.dateOfBirth}
                            onDateSelect={(date: any) =>
                                handleTravelerDetailChange(index, 'dateOfBirth', date)
                            }
                            placeholderText="Birthdate"
                            disabledPredicate={disableFutureDates}
                            calendarCaptionLayout="dropdown"
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-between">
                        <IdCard className="h-5 w-5 text-muted-foreground" />
                        <Select
                            value={travelerDetails[index]?.documentType || ''}
                            onValueChange={(value) =>
                                handleTravelerDetailChange(index, 'documentType', value)
                            }
                        >
                            <SelectTrigger id={`documentType-${index}`} className="w-auto">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {DOCUMENT_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            id={`documentNumber-${index}`}
                            placeholder="ID number"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={travelerDetails[index]?.documentNumber || ''}
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                handleTravelerDetailChange(index, 'documentNumber', numericValue);
                            }}
                            className="w-2/3"
                        />
                    </div>
                </div>
            ))}

            {/* --- Optionals --- */}
            <div className="space-y-4 mt-8 pt-4 border-t">
                <h3 className="text-sm font-bold">Optional</h3>

                <div className="flex items-center justify-start space-x-3 h-6">
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="has-pets" className="text-base cursor-pointer">
                            Pets
                        </Label>
                    </div>
                    <Switch
                        id="has-pets"
                        checked={bookingDetails.hasPets}
                        onCheckedChange={(value) =>
                            setBookingDetails(prev => ({
                                ...prev,
                                hasPets: value,
                            }))
                        }
                    />
                    {hasPets && (
                        <Input
                            id="num-pets"
                            type="number"
                            min="0"
                            max="3"
                            value={numberOfPets ?? 0}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                const newNumberOfPets = Math.min(value, 3);
                                setBookingDetails(prev => ({
                                    ...prev,
                                    numberOfPets: newNumberOfPets,
                                }));
                            }}
                            className="w-16 ml-auto"
                        />
                    )}
                </div>

                <div className="flex items-center justify-start space-x-3  h-6 ">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="has-extra-bags" className="text-base cursor-pointer">
                            Extra Suitcases
                        </Label>
                    </div>
                    <Switch
                        id="has-extra-bags"
                        checked={bookingDetails.hasExtraBags}
                        onCheckedChange={(value) =>
                            setBookingDetails(prev => ({
                                ...prev,
                                hasExtraBags: value,
                            }))
                        }
                    />
                    {hasExtraBags && (
                        <Input
                            id="num-extra-bags"
                            type="number"
                            min="0"
                            value={numberOfExtraBags ?? 0}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                const newNumber = Math.min(value, 3);
                                setBookingDetails(prev => ({
                                    ...prev,
                                    numberOfExtraBags: newNumber,
                                }));
                            }}
                            className="w-16 ml-auto"
                        />
                    )}
                </div>
                <div className="flex items-center justify-start space-x-3  h-6 ">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="has-extra-bags" className="text-base cursor-pointer">
                            Insurance
                        </Label>
                    </div>
                    <Switch
                        id="has-extra-bags"
                        checked={hasInsurance}
                        onCheckedChange={(value) =>
                            setBookingDetails(prev => ({
                                ...prev,
                                hasInsurance: value,
                            }))
                        }
                    />
                </div>
                <div className="flex items-center justify-start space-x-3  h-6 ">
                    <div className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="has-extra-bags" className="text-base cursor-pointer">
                            Preferential Seating
                        </Label>
                    </div>
                    <Switch
                        id="has-extra-bags"
                        checked={hasPreferentialSeating}
                        onCheckedChange={(value) =>
                            setBookingDetails(prev => ({
                                ...prev,
                                hasPreferentialSeating: value,
                            }))
                        }
                    />
                </div>
                <div className="flex items-center justify-start space-x-3  h-6 ">
                    <div className="flex items-center gap-2">
                        <Hospital className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="has-extra-bags" className="text-base cursor-pointer">
                            Special Assistance
                        </Label>
                    </div>
                    <Switch
                        id="has-needs"
                        checked={hasSpecialNeeds}
                        onCheckedChange={(value) =>
                            setBookingDetails(prev => ({
                                ...prev,
                                hasSpecialNeeds: value,
                            }))
                        }
                    />
                </div>
                {hasSpecialNeeds && (
                    <Input
                        id="desc-needs"
                        type="text"
                        value={specialAssistanceDescription || ''}
                        onChange={(e) => {
                            setBookingDetails(prev => ({
                                ...prev,
                                specialAssistanceDescription: e.target.value,
                            }));
                        }}
                        placeholder="Describe your needs"
                        className="w-full"
                        maxLength={200}
                    />
                )}
            </div>
        </div>
    );
}
