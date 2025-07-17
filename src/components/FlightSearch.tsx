'use client';

import { MapPin, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FlightSearchFormProps, SearchFormData } from '@/types/types';
import { useSearchFormStore } from '@/store/searchFormStore';
import { ClassInput } from './ClassInput';
import { DateInput } from './DateInput';
import { PassengerCounter } from './PassengerCounter';

export function FlightSearchForm({ onSubmit }: FlightSearchFormProps) {

    const {
        destination,
        setDestination,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        flightClass,
        numberOfTravelers,
    } = useSearchFormStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData: SearchFormData = {
            destination,
            departureDate,
            returnDate,
            numberOfTravelers,
            flightClass,
        };

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const disablePastDates = (date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0));

    const disableDepartureDates = (date: Date) => {
        if (disablePastDates(date)) {
            return true;
        }
        if (returnDate && date > returnDate) {
            return true;
        }
        return false;
    };
    const disableReturnDates = (date: Date) => {
        if (disablePastDates(date)) {
            return true;
        }
        if (departureDate && date < departureDate) {
            return true;
        }
        return false;
    };

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-lg ">
            <CardContent className="px-6 py-4">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4  items-end justify-end"
                >
                    <div className="space-y-2">
                        <Label htmlFor="to">Destination</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="to"
                                placeholder="Going to"
                                className="pl-10"
                                onChange={(e) => setDestination(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Departure</Label>
                        <DateInput
                            selectedDate={departureDate}
                            onDateSelect={setDepartureDate}
                            placeholderText="Leaving"
                            disabledPredicate={disableDepartureDates}
                        />
                    </div>

                    <div className="space-y-2 ">
                        <Label>Return</Label>
                        <DateInput
                            selectedDate={returnDate}
                            onDateSelect={setReturnDate}
                            placeholderText="Returning"
                            disabledPredicate={disableReturnDates}
                        />
                    </div>

                    <div className="space-y-2 ">
                        <Label>Passengers</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div
                                    className={cn(
                                        'inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm transition-all',
                                        'h-9  py-2 w-full px-4 cursor-pointer',
                                        'border bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground',
                                    )}
                                >
                                    <Users className="h-4 w-4" />
                                    {numberOfTravelers} ,{' '}
                                    {flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto py-4 px-4 grid gap-2" align="start">
                                <PassengerCounter />
                                <ClassInput />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button size="default" className="px-8 ">
                        <Search className="mr-2 h-4 w-4" />
                        Search Flights
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
