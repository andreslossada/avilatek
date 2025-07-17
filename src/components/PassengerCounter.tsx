import { useSearchFormStore } from "@/store/searchFormStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus } from "lucide-react";

export function PassengerCounter() {
    const { numberOfTravelers, setNumberOfTravelers } = useSearchFormStore()
    const handlePassengerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)

        if (!isNaN(value) && value >= 1 && value <= 10) {
            setNumberOfTravelers(value)
        } else if (e.target.value === '') {
            setNumberOfTravelers(1)
        }
    }
    const incrementPassengers = () => {
        if (numberOfTravelers < 10) {
            setNumberOfTravelers(numberOfTravelers + 1)
        }
    }

    const decrementPassengers = () => {
        if (numberOfTravelers > 1) {
            setNumberOfTravelers(numberOfTravelers - 1)
        }
    }
    return (
        <div className="flex gap-1">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={decrementPassengers}
                disabled={numberOfTravelers <= 1}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={numberOfTravelers}
                onChange={handlePassengerInputChange}
                min="1"
                max="10"
                className="border-0 text-center px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={incrementPassengers}
                disabled={numberOfTravelers >= 10}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}