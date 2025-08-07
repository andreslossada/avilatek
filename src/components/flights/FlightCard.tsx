import { calculateFlightDuration } from "@/lib/utils";
import { Flight } from "@/types/flight";
import { Clock, Hourglass, Plane } from "lucide-react";
import { format } from "@formkit/tempo"
import { Separator } from "../ui/separator";
import { FLIGHT_CLASS_LABELS } from "./ClassInput/types";

interface FlightCardProps {
    flight: Flight;
    onSelect: (flight: Flight) => void;
}
export function FlightCard({ flight, onSelect }: FlightCardProps) {

    const duration = calculateFlightDuration(flight.departure_at, flight.arrival_at);
    const departureTime = new Date(flight.departure_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const arrivalTime = new Date(flight.arrival_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const shortDepartureDate = format(flight.departure_at, 'ddd, MMM D');
    const shortArrivalDate = format(flight.arrival_at, 'ddd, MMM D');

    const handleSelect = () => {
        onSelect(flight);
    }

    return (
        <li
            className="w-full group flex  cursor-pointer bg-white hover:bg-gray-200 transition-colors duration-200 rounded-md shadow-lg "
            onClick={handleSelect}
        >
            <div className="grid grid-cols-4 align-middle justify-between items-end  flex-grow  border-r px-3 py-4 group-hover:border-gray-300 text-gray-900">
                <div className="align-middle h-full px-2 ">
                    <Plane className="text-gray-600 " />
                    <p className="text-lg text-gray-800">{flight.airline.name}</p>
                    <p className="text-xs italic text-gray-600">{flight.flight_number}</p>
                </div>
                <div className='h-full  text-right'>

                    <p className="flex items-center gap-1 font-semibold text-base  text-gray-900 ">
                        <Clock className="size-4 text-muted-foreground text-sm ml-auto" />
                        {departureTime}
                    </p>
                    <p className="font-medium text-sm text-gray-700">{`${flight.departure_city} (${flight.departure_airport.iataCode})`}</p>
                    <p className="font-light text-xs  text-gray-900">{shortDepartureDate}</p>

                </div>
                <div className='content-center h-full  text-center px-12'>
                    <p className="font-semibold text-sm  text-gray-600 flex gap-1 justify-center items-center">
                        {duration}
                        <Hourglass className="size-3 stroke-4 text-muted-foreground  " />
                    </p>
                    <Separator className="my-1 group-hover:bg-gray-300" />
                    <p className="text-xs">{FLIGHT_CLASS_LABELS[flight.class_type]}</p>
                </div>
                <div className=" h-full text-left">
                    <p className="flex justify-start items-center gap-1 font-semibold text-base  text-gray-900 ">
                        {arrivalTime}
                        <Clock className="size-4 text-muted-foreground text-sm  " />
                    </p>
                    <p className="font-medium text-sm text-gray-700">{`${flight.destination_city} (${flight.destination_airport.iataCode})`}</p>
                    <p className="font-light text-xs  text-gray-900">{shortArrivalDate}</p>

                </div>
            </div>
            <div className=" px-6 py-4 flex items-end justify-end flex-col">

                <p className=" w-[200px]  text-xl font-bold text-green-900 flex justify-end ">
                    ${flight.price} <span className="text-muted-foreground text-sm mt-auto pb-1 pl-1">/person</span>
                </p>
                <p className="text-xs text-gray-600">
                    {`Total: ${flight.price}`}
                </p>
            </div>
        </li>
    );
}
