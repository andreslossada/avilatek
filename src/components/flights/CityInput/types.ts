import type { CityInputType, CitySelectEvent } from '@/types/ui';

export interface CityInputProps {
    type: CityInputType;
    placeholder?: string;
    value?: string;
    onCitySelect?: (event: CitySelectEvent) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}
