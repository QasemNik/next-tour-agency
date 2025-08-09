'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export function LocationCombobox({ value, setValue, placeholder, locations, isLoading }) {
    const [open, setOpen] = useState(false);

    // Find the full location object based on the selected value (id)
    const selectedLabel = locations?.find(loc => loc.id === value)?.name || placeholder;

    return (
        <Popover  open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox"
                 className="w-full justify-start font-normal border-gray-300 text-gray-600">
                    <MapPin className="ml-2 h-4 w-4 shrink-0" />
                    <span className="truncate">{isLoading ? "در حال بارگذاری..." : selectedLabel}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white  border-gray-300/80 mt-4 transition-all duration-75 shadow-xl ">
                <Command >
                    <CommandInput   placeholder="جستجوی شهر..." />
                    <CommandList >
                        <CommandEmpty>شهری یافت نشد.</CommandEmpty>
                        <CommandGroup>
                            {locations?.map((location) => (
                                <CommandItem
                                    className="cursor-pointer"
                                    key={location.id}
                                    // 1. Use location.name for filtering
                                    value={location.name}
                                    onSelect={(currentValue) => {
                                        // 2. Find the location object that matches the selected name
                                        const selectedLocation = locations.find(
                                            loc => loc.name.toLowerCase() === currentValue.toLowerCase()
                                        );
                                        if (selectedLocation) {
                                            // 3. Set the ID of the found location
                                            setValue(selectedLocation.id);
                                        }
                                        setOpen(false);
                                    }}
                                >
                                    {location.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
