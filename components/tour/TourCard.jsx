import Image from "next/image";
import Link from "next/link";
import { Button } from '../ui/button';

function TourCard({ tour }) {
    const { id, image, title,  availableSeats , price } = tour
    

return (
        < >
            <div
             className=" bg-white rounded-lg shadow-sm overflow-hidden  hover:-translate-y-1 transition-transform duration-300">
                <div 
                className="relative h-auto w-full">
                    <Image
                        src={image}
                        alt={title}
                        width={500}
                        height={500}
                        className="object-cover"
                    />
                </div>
                <div className="p-4 font-yekan">
                    <h3 className="text-xl font-semibold">تور {title}  </h3>
                <p className="mt-2 text-sm text-signal border-b border-gray-100">,تعداد صندلی {availableSeats}...</p>
                <Link href={`/tour/${id}`}>
                        <div className="mt-4 flex justify-between items-center font-yekan text-lg">
                            <Button className="cursor-pointer text-white">رزرو</Button>
                            <p className=" font-primary text-primary"> {price.toLocaleString('fa-IR')}  <span className="text-complementary">تومان</span> </p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
export default TourCard