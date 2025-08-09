import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';
import { Sofa } from 'lucide-react';
import { ClassInputProps, FLIGHT_CLASS_LABELS, FlightClassOptions } from "./types";


// Para mostrar en UI, mapeas a labels legibles


export function ClassInput({ value, onChange }: ClassInputProps) {
    return (
        <Select
            onValueChange={(value: FlightClassOptions) => onChange(value)}
        >
            <SelectTrigger className="flex items-center space-x-2 ">
                <Sofa className="size-5" />
                <SelectValue
                    // placeholder={flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}
                />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(FLIGHT_CLASS_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
