import React from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDownIcon, MapPin } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useCitySearch } from '@/hooks/useCitySearch';
import type { CityInputProps } from './types';

export function CityInput({
    type,
    placeholder,
    value,
    onCitySelect,
    className,
    disabled = false,
    required = false
}: CityInputProps) {
    const {
        isOpen,
        setIsOpen,
        isSearching,
        searchTerm,
        selectedCity,
        cities,
        handleSearchChange,
        handleCitySelect,
    } = useCitySearch({ type, onCitySelect });

    const displayValue = value || selectedCity;
    const buttonText = displayValue || `${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const searchPlaceholder = placeholder || `${type.charAt(0).toUpperCase() + type.slice(1)}`;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-required={required}
                    disabled={disabled}
                    className={cn("w-full justify-between", !displayValue && "text-muted-foreground", className)}
                >
                    <MapPin />
                    {buttonText}
                    <ChevronsUpDownIcon className=" h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onValueChange={handleSearchChange}
                    />
                    <CommandList>
                        {isSearching && (
                            <CommandEmpty>Searching...</CommandEmpty>
                        )}
                        {!isSearching && searchTerm.trim() !== '' && cities.length === 0 && (
                            <CommandEmpty>No cities found</CommandEmpty>
                        )}
                        <CommandGroup>
                            {cities.map((city, index) => (
                                <CommandItem
                                    key={`${city}-${index}`}
                                    value={city}
                                    onSelect={() => handleCitySelect(city)}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            displayValue === city ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    {city}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}