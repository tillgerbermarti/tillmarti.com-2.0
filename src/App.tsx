import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FilmSection from './components/FilmSection';
import PhotoSection from './components/PhotoSection';
import InfoSection from './components/InfoSection';
import { useScrollSections } from './hooks/useScrollSections';

function App() {
  const { currentSection } = useScrollSections();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation currentSection={currentSection} />
      <Hero />
      <FilmSection />
      <PhotoSection />
      <InfoSection />
    </div>
  );
}

export default App;