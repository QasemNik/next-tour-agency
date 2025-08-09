'use client'

import { getMyTours } from "@/services/userData";
import { useQuery } from "@tanstack/react-query";

function MyTours() {
    const { data: tours, isLoading } = useQuery({
        queryKey: ["my-tours"],
        queryFn: getMyTours,
    });
    if (isLoading)
        return <div className="text-center p-10">Loading tours...</div>;

    return (
        <div className="space-y-4">
            {tours?.map((tour) => (
                <div key={tour.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold">{tour.title}</h4>
                        <span
                            className={`text-xs font-bold px-2 py-1 rounded-full ${tour.status === "در حال برگزاری"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                        >
                            {tour.status}
                        </span>
                    </div>
                    <div className="text-sm text-gray-600 border-t pt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="font-semibold text-gray-500">مبدا:</p>{" "}
                            <p>{tour.origin}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-500">مقصد:</p>{" "}
                            <p>{tour.destination}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-500">تاریخ:</p>{" "}
                            <p>{tour.date}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-500">مبلغ پرداخت شده:</p>{" "}
                            <p className="font-mono">{tour.price} تومان</p>
                        </div>
                    </div>
                </div>
            ))}
            {!tours ||
                (tours.length === 0 && (
                    <p className="text-center text-gray-500 py-10">
                        توری برای نمایش وجود ندارد.
                    </p>
                ))}
        </div>
    );
}
export default MyTours