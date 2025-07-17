// src/components/PassengersInput.tsx

import React from 'react';
import { useSearchFormStore, TravelerDetail } from '@/store/searchFormStore';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Si tu PassengerCounter no es relevante aquí directamente, puedes removerlo.
// Si maneja el numero de viajeros y lo muestra, entonces esta bien que este.
import { PassengerCounter } from "./PassengerCounter";
import { ContactRound, IdCard, PawPrint, Briefcase } from "lucide-react"; // ✨ Nuevos iconos para mascotas y maletas
import { DateInput } from "./DateInput";
import { Switch } from '@/components/ui/switch'; // ✨ Necesitas este componente de Shadcn UI
import { Label } from '@/components/ui/label'; // ✨ Y este componente de Shadcn UI para las etiquetas de Switch

export function PassengersInput() {
    const {
        numberOfTravelers,
        travelerDetails,
        setTravelerDetails,
        // ✨ Nuevos estados y acciones para los opcionales
        hasPets,
        setHasPets,
        numberOfPets,
        setNumberOfPets,
        hasExtraBags,
        setHasExtraBags,
        numberOfExtraBags,
        setNumberOfExtraBags,
    } = useSearchFormStore();

    const documentTypes = [
        { value: 'dni', label: 'DNI' },
        { value: 'passport', label: 'Pasaporte' },
        { value: 'other', label: 'Otro' },
    ];

    const handleTravelerDetailChange = (index: number, field: keyof TravelerDetail, value: string | Date | undefined) => {
        if (field === 'id') return;

        const updatedDetails = [...travelerDetails];
        if (!updatedDetails[index]) {
            updatedDetails[index] = {
                id: `traveler-${index + 1}`,
                fullName: '',
                documentType: '',
                documentNumber: '',
                dateOfBirth: undefined
            };
        }
        (updatedDetails[index] as any)[field] = value;

        setTravelerDetails(updatedDetails);
    };

    // Función para deshabilitar fechas futuras (para fecha de nacimiento)
    const disableFutureDates = (date: Date) => date > new Date();


    return (
        <div className="space-y-6 mt-8">
            <h2 className="text-lg font-bold">Información de los Viajeros</h2>
            <PassengerCounter /> {/* Asumo que este componente controla numberOfTravelers */}

            {Array.from({ length: numberOfTravelers }).map((_, index) => (
                <div key={travelerDetails[index]?.id || `traveler-form-${index}`} className="border p-4 rounded-md space-y-3 shadow">
                    <h3 className="text-sm font-semibold">Viajero {index + 1}</h3>

                    {/* Name */}
                    <div className="flex gap-2 items-center">
                        <ContactRound className="h-5 w-5 text-muted-foreground" />
                        <Input
                            id={`fullName-${index}`}
                            placeholder="Full Name"
                            value={travelerDetails[index]?.fullName || ''}
                            onChange={(e) => handleTravelerDetailChange(index, 'fullName', e.target.value)}
                            required
                        />
                    </div>

                    {/* Birthday */}
                    <div className="flex gap-2 items-center text-muted-foreground">
                        <DateInput
                            selectedDate={travelerDetails[index]?.dateOfBirth}
                            onDateSelect={(date) => handleTravelerDetailChange(index, 'dateOfBirth', date)}
                            placeholderText="Birthdate" // Etiqueta más concisa aquí
                            disabledPredicate={disableFutureDates}
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-between">
                        <IdCard className="h-5 w-5 text-muted-foreground" />
                        <Select
                            value={travelerDetails[index]?.documentType || ''}
                            onValueChange={(value) => handleTravelerDetailChange(index, 'documentType', value)}
                        >
                            <SelectTrigger id={`documentType-${index}`} className="w-1/3"> {/* Ajusta el ancho */}
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {documentTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            id={`documentNumber-${index}`}
                            placeholder="Número de Identificación"
                            value={travelerDetails[index]?.documentNumber || ''}
                            onChange={(e) => handleTravelerDetailChange(index, 'documentNumber', e.target.value)}
                            className="w-2/3"
                        />
                    </div>
                </div>
            ))}

            {/* --- Seccion de Opcionales --- */}
            <div className="space-y-4 mt-8 pt-4 border-t">
                <h3 className="text-sm font-bold">Opcionales</h3>

                {/* ¿Viajas con mascotas? */}
                <div className="flex items-center justify-start space-x-3 h-6">
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="has-pets" className="text-base cursor-pointer">Pets</Label>
                    </div>
                    <Switch
                        id="has-pets"
                        checked={hasPets}
                        onCheckedChange={setHasPets}
                    />
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


                {/* ¿Necesitas maletas extra? */}
                <div className="flex items-center justify-start space-x-3  h-6 ">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="has-extra-bags" className="text-base cursor-pointer">Extra Suitcases</Label>
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

            </div>
        </div>
    );
}