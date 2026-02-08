import Hero from './components/Hero';
import Features from './components/Features';
import Rooms from './components/Rooms';
import Tours from './components/Tours';
import LocalGuide from './components/LocalGuide';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Features />
        <Rooms />
        <Tours />
        <LocalGuide />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;