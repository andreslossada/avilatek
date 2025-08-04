
export function FlightCard(flight: any) {

    return (
        <li
            className="w-full group flex  cursor-pointer bg-white hover:bg-gray-200 transition-colors duration-200 rounded-md shadow-lg "
        >
            <div className="flex justify-between items-end  flex-grow bg-blac border-r px-6 py-4 group-hover:border-gray-300 ">
                <div >

                    <p className="font-semibold  text-gray-900">11:55 am – 3:05 pm</p>
                    <p className="font-medium text-sm text-gray-700">{flight.airline.name}</p>
                </div>
                <div className="">
                    <p className="font-semibold  text-gray-900">9h 10m</p>
                    <p className="font-medium text-sm text-gray-700">{flight.departure_airport.iataCode}-{flight.destination_airport.iataCode}</p>

                </div>
            </div>
            <div className="px-6 py-4 flex items-end justify-end flex-col">

                <p className=" w-[200px]  text-xl font-bold text-green-900 flex justify-end ">
                    ${flight.price} <span className="text-muted-foreground text-sm mt-auto pb-1 pl-1">/person</span>
                </p>
                <p className="text-xs text-gray-600 ">
                    {flight.class_type.charAt(0).toUpperCase() + flight.class_type.slice(1)}
                </p>
                <p className="text-xs text-gray-600 border-t">
                    Total: $1400
                </p>
            </div>
        </li>
    );
}
