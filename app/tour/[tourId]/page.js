import TourDetails from "@/components/tour/TourDetails";
import { Header } from "@/layout/Header";


function TourDetailPage({params}) {
  return (
    <>
      <Header />
      <TourDetails params={params}/>;
    </>
  );
}

export default TourDetailPage;
