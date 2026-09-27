import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import PlanCards from "../components/landing/PlanCards";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlanCards />
      </main>
      <Footer />
    </>
  );
}
