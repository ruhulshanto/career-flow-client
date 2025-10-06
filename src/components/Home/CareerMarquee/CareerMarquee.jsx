import { useState, useEffect } from 'react';
import university1 from "../../../assets/UniversityLogo/university1.svg";
import university2 from "../../../assets/UniversityLogo/university2.svg";
import university3 from "../../../assets/UniversityLogo/university3.svg";
import university4 from "../../../assets/UniversityLogo/university4.svg";
import university5 from "../../../assets/UniversityLogo/university5.svg";
import university6 from "../../../assets/UniversityLogo/university6.svg";
import university7 from "../../../assets/UniversityLogo/university7.svg";
import university8 from "../../../assets/UniversityLogo/university8.svg";
import university9 from "../../../assets/UniversityLogo/university9.svg";
import university10 from "../../../assets/UniversityLogo/university10.svg";

const logos = [
  university1, university2, university3, university4, university5,
  university6, university7, university8, university9, university10,
];

const CareerMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [logoSize, setLogoSize] = useState({ width: 120, height: 80 });

  // Adjust logo size based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLogoSize({ width: 80, height: 60 });
      } else if (window.innerWidth < 768) {
        setLogoSize({ width: 100, height: 70 });
      } else {
        setLogoSize({ width: 120, height: 80 });
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="text-blue-600">100+</span> Education Institutions
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-6 leading-relaxed">
            Join a growing network of leading universities and colleges leveraging our career guidance tools to empower students worldwide.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Marquee Container */}
        <div 
          className="relative w-full overflow-hidden py-6 md:py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Gradient overlays for better UX */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* First Marquee */}
          <div 
            className="flex w-max mb-6 md:mb-8"
            style={{ 
              animation: `scroll-marquee 40s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-4 sm:px-6 transition-transform duration-300 hover:scale-110"
                style={{
                  width: `${logoSize.width}px`,
                  height: `${logoSize.height}px`,
                }}
              >
                <img
                  src={logo}
                  alt={`University Logo ${index + 1}`}
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Second Marquee (reverse direction) */}
          <div 
            className="flex w-max"
            style={{ 
              animation: `scroll-marquee-reverse 35s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {[...logos].reverse().map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-4 sm:px-6 transition-transform duration-300 hover:scale-110"
                style={{
                  width: `${logoSize.width}px`,
                  height: `${logoSize.height}px`,
                }}
              >
                <img
                  src={logo}
                  alt={`University Logo ${index + 1}`}
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 px-4 max-w-6xl mx-auto
        
        ">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 sm:p-6  transition hover:shadow-lg">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600 text-sm md:text-base">Institutions</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 sm:p-6  transition hover:shadow-lg">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600 text-sm md:text-base">Students</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 sm:p-6  transition hover:shadow-lg">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600 text-sm md:text-base">Countries</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 sm:p-6  transition hover:shadow-lg">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600 text-sm md:text-base">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes scroll-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
};

export default CareerMarquee;