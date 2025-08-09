import TourCard from '@/components/tour/TourCard';
import { Header } from '@/layout/Header';
import { getTours } from '@/services/tourData';

async function servicesTour() {
     const tour = await getTours()
     const slicedTour = tour.slice(0, 8);

  return (
    <>
        <Header />
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {slicedTour.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
        </div>

      </div>
    </section>
            </>
  );
}

export default servicesTour;
