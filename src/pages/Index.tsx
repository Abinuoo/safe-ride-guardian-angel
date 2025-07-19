import Header from "@/components/Header"
import Hero from "@/components/Hero"
import SafetyFeatures from "@/components/SafetyFeatures"
import SpecialFeatures from "@/components/SpecialFeatures"
import Footer from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SafetyFeatures />
      <SpecialFeatures />
      <Footer />
    </div>
  );
};

export default Index;
