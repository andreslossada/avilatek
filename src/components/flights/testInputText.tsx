import React from "react";
export function TestInputText({
    departureParam,
    departureHandler,
    city,
    index,
    setDepartureParam
}) {
    return <div className="space-y-2">
        <Label htmlFor="to">to</Label>

        <Command className="rounded-lg border shadow-md">
            <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <CommandInput placeholder="Going to" className="pl-10" value={departureParam} onValueChange={departureHandler} // onChange={departureHandler}
                />
            </div>
            {possibleCities.length > 0 && <CommandList>
                <CommandGroup>
                    {possibleCities.map((city, index) => <CommandItem key={`${city}-${index}`} value={city} onSelect={() => {
                        setDepartureParam(city); // Si necesitas cerrar algo más
                    }}>
                        {city}
                    </CommandItem>)}
                </CommandGroup>
            </CommandList>}
        </Command>
    </div>;
}
