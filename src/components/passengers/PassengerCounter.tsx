import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Minus, Plus, User } from 'lucide-react';


interface PassengerCounterProps {
    numberOfPassengers: number;
    onCountChange: (count: number) => void;
}
export function PassengerCounter({ numberOfPassengers, onCountChange }: PassengerCounterProps) {


    const handlePassengerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);

        if (!isNaN(value) && value >= 1 && value <= 10) {
            onCountChange(value);
        } else if (e.target.value === '') {
            onCountChange(1);
        }
    }
    const incrementPassengers = () => {
        if (numberOfPassengers < 10) {
            onCountChange(numberOfPassengers + 1);
        }
    };

    const decrementPassengers = () => {
        if (numberOfPassengers > 1) {
            onCountChange(numberOfPassengers - 1);
        }
    };

    return (
        <div className="flex gap-1 items-center">
            <User className="size-5 text-muted-foreground" />
            <div className="flex">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={decrementPassengers}
                    disabled={numberOfPassengers <= 1}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <Input
                    type="number"
                    value={numberOfPassengers}
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
                    disabled={numberOfPassengers >= 10}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
