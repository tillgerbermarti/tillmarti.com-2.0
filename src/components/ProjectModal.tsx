import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetails {
  director?: string;
  cast?: string[];
  genre?: string;
  duration?: string;
  synopsis?: string;
  watchUrl?: string;
}

interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  logline: string;
  image: string;
  images?: string[];
  details: ProjectDetails;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const projectImages = project.images || [project.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, currentImageIndex]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-zinc-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 text-white/60 hover:text-orange-400 transition-colors duration-300"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative">
            <img
              src={projectImages[currentImageIndex]}
              alt={project.title}
              className="w-full h-64 lg:h-full object-cover"
            />

            {projectImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <ChevronLeft size={24} className="text-zinc-900" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <ChevronRight size={24} className="text-zinc-900" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="space-y-6">
              <div>
                <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl tracking-tight mb-3">
                  {project.title}
                </h2>
                <p className="font-inter text-white/60 text-sm tracking-widest uppercase mb-4">
                  {project.role} · {project.year}
                </p>
                <p className="font-inter text-orange-400 text-lg leading-relaxed">
                  {project.logline}
                </p>
              </div>
              
              <div className="space-y-4">
                {project.details.synopsis && (
                  <div>
                    <h4 className="font-space-grotesk font-medium text-lg tracking-wide mb-2">
                      Synopsis
                    </h4>
                    <p className="font-inter text-white/80 leading-relaxed">
                      {project.details.synopsis}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {project.details.director && (
                    <div>
                      <h5 className="font-inter font-medium text-white/60 uppercase tracking-wide mb-1">
                        Director
                      </h5>
                      <p className="font-inter text-white">
                        {project.details.director}
                      </p>
                    </div>
                  )}
                  
                  {project.details.genre && (
                    <div>
                      <h5 className="font-inter font-medium text-white/60 uppercase tracking-wide mb-1">
                        Genre
                      </h5>
                      <p className="font-inter text-white">
                        {project.details.genre}
                      </p>
                    </div>
                  )}
                  
                  {project.details.duration && (
                    <div>
                      <h5 className="font-inter font-medium text-white/60 uppercase tracking-wide mb-1">
                        Duration
                      </h5>
                      <p className="font-inter text-white">
                        {project.details.duration}
                      </p>
                    </div>
                  )}
                </div>
                
                {project.details.cast && project.details.cast.length > 0 && (
                  <div>
                    <h5 className="font-inter font-medium text-white/60 uppercase tracking-wide mb-2">
                      Cast
                    </h5>
                    <p className="font-inter text-white">
                      {project.details.cast.join(', ')}
                    </p>
                  </div>
                )}

                {project.details.watchUrl && (
                  <div className="pt-4">
                    <a
                      href={project.details.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-space-grotesk font-medium tracking-wide transition-all duration-300 hover:scale-105"
                    >
                      Watch Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;