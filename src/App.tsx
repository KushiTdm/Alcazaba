import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import DynamicMetaTags from './components/DynamicMetaTags';
import VideoIntro from './components/VideoIntro';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Rooms from './components/Rooms';
import Tours from './components/Tours';
import LocalGuide from './components/LocalGuide';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    
    setTimeout(() => {
      setStartHeroAnimation(true);
    }, 100);
  };

  return (
    <LanguageProvider>
      <DynamicMetaTags />
      
      {showIntro && <VideoIntro onComplete={handleIntroComplete} />}
      
      <div className="min-h-screen bg-white">
        <main>
          <Hero startAnimation={startHeroAnimation} />
          <Features />
          <About />
          <Rooms />
          <Tours />
          <LocalGuide />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LanguageProvider>
  );
}

export default App;