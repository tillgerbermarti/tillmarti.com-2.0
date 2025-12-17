import { useState, useEffect } from 'react';

export const useScrollSections = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'film', 'photo', 'info'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return { currentSection };
};