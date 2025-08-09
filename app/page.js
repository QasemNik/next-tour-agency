import { HeroSearchBox } from "@/components/Features/SearchBox";
import PhonePurchase from "@/components/PhonePurchase";
import PopularTours from "@/components/tour/PopularTours";
import WhyTorino from "@/components/WhyTorino";
import { Header } from "@/layout/Header";
import HeroSection from "@/layout/Hero";

function HomePage() {
  return (
    <>
      <main>
        <Header />
        <HeroSection />
        <HeroSearchBox />
        <PopularTours />
        <PhonePurchase />
        <WhyTorino />
      </main>
    </>
  );
}

export default HomePage;
