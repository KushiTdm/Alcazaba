import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#habitaciones', label: 'Habitaciones' },
    { href: '#tours', label: 'Tours' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a href="#inicio" className="flex flex-col leading-tight">
              <span className="text-xl sm:text-2xl font-bold text-[#1A2F4B]">
                Hostal Alcazaba
              </span>
              <span className="text-sm sm:text-base text-[#C28E5E] font-medium">
                & Lobo Marino
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#1A2F4B] hover:text-[#C28E5E] transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={handleWhatsApp}
              className="bg-[#C28E5E] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#1A2F4B] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              RESERVAR
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#1A2F4B] p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-[#1A2F4B] hover:text-[#C28E5E] transition-colors duration-200 font-medium text-lg"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#C28E5E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1A2F4B] transition-all duration-300 shadow-lg mt-4"
            >
              RESERVAR AHORA
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
