export const COST_PER_PET = 100;
export const COST_PER_EXTRA_BAG = 50;

export const MAX_TRAVELERS = 10; 

export const FLIGHT_CLASSES = [
    { value: 'economy', label: 'Economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First Class' },
    { value: 'any', label: 'Any Class' }, 
];
export const DOCUMENT_TYPES = [
    { value: 'dni', label: 'DNI' },
    { value: 'ci', label: 'C.I.' },
    { value: 'passport', label: 'Passport' },
    { value: 'other', label: 'Other' },
];
export const DEFAULT_FLIGHT_CLASS = 'economy'; 

export const DATE_PICKER_OPTIONS = {
    locale: 'en-US', 
    disablePast: true, 
};

export const MAX_PETS = 3; 
export const MAX_EXTRA_BAGS = 5; 
export const MAX_TRAVELER_AGE = 120; 

export const FLIGHT_API_URL = 'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json';
