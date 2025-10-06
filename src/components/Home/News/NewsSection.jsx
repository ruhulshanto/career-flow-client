
import { Link } from "react-router";
import { newsList } from "./newsData";
import { useEffect, useMemo, useState } from 'react';


const OptimizedImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ transition: 'opacity 0.3s ease, transform 0.5s ease' }}
      />
    </div>
  );
};

const NewsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const featuredNews = useMemo(() => newsList.slice(0, 3), []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('news-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [isVisible]);

 

  return (
    <section id="news-section" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Latest <span className="text-blue-600">News</span> & Updates
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Stay informed with the latest education trends, success stories, and student career updates.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* News Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredNews.map((news) => (
            <div
              key={news.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out hover:shadow-xl"             
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56 md:h-60">
                <OptimizedImage
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {news.date}
                  </span>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                  <Link
                    to={`/news/${news.id}`}
                    className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-all transform hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {news.summary}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">{news.date}</span>
                  </div>
                  
                  <Link
                    to={`/news/${news.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center transition-colors duration-300"
                  >
                    Read full story
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {newsList.length > 3 && (
          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              to="/news"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              View All News ({newsList.length} articles)
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;