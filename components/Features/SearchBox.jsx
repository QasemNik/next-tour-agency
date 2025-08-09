'use client';

import { useState } from 'react';

import { format } from 'date-fns'; // Use standard date-fns
import { useQuery, useMutation } from '@tanstack/react-query';
import { Calendar as CalendarIcon, MapPin, Repeat, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar'; // Use the standard calendar
import { LocationCombobox } from '@/components/Features/LocationCombobox '; // Assuming you have this component
import { getLocations } from '@/services/tourData';
import TourCard from './TourCard';


const searchTours = async ({ origin, destination, dateRange }) => {
    const query = new URLSearchParams({
        ...(origin && { origin }),
        ...(destination && { destination }),
        ...(dateRange?.from && { startDate: format(dateRange.from, 'yyyy-MM-dd') }),
        ...(dateRange?.to && { endDate: format(dateRange.to, 'yyyy-MM-dd') }),
    }).toString();

    const response = await fetch(`/api/tour/search?${query}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
};

// ====================================================================
// --- Main Search Box Component ---
// ====================================================================
export function HeroSearchBox() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [dateRange, setDateRange] = useState(null);

    const { data: locations, isLoading: isLoadingLocations } = useQuery({
        queryKey: ['locations'],
        queryFn: getLocations,
    });
    console.log("Locations from useQuery:", locations);

    const { mutate: performSearch, data: searchResults, isPending: isSearching, isError } = useMutation({
        mutationFn: searchTours,
    });

    const handleSwap = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    const handleSearch = () => {
        performSearch({ origin, destination, dateRange });
    };

    return (
        <div className="relative z-10 -mt-10">
            <div className="bg-white p-6 rounded-xl border border-gray-400/60 shadow-lg max-w-5xl mx-auto">
                <div className="grid grid-cols-1  md:grid-cols-4 gap-1.5 lg:grid-cols-5 ">
                    <LocationCombobox
                        value={origin}
                        setValue={setOrigin}
                        placeholder="مبدا"
                        locations={locations}
                        isLoading={isLoadingLocations}
                    />
                  
                    <LocationCombobox
                        value={destination}
                        setValue={setDestination}
                        placeholder="مقصد"
                        locations={locations}
                        isLoading={isLoadingLocations}
                    />
                    <Popover >
                        <PopoverTrigger asChild >
                            <Button variant={"outline"} className="w-full border-gray-300  justify-center  font-normal text-gray-600">
                                <CalendarIcon className="ml-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        `${format(dateRange.from, "LLL dd")} - ${format(dateRange.to, "LLL dd")}`
                                    ) : (
                                        format(dateRange.from, "PPP")
                                    )
                                ) : (
                                    <span>تاریخ رفت و برگشت</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto p-0 bg-white border-gray-300/40 shadow-2xl transition-all d" align="center">
                            <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={1}
                            />
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleSearch} disabled={isSearching} 
                    className="w-full hover:bg-primary/90 text-center text-white cursor-pointer">
                        جستجو
                    </Button>
                </div>
            </div>

            {/* --- Search Results Section --- */}
            <div className="max-w-4xl mx-auto mt-8">
                {isSearching && <p className="text-center text-gray-600">در حال جستجو...</p>}
                {isError && <p className="text-center text-red-600">خطا در جستجو.</p>}
                {searchResults && (
                    <div className="bg-white p-6 w-full rounded-xl shadow-lg">
                        {searchResults.length > 0 ? (
                            <div className="grid grid-row-1 w-full  sm:grid-row-2 gap-6">
                                {searchResults.map(tour => <TourCard key={tour.id} tour={tour} />)}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">توری با مشخصات انتخابی یافت نشد.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
