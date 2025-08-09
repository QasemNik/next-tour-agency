import React, { use } from 'react'
import { getTours } from '@/services/tourData';
import TourCard from './TourCard';
import Catalog from '../ui/CatalogLoader';


function PopularTours() {
    const tour = use(getTours())

    return (
        <section className=" py-16">
            <div className="max-w-7xl mx-auto ">
                <h2 className="text-3xl  font-yekan-bold ">همه تور ها</h2>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {!tour ? (<Catalog />)
                        : (
                            tour.map(tour => (
                                <TourCard key={tour.id} tour={tour} />
                            )))
                    }
                </div>
                {/* <div className="mt-10 text-center">
                    <Link href="/tour">
                        <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                            مشاهده همه تورها <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div> */}
            </div>
        </section>
    );
}

export default PopularTours
