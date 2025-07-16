'use client'

import { useState } from 'react'
import { Calendar, MapPin, Users, Search, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { FlightSearchFormProps, SearchFormData } from "@/types/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"


export function FlightSearchForm(
    { onSubmit }: FlightSearchFormProps
) {
    const [destination, setDestination] = useState<string>('');
    const [departureDate, setDepartureDate] = useState<Date>()
    const [returnDate, setReturnDate] = useState<Date>()
    const [passengers, setPassengers] = useState(1)
    const [classType, setClassType] = useState<'economy' | 'business' | 'first'>('economy'); 


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData: SearchFormData = {
            destination,
            departureDate,
            returnDate,
            passengers,
            class: 'economy' // Default class, can be changed later


        };

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'Select date'
        return date.toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const incrementPassengers = () => {
        if (passengers < 10) {
            setPassengers(passengers + 1)
        }
    }

    const decrementPassengers = () => {
        if (passengers > 1) {
            setPassengers(passengers - 1)
        }
    }

    const handlePassengerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value >= 1 && value <= 10) {
            setPassengers(value)
        } else if (e.target.value === '') {
            setPassengers(1)
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-lg ">
            <CardContent className="px-6 py-4">

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4  items-end justify-end">

                    <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="to"
                                placeholder="Destination city"
                                className="pl-10"
                                onChange={(e) => setDestination(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Departure</Label>
                        <Popover >
                            <PopoverTrigger asChild>
                                <div className={cn(
                                    "inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm transition-all",
                                    "h-9 px-4 py-2 w-full cursor-pointer",
                                    "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                                )}>
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(departureDate)}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                    mode="single"
                                    selected={departureDate}
                                    onSelect={setDepartureDate}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>


                    <div className="space-y-2 ">
                        <Label>Return</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className={cn(
                                    "w-full flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm transition-all ",
                                    "h-9 px-4 py-2 w-full cursor-pointer ",
                                    "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground "
                                )}>
                                    <Calendar className="h-4 w-4 " />
                                    {formatDate(returnDate)}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                    mode="single"
                                    selected={returnDate}
                                    onSelect={setReturnDate}
                                    disabled={(date) => date < (departureDate || new Date())}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                    </div>



                    <div className="space-y-2 ">
                        <Label>Passengers</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className={cn(
                                    "inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm transition-all",
                                    "h-9  py-2 w-full px-4 cursor-pointer",
                                    "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                                )}>
                                    <Users className="h-4 w-4" />
                                    {passengers} , {classType.charAt(0).toUpperCase() + classType.slice(1)}


                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto py-2 px-4" align="start">
                                <h4 className="leading-none font-semibold text-xs">
                                    Personas y Clase de vuelo
                                </h4>
                                <div className="flex items-center justify-between mt-2 gap-3">
                                    <Label>Adultos</Label>
                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 shrink-0"
                                            onClick={decrementPassengers}
                                            disabled={passengers <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={passengers}
                                            onChange={handlePassengerInputChange}
                                            min="1"
                                            max="10"
                                            className="border-0 text-center px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 shrink-0"
                                            onClick={incrementPassengers}
                                            disabled={passengers >= 10}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={classType.charAt(0).toUpperCase() + classType.slice(1)} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="economy"> Economy</SelectItem>
                                            <SelectItem value="business">Business</SelectItem>
                                            <SelectItem value="first">First Class</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>


                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button size="default" className="px-8 ">
                        <Search className="mr-2 h-4 w-4" />
                        Search Flights
                    </Button>

                </form >

            </CardContent>
        </Card>
    )
}