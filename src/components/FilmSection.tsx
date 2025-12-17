import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  logline: string;
  image: string;
  images?: string[];
  details: {
    director?: string;
    cast?: string[];
    genre?: string;
    duration?: string;
    synopsis?: string;
    watchUrl?: string;
  };
}

const FilmSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'The Second Coming',
      role: 'SFX Artist',
      year: '2025',
      logline: 'A young couple‘s love is sabotaged by the arrival of a divine entity.',
      image: '/images/projects/project-1.webp',
      images: [
        '/images/projects/project-1.webp',
        '/images/projects/second_coming/img-20230512-wa0009.jpg',
        '/images/projects/second_coming/img-20230514-wa0063.jpg',
        '/images/projects/second_coming/img-20230514-wa0064.jpg',
        '/images/projects/second_coming/img-20230514-wa0081.jpg',
        '/images/projects/second_coming/img-20230514-wa0082.jpg',
        '/images/projects/second_coming/img-20230514-wa0083.jpg',
        '/images/projects/second_coming/img-20230514-wa0087.jpg'
      ],
      details: {
        director: 'Micha Straub',
        cast: ['Leo Saint Thomas', 'Laoise Lenders', 'Mike Ogden'],
        genre: 'Sci-Fi Horror',
        duration: '16 min',
        synopsis: 'In a world where memories can be extracted and manipulated, a detective must solve a murder that may not have happened yet.'
      }
    },
    {
      id: '2',
      title: 'Stuntman Tom',
      role: 'Writer/Director',
      year: '2024',
      logline: 'In silent movies no one can hear you scream.',
      image: '/images/projects/project-2.webp',
      images: [
        '/images/projects/project-2.webp',
        '/images/projects/stuntman_tom/q5a0242.webp',
        '/images/projects/stuntman_tom/q5a0248.webp',
        '/images/projects/stuntman_tom/q5a0304.webp',
        '/images/projects/stuntman_tom/q5a0325.webp',
        '/images/projects/stuntman_tom/q5a0346.webp',
        '/images/projects/stuntman_tom/q5a0353.webp',
        '/images/projects/stuntman_tom/q5a0354.webp',
        '/images/projects/stuntman_tom/q5a0370.webp',
        '/images/projects/stuntman_tom/q5a0383.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.3.1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.14.1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.20.1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.53.1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.54.1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.54.2.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.95.1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.114.1.webp',
        '/images/projects/stuntman_tom/stuntmantom_1.116.1.webp',
        '/images/projects/stuntman_tom/img-20210614-wa0012(1).webp',
        '/images/projects/stuntman_tom/img-20210614-wa0016(1).webp'
      ],
      details: {
        director: 'Till Marti',
        cast: ['Aaron Hitz', 'Amélie Luise Hug', 'Lukas Hobi'],
        genre: 'B&W - Silent Movie',
        duration: '10 min',
        synopsis: 'Filmmaking in the silent film era. Stuntman Tom is tired of falling into the dirt for other people and now takes it into his own hands to be promoted to star of the film.'
      }
    },
    {
      id: '3',
      title: 'My Nuclear Family',
      role: 'Producer',
      year: '2023',
      image: '/images/projects/project-3.webp',
      images: [
        '/images/projects/project-3.webp',
        '/images/projects/my-nuclear-family/dscf4451-2.webp',
        '/images/projects/my-nuclear-family/dscf4763-94.webp',
        '/images/projects/my-nuclear-family/dscf5052-55.webp',
        '/images/projects/my-nuclear-family/b14dc427-e922-43bf-8482-082c3289e0b3.webp'
      ],
      details: {
        director: 'Nevin George',
        cast: ['Elena Flury', 'Mike Ogden'],
        genre: 'Mystery Drama',
        duration: '16 min',
        synopsis: 'Der ruhige Familienalltag von Peggy ändert sich plötzlich, als ein Vertreter an ihrer Tür auftaucht und eine kostenlose Luxusreise anbietet. Diese Begegnung enthüllt verschiedene Seiten ihres vermeintlich perfekten Lebens und bringt unausgesprochene Gefühle und verborgene Geheimnisse ans Licht.',
        watchUrl: 'https://www.youtube.com/watch?v=GZKx6zHCs48'
      }
    },
    {
      id: '4',
      title: 'Operation Pythagoras',
      role: 'Writer/Director',
      year: '2025',
      logline: 'Balduin and his friends are planning a break-in into their principal\'s office.',
      image: '/images/projects/project-4.jpg',
      images: [
        '/images/projects/project-4.jpg',
        '/images/projects/operation-pythagoras/1.webp'
      ],
      details: {
        director: 'Till Marti',
        cast: ['Maurizio Siconolfi', 'Cybèle Zinsli', 'Colin Vemba'],
        genre: 'Comedy',
        duration: '19 min',
        synopsis: 'Evidence needs to be stolen. But even during the planning phase, no one can really stay focused. As everyone takes their positions during the lunch break and a fuse is lit too early, chaos erupts.'
      }
    },
  ];

  return (
    <section id="film" className="min-h-screen bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-space-grotesk font-bold text-4xl md:text-5xl tracking-tight mb-16">
          Selected Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 md:place-items-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6 md:max-h-[80vh]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-space-grotesk font-medium text-xl tracking-wide group-hover:text-orange-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-inter text-white/60 text-sm tracking-widest uppercase">
                  {project.role} · {project.year}
                </p>
                <p className="font-inter text-white/80 text-sm leading-relaxed">
                  {project.logline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="flex justify-center mt-20">
        <a
          href="/projects"
          className="group inline-flex items-center space-x-3 px-8 py-4 border border-white/20 hover:border-orange-400/50 bg-white/5 hover:bg-orange-400/10 transition-all duration-500"
        >
          <span className="font-space-grotesk font-medium text-white group-hover:text-orange-400 transition-colors duration-300 tracking-wide">
            See Full Portfolio
          </span>
        </a>
      </div>
      
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default FilmSection;