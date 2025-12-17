import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Instagram, MessageCircle, Film, ExternalLink, Linkedin, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const profileImages = [
    '/images/profile/till-marti.jpg',
    '/images/profile/at_home.webp',
    '/images/profile/blue.webp',
    '/images/profile/cameraman.webp',
    '/images/profile/dreamy.webp',
    '/images/profile/stunt.webp',
    '/images/profile/trash.webp',
    '/images/profile/zombie.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [profileImages.length]);

  const contactLinks = [
    {
      label: 'Email',
      href: 'mailto:info@tillmarti.com',
      icon: Mail
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/tillgerber/',
      icon: Instagram
    },
    {
      label: 'Letterboxd',
      href: 'https://letterboxd.com/tillmarti/',
      icon: Film
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/41796305266',
      icon: MessageCircle
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/till-marti-20b9a932a/',
      icon: Linkedin
    },
    {
      label: 'Stage 32',
      href: 'https://stage32.com/tillmarti',
      icon: Users
    }
  ];

  const professionalLinks = [
    {
      label: 'Swissfilms',
      href: 'https://www.swissfilms.ch/de/person/till-marti/644301d0151243289ddd5157e9422878'
    }
  ];

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="p-8">
        <button
          onClick={goBack}
          className="flex items-center space-x-3 text-white/60 hover:text-orange-400 transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          <span className="font-inter font-medium">Back</span>
        </button>
      </header>

      {/* Info Section */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Profile */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="font-space-grotesk font-bold text-4xl md:text-5xl tracking-tight">
                Till Marti
              </h2>
              
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={profileImages[currentImageIndex]}
                  alt="Till Marti"
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
              
              {/* Connect - Desktop Only */}
              <div className="hidden lg:block space-y-6">
                <h3 className="font-space-grotesk font-medium text-2xl tracking-wide">
                  Connect
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {contactLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 border border-white/20 hover:border-orange-400/50 bg-white/5 hover:bg-orange-400/10 transition-all duration-300 group"
                      >
                        <Icon 
                          size={20} 
                          className="text-white/60 group-hover:text-orange-400 transition-colors duration-300" 
                        />
                        <span className="font-inter font-medium text-white group-hover:text-orange-400 transition-colors duration-300">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Bio & Contact */}
            <div className="flex flex-col justify-center space-y-8 lg:space-y-12">
              <div className="space-y-8">
                <div className="space-y-6 font-inter text-white/80 leading-relaxed text-lg">
                  <p>
                    Swiss-based writer/director.
                  </p>
                  <p>
                    He was born in the year 2000 in Thun and grew up in the Bernese Alps. He started making movies at a very young age. With a big interest in psychology and biology he enjoyed an education at the FMS Neufeld (2015-2018). In the following years he made an internship at the Lichtspiel Cinemathèque Bern, one of Europe's largest film archives. There, he further enriched his knowledge of movie- and cinema history.
                  </p>
                  <p>
                    While working as an event manager for #Cinè, an organization that works pedagogically to bring cinema closer to today's youth, he applied for the Bachelor of Arts in Film degree at Zurich University of Arts in 2019, where he wrote and directed two short films and worked on other projects as a producer, production designer and special effects technician.
                  </p>
                  <p>
                    Since 2022, Till is part of the team at StuckiAction, where he learned the basic and advanced techniques of stunt coordination, including fight choreography, precision driving, wire work, and safety protocols, enabling him to execute and design complex action sequences for film and television.. He also works as a swimming instructor for children in Bern and writes film criticism.
                  </p>
                </div>
                
                {/* Education */}
                <div className="space-y-4">
                  <h3 className="font-space-grotesk font-medium text-xl tracking-wide">
                    Education
                  </h3>
                  <div className="space-y-2 font-inter text-white/80">
                    <p>2019-2025: Bachelor of Arts in Film (Script) Zürcher Hochschule der Künste</p>
                    <p>2015-2018: FMS Neufeld</p>
                  </div>
                </div>
                
                {/* Professional Links - Desktop */}
                <div className="hidden lg:block space-y-4">
                  <h4 className="font-space-grotesk font-medium text-lg tracking-wide text-white/80">
                    Professional
                  </h4>
                  <div className="space-y-3">
                    {professionalLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-white/10 hover:border-orange-400/30 bg-white/5 hover:bg-orange-400/5 transition-all duration-300 group"
                      >
                        <span className="font-inter font-medium text-white/90 group-hover:text-orange-400 transition-colors duration-300">
                          {link.label}
                        </span>
                        <ExternalLink 
                          size={16} 
                          className="text-white/40 group-hover:text-orange-400 transition-colors duration-300" 
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Contact - Mobile Only */}
              <div className="lg:hidden space-y-6">
                <h3 className="font-space-grotesk font-medium text-2xl tracking-wide">
                  Connect
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {contactLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 border border-white/20 hover:border-orange-400/50 bg-white/5 hover:bg-orange-400/10 transition-all duration-300 group"
                      >
                        <Icon 
                          size={20} 
                          className="text-white/60 group-hover:text-orange-400 transition-colors duration-300" 
                        />
                        <span className="font-inter font-medium text-white group-hover:text-orange-400 transition-colors duration-300">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
                
                {/* Professional Links - Mobile */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-space-grotesk font-medium text-lg tracking-wide text-white/80">
                    Professional
                  </h4>
                  <div className="space-y-3">
                    {professionalLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-white/10 hover:border-orange-400/30 bg-white/5 hover:bg-orange-400/5 transition-all duration-300 group"
                      >
                        <span className="font-inter font-medium text-white/90 group-hover:text-orange-400 transition-colors duration-300">
                          {link.label}
                        </span>
                        <ExternalLink 
                          size={16} 
                          className="text-white/40 group-hover:text-orange-400 transition-colors duration-300" 
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;