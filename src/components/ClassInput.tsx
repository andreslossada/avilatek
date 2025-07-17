import { useSearchFormStore } from "@/store/searchFormStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FlightClassOptions } from "@/types/types";

export function ClassInput({ sheet }: { sheet?: boolean }) {
    const { flightClass, setFlightClass } = useSearchFormStore();
    return (
        <Select
            onValueChange={(selectedValue: FlightClassOptions) => setFlightClass(selectedValue)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={flightClass.charAt(0).toUpperCase() + flightClass.slice(1)} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="Economy"> Economy</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="First Class">First Class</SelectItem>
                    {
                        !sheet &&
                        <SelectItem value="Any Class">Any Class</SelectItem>
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}