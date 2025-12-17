import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PhotoModal from './PhotoModal';

interface Photo {
  id: string;
  url: string;
  title?: string;
  location?: string;
  year?: string;
}

const PhotoSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const photos: Photo[] = [
    {
      id: '1',
      url: '/images/photography/photo-1.webp',
      title: 'Analog Portrait',
      location: 'Berlin',
      year: '2024'
    },
    {
      id: '2',
      url: '/images/photography/photo-2.webp',
      title: 'Street Study',
      location: 'Los Angeles',
      year: '2023'
    },
    {
      id: '3',
      url: '/images/photography/photo-3.webp',
      title: 'Light & Shadow',
      location: 'New York',
      year: '2023'
    },
    {
      id: '4',
      url: '/images/photography/photo-4.webp',
      title: 'Urban Solitude',
      location: 'Tokyo',
      year: '2024'
    },
    {
      id: '5',
      url: '/images/photography/photo-5.webp',
      title: 'Moments Between',
      location: 'Paris',
      year: '2024'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const photosPerView = isMobile ? 1 : 3;
  
  // Create extended array for infinite loop
  const extendedPhotos = [...photos, ...photos, ...photos];
  const startIndex = photos.length; // Start from the middle set

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Reset position for infinite loop
    if (currentIndex >= photos.length * 2) {
      setCurrentIndex(photos.length);
    } else if (currentIndex < photos.length) {
      setCurrentIndex(photos.length * 2 - 1);
    }
  };

  return (
    <section id="photo" className="min-h-screen bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-space-grotesk font-bold text-4xl md:text-5xl tracking-tight mb-16 text-zinc-900">
          Photography
        </h2>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronLeft size={24} className="text-zinc-900" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronRight size={24} className="text-zinc-900" />
          </button>

          {/* Photo Slider */}
          <div className="overflow-hidden">
            <div
              className={`flex md:gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{ transform: `translateX(-${currentIndex * (100 / photosPerView)}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedPhotos.map((photo, index) => (
                <div
                  key={`${photo.id}-${index}`}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{
                    width: isMobile
                      ? '100%'
                      : `calc(${100 / photosPerView}% - ${(photosPerView - 1) * 1.5 / photosPerView}rem)`
                  }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src={photo.url}
                      alt={photo.title || 'Photography'}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(startIndex + index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === ((currentIndex - startIndex) % photos.length) ? 'bg-zinc-900' : 'bg-zinc-300 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex justify-center mt-20">
          <a
            href="/photo"
            className="group inline-flex items-center space-x-3 px-8 py-4 border border-zinc-300 hover:border-zinc-900 bg-white hover:bg-zinc-50 transition-all duration-500"
          >
            <span className="font-space-grotesk font-medium text-zinc-900 group-hover:text-zinc-900 transition-colors duration-300 tracking-wide">
              See All Photos
            </span>
          </a>
        </div>
      </div>
      
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={() => {
            const currentPhotoIndex = photos.findIndex(p => p.id === selectedPhoto.id);
            const nextIndex = (currentPhotoIndex + 1) % photos.length;
            setSelectedPhoto(photos[nextIndex]);
          }}
          onPrevious={() => {
            const currentPhotoIndex = photos.findIndex(p => p.id === selectedPhoto.id);
            const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            setSelectedPhoto(photos[prevIndex]);
          }}
        />
      )}
    </section>
  );
};

export default PhotoSection;