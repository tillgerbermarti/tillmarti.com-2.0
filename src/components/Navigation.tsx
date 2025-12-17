import React, { useEffect, useRef } from 'react';

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      nav.setAttribute('data-scrolled', scrolled.toString());
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 p-8 transition-all duration-500"
      data-scrolled="false"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => scrollToSection('film')}
          className="nav-link"
        >
          Film
        </button>
        
        <button
          onClick={() => scrollToSection('photo')}
          className="nav-link"
        >
          Photo
        </button>
        
        <button
          onClick={() => scrollToSection('info')}
          className="nav-link"
        >
          Info
        </button>
      </div>
    </nav>
  );
};

export default Navigation;