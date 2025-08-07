export type FlightClassOptions = 'economy' | 'business' | 'first-class' | 'any-class';

export const FLIGHT_CLASS_LABELS = {
    economy: 'Economy',
    business: 'Business',
    first_class: 'First Class',
    any_class: 'Any Class',
} as const;

export type FlightClassType = keyof typeof FLIGHT_CLASS_LABELS;
export interface ClassInputProps {
    value?: FlightClassOptions;
    onChange: (value: FlightClassOptions) => void;
}
