import React from 'react';
import { FlightCardProps } from '@/types/types';

export function FlightCard({ flight, onSelect }: FlightCardProps) {
    return (
        <li
            className="border-b pb-2 last:border-b-0 cursor-pointer p-4 hover:bg-gray-50 transition-colors duration-200 rounded-md"
            onClick={() => onSelect(flight)}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-lg text-gray-900">{flight.destination}</p>
                    <p className="font-medium text-sm text-gray-700">{flight.class}</p>
                </div>
                <p className="text-xl font-bold text-green-900">
                    ${flight.priceUSD} <span className="text-muted-foreground text-sm">each</span>
                </p>
            </div>
        </li>
    );
}
