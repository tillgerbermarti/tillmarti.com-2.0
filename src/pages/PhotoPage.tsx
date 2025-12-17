import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import PhotoModal from '../components/PhotoModal';
import { generatePhotoArchive, Photo } from '../data/photoArchive';

const PhotoPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const PHOTOS_PER_PAGE = 10;

  // Initialize all available photos
  useEffect(() => {
    const allPhotos = generatePhotoArchive();
    
    setPhotos(allPhotos);
    
    // Load initial batch
    const initialPhotos = allPhotos.slice(0, PHOTOS_PER_PAGE);
    setDisplayedPhotos(initialPhotos);
    setHasMore(allPhotos.length > PHOTOS_PER_PAGE);
  }, []);

  const loadMorePhotos = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = nextPage * PHOTOS_PER_PAGE;
      const endIndex = startIndex + PHOTOS_PER_PAGE;
      const newPhotos = photos.slice(startIndex, endIndex);
      
      if (newPhotos.length > 0) {
        setDisplayedPhotos(prev => [...prev, ...newPhotos]);
        setPage(nextPage);
        setHasMore(endIndex < photos.length);
      } else {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 500);
  }, [photos, page, loading, hasMore]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMorePhotos();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePhotos]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="p-8">
        <button
          onClick={goBack}
          className="flex items-center space-x-3 text-zinc-600 hover:text-zinc-900 transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          <span className="font-inter font-medium">Back</span>
        </button>
      </header>

      {/* Photography Archive Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="font-space-grotesk font-bold text-4xl md:text-5xl tracking-tight mb-16 text-zinc-900">
            Photography Archive
          </h1>
          
          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {displayedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-500">
                  <img
                    src={photo.url}
                    alt={photo.title || 'Photography'}
                    className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center mt-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
            </div>
          )}

          {/* End Message */}
          {!hasMore && displayedPhotos.length > 0 && (
            <div className="text-center mt-12">
              <p className="font-inter text-zinc-600">
                You've reached the end of the archive
              </p>
            </div>
          )}
        </div>
      </section>
      
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={() => {
            const currentPhotoIndex = displayedPhotos.findIndex(p => p.id === selectedPhoto.id);
            if (currentPhotoIndex < displayedPhotos.length - 1) {
              setSelectedPhoto(displayedPhotos[currentPhotoIndex + 1]);
            } else {
              setSelectedPhoto(displayedPhotos[0]);
            }
          }}
          onPrevious={() => {
            const currentPhotoIndex = displayedPhotos.findIndex(p => p.id === selectedPhoto.id);
            if (currentPhotoIndex > 0) {
              setSelectedPhoto(displayedPhotos[currentPhotoIndex - 1]);
            } else {
              setSelectedPhoto(displayedPhotos[displayedPhotos.length - 1]);
            }
          }}
        />
      )}
    </div>
  );
};

export default PhotoPage;