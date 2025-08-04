export type CityInputType = 'departure' | 'destination';

export interface CitySelectEvent {
  city: string;
  type: CityInputType;
}