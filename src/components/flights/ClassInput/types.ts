export type FlightClassOptions = 'economy' | 'business' | 'first-class' | 'any-class';

export const FLIGHT_CLASS_LABELS = {
    economy: 'Economy',
    business: 'Business',
    'first-class': 'First Class',
    'any-class': 'Any Class',
} as const;

export interface ClassInputProps {
    value?: FlightClassOptions;
    onChange: (value: FlightClassOptions) => void;
}
