import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import PlanCards from "../components/landing/PlanCards";
import EventInfo from "../components/landing/EventInfo";
import Schedule from "../components/landing/Schedule";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <PlanCards />
        <EventInfo />
        <Schedule />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
