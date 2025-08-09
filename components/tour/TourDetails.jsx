import { getTourById } from "@/services/tourData";
import { ArrowLeft, ArrowRight, Ticket, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function TourDetails({ params }) {
    const tourParams = await params;
    const { tourId } = tourParams;

    const tour = await getTourById(tourId);

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-yekan">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* --- Image Section --- */}
                    <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={tour.image || "https://placehold.co/800x600"}
                            alt={tour.title}
                            priority
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* --- Details Section --- */}
                    <div className="flex flex-col font-yekan">
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                            {tour.title}
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            <span className="font-semibold">{tour.destination?.name}</span>
                        </p>

                        <div className="mt-6 border-t pt-6">
                            <p className="text-4xl font-bold text-primary">
                                {tour.price.toLocaleString('fa-IR')}
                                 <span className="text-lg font-normal mr-3 text-gray-700">تومان</span>
                            </p>
                            <div className="flex items-center text-gray-500 mt-2">
                                <Users className="ml-2 h-5 w-5" />
                                <span>{tour.availableSeats} صندلی باقی مانده</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold text-lg">امکانات تور:</h3>
                            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
                                {tour.options?.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                        </div>

                        {/* --- Action Buttons --- */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link href={`/booking/${tour.id}`} className="w-full">
                                <Button size="lg" className="cursor-pointer w-full  text-lg">
                                    <Ticket className="ml-2 h-5 w-5 " />
                                    خرید و رزرو
                                </Button>
                            </Link>
                            <Link href="/" className="w-full">
                                <Button size="lg" variant="outline" 
                                    className="w-1/2 text-lg border-gray-300/40 cursor-pointer ">
                                    بازگشت
                                    <ArrowLeft className="ml-2 h-5 w-5 " />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
