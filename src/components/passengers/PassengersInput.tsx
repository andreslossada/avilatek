// src/components/PassengersInput.tsx

import React from 'react';
import { useSearchFormStore, TravelerDetail } from '@/store/searchFormStore';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PassengerCounter } from './PassengerCounter';
import { ContactRound, IdCard, PawPrint, Briefcase, Shield, Crown, Sofa, Hospital } from 'lucide-react';
import { DateInput } from '../flights/DateInput';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DOCUMENT_TYPES } from '@/lib/constants';
import { Flight } from "@/types/types";

interface PassengersInputProps {
    flight?: Flight
}

export function PassengersInput({ flight }: PassengersInputProps) {
    const {
        numberOfTravelers,
        travelerDetails,
        setTravelerDetails,
        hasPets,
        setHasPets,
        numberOfPets,
        setNumberOfPets,
        hasExtraBags,
        setHasExtraBags,
        numberOfExtraBags,
        setNumberOfExtraBags,
        hasInsurance,
        setHasInsurance,
        hasPreferentialSeating,
        setHasPreferentialSeating,
        flightClass,
        specialAssistanceDescription,
        hasSpecialNeeds,
        setHasSpecialNeeds,
        setSpecialAssistanceDescription,
    } = useSearchFormStore();

    const handleTravelerDetailChange = (
        index: number,
        field: keyof TravelerDetail,
        value: string | Date | undefined,
    ) => {
        if (field === 'id') return;

        const updatedDetails = [...travelerDetails];
        if (!updatedDetails[index]) {
            updatedDetails[index] = {
                id: `traveler-${index + 1}`,
                fullName: '',
                documentType: '',
                documentNumber: '',
                dateOfBirth: undefined,
            };
        }
        (updatedDetails[index] as any)[field] = value;

        setTravelerDetails(updatedDetails);
    };

    const disableFutureDates = (date: Date) => date > new Date();

    return (
        <div className="space-y-6 mt-5">
            <div className="flex justify-between items-center">
                <p className="flex gap-2 text-base font-medium text-muted-foreground ">
                    <Sofa />
                    {flight && flight.class}
                </p>
                <PassengerCounter />
            </div>

            {Array.from({ length: numberOfTravelers }).map((_, index) => (
                <div
                    key={travelerDetails[index]?.id || `traveler-form-${index}`}
                    className="border p-4 rounded-md space-y-3 shadow"
                >
                    <h3 className="text-sm font-semibold">Passenger {index + 1}</h3>

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
                            onDateSelect={(date) =>
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
                                <SelectValue placeholder="Tipo" />
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
                    <Switch id="has-pets" checked={hasPets} onCheckedChange={setHasPets} />
                    {hasPets && (
                        <Input
                            id="num-pets"
                            type="number"
                            min="0"
                            value={numberOfPets ?? 0}
                            onChange={(e) => setNumberOfPets(Number(e.target.value))}
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
                        checked={hasExtraBags}
                        onCheckedChange={setHasExtraBags}
                    />
                    {hasExtraBags && (
                        <Input
                            id="num-extra-bags"
                            type="number"
                            min="0"
                            value={numberOfExtraBags ?? 0}
                            onChange={(e) => setNumberOfExtraBags(Number(e.target.value))}
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
                        onCheckedChange={setHasInsurance}
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
                        onCheckedChange={setHasPreferentialSeating}
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
                        onCheckedChange={setHasSpecialNeeds}
                    />
                </div>
                {hasSpecialNeeds && (
                    <Input
                        id="desc-needs"
                        type="text"
                        value={specialAssistanceDescription || ''}
                        onChange={(e) => setSpecialAssistanceDescription(e.target.value)}
                        placeholder="Describe your needs"
                        className="w-full"
                    />
                )}
            </div>
        </div>
    );
}
