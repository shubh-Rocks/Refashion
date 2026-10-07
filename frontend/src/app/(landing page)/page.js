import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Listings from "@/components/landing/Listing";
import DirectExchange from "@/components/landing/DirectExchange";
import CtaFooter from "@/components/landing/Foooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DirectExchange />
        <Listings />
      </main>
      <CtaFooter />
    </>
  );
}
