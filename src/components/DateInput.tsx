import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from './ui/calendar'
import { cn, formatDate } from "@/lib/utils";
import { useSearchFormStore } from "@/store/searchFormStore";
import { DateInputProps } from "@/types/types";

export function DateInput({
    selectedDate,
    onDateSelect,
    placeholderText,
    disabledPredicate,
}: DateInputProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className={cn(
                    "inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm transition-all",
                    "h-9 px-4 py-2 w-full cursor-pointer",
                    "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                )}>
                    <CalendarIcon className="h-4 w-4" />
                    {selectedDate ? formatDate(selectedDate) : placeholderText}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={onDateSelect}
                    disabled={disabledPredicate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}