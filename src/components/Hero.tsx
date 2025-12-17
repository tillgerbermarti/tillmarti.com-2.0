import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile phone (not tablet)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const heroImages = [
    {
      desktop: '/images/hero/hero-1.jpg',
      mobile: '/images/hero/hero-1-mobile.jpg'
    },
    {
      desktop: '/images/hero/hero-2.webp',
      mobile: '/images/hero/hero-2-mobile.jpg'
    },
    {
      desktop: '/images/hero/hero-3.webp',
      mobile: '/images/hero/hero-3-mobile.jpg'
    },
    {
      desktop: '/images/hero/hero-4.webp',
      mobile: '/images/hero/hero-4-mobile.jpg'
    },
    {
      desktop: '/images/hero/hero-5.webp',
      mobile: '/images/hero/hero-5-mobile.jpg'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToNext = () => {
    const filmSection = document.getElementById('film');
    if (filmSection) {
      filmSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${isMobile ? image.mobile : image.desktop})` }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="font-space-grotesk font-bold text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none mb-4">
          TILL MARTI
        </h1>
        <p className="font-inter font-light text-lg md:text-xl tracking-widest opacity-90 mb-16">
          Writer / Director & Stuntman
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-500 hover:text-orange-400 group"
        aria-label="Scroll to content"
      >
        <ChevronDown 
          size={32} 
          className="animate-bounce group-hover:translate-y-1 transition-transform duration-300" 
        />
      </button>
    </section>
  );
};

export default Hero;