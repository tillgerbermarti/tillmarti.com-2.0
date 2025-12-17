import React, { useEffect } from 'react';
import { X, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  title?: string;
  location?: string;
  year?: string;
}

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, onNext, onPrevious }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (event.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative max-w-6xl max-h-[90vh] flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-orange-400 transition-colors duration-300 bg-black/30 rounded-full backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {/* Navigation Arrows */}
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronLeft size={24} className="text-zinc-900" />
          </button>
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronRight size={24} className="text-zinc-900" />
          </button>
        )}
        
        <img
          src={photo.url}
          alt={photo.title || 'Photography'}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default PhotoModal;