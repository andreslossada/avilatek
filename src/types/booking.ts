import { Flight } from './flight';

export interface TravelerDetail {
    id: string;
    fullName: string;
    documentType: string;
    documentNumber: string;
    dateOfBirth?: Date;
}

export interface BookingDetails {
    flight?: Flight;
    numberOfTravelers: number;
    travelerDetails: TravelerDetail[];
    hasPets: boolean;
    numberOfPets?: number;
    hasExtraBags: boolean;
    numberOfExtraBags?: number;
    hasInsurance: boolean;
    hasPreferentialSeating: boolean;
    hasSpecialNeeds: boolean;
    specialAssistanceDescription: string;
}

export const initialBookingState: BookingDetails = {
    flight: undefined,
    numberOfTravelers: 1,
    travelerDetails: [],
    hasPets: false,
    numberOfPets: undefined,
    hasExtraBags: false,
    numberOfExtraBags: undefined,
    hasInsurance: false,
    hasPreferentialSeating: false,
    hasSpecialNeeds: false,
    specialAssistanceDescription: '',
};
