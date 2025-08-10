export type FlightClassOptions = 'economy' | 'business' | 'first_class' | 'any_class';

export const FLIGHT_CLASS_LABELS = {
    economy: 'Economy',
    business: 'Business',
    first_class: 'First class',
    any_class: 'Any class',
} as const;

export type FlightClassType = keyof typeof FLIGHT_CLASS_LABELS;
export interface ClassInputProps {
    value?: FlightClassOptions;
    onChange: (value: FlightClassOptions) => void;
    isDisabled?: boolean;
}
