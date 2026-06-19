import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CityExplorer } from "@/components/city/CityExplorer";
import { Analytics } from "@/components/sections/Analytics";
import { PropertyShowcase } from "@/components/sections/PropertyShowcase";
import { DeveloperShowcase } from "@/components/sections/DeveloperShowcase";
import { Technology } from "@/components/sections/Technology";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main className="relative">
        {/* Centerpiece: full-screen 3D digital twin */}
        <CityExplorer />

        {/* Content platform */}
        <div className="relative bg-[#05070d]">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
          <div className="relative">
            <PropertyShowcase />
            <Analytics />
            <Technology />
            <DeveloperShowcase />
            <CallToAction />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
