export const COST_PER_PET = 100;
export const COST_PER_EXTRA_BAG = 50;

export const MAX_TRAVELERS = 10; // Maximum number of travelers allowed

export const FLIGHT_CLASSES = [
    { value: 'economy', label: 'Economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First Class' },
    { value: 'any', label: 'Any Class' }, // For flexibility in searches
];
export const DOCUMENT_TYPES = [
    { value: 'dni', label: 'DNI' },
    { value: 'passport', label: 'Passport' },
    { value: 'other', label: 'Other' },
];
export const DEFAULT_FLIGHT_CLASS = 'economy'; // Default flight class for new searches



export const DATE_FORMAT = 'dd/MM/yyyy'; // Standard date format used in the application
export const DATE_PICKER_OPTIONS = {
    locale: 'en-US', // Default locale for date picker
    format: DATE_FORMAT, // Use the defined date format
    disablePast: true, // Disable past dates by default
};

export const MAX_PETS = 3; // Maximum number of pets allowed per booking
export const MAX_EXTRA_BAGS = 5; // Maximum number of extra bags allowed per booking
export const MAX_TRAVELER_AGE = 120; // Maximum age for a traveler
export const MIN_TRAVELER_AGE = 0; // Minimum age for a traveler