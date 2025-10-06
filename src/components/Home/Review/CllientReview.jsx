import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { BsCheckCircle } from "react-icons/bs";

// Mock images 
const img1 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
const img2 = "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80";
const img4 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80";
const img5 = "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80";
const img6 = "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
const img7 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
const img8 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
const img9 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
const img10 = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";



// Career success reviews
const reviews = [
  {
    img: img1,
    name: "Rasel Ahamed",
    role: "Software Engineer at Google",
    text: "Following Career Guideline helped me crack my dream job abroad. The mentorship and step-by-step guidance were life changing.",
  },
  {
    img: img2,
    name: "Nasir Uddin",
    role: "Banking Professional",
    text: "After struggling for years, Career Guideline's roadmap helped me prepare smartly and finally secure a top government job.",
  },
  {
    img: img4,
    name: "Sharmin Akter",
    role: "Scholarship Student",
    text: "The career flow guided me from CV writing to interview skills — now I'm studying in Canada with a full scholarship.",
  },
  {
    img: img5,
    name: "Umme Habiba",
    role: "Entrepreneur",
    text: "With proper career counseling, I shifted from a corporate job to starting my own business confidently.",
  },
  {
    img: img6,
    name: "Sadia Rahman",
    role: "HR Specialist",
    text: "Career Guideline helped me build confidence, improve communication skills, and land a leadership role in my company.",
  },
  {
    img: img7,
    name: "Imran Hossain",
    role: "Full-Stack Developer",
    text: "From confusion to clarity — this platform gave me a roadmap to learn coding and start my career as a developer.",
  },
  {
    img: img8,
    name: "Ruhul Shanto",
    role: "Product Manager",
    text: "The career pathway showed me how to upskill step by step. Today, I manage a global product team.",
  },
  {
    img: img9,
    name: "Fahima Borsha",
    role: "Data Analyst",
    text: "Thanks to Career Guideline, I transitioned from a teaching career to the tech industry smoothly.",
  },
  {
    img: img10,
    name: "Ruhul Amin",
    role: "Civil Service Officer",
    text: "The preparation roadmap and mentorship boosted my confidence. Now I proudly serve as a government officer.",
  },
];

const ClientReviewCard = ({ review, isActive }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 w-72 h-[400px] flex flex-col transition-all duration-300 
    ${isActive ? 'scale-105 shadow-xl border-2 border-green-400' : 'scale-95 opacity-70'}`}>
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <img
            src={review.img}
            alt={review.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-green-100"
          />
          {isActive && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              ★★★★★
            </div>
          )}
        </div>
        <h4 className="text-lg font-bold text-gray-800">{review.name}</h4>
        <p className="text-sm text-green-600 font-medium mb-3">{review.role}</p>
      </div>
      <div className="flex-grow flex items-center">
        <p className="text-gray-600 text-center italic">"{review.text}"</p>
      </div>
      {isActive && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-center">
            <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
              Verified Success Story
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ClientReview = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-slide
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % reviews.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Navigation functions
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Handle touch events for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Calculate visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 5;
  };

  const visibleCards = getVisibleCards();
  const centerIndex = Math.floor(visibleCards / 2);

  return (
    <section className="bg-gradient-to-br from-green-50 to-gray-100 py-16 px-4">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="flex flex-col justify-center items-center gap-4 text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Success Stories from Our Students
          <BsCheckCircle />
        </h1>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Thousands of students have transformed their careers by following our
          step-by-step guidelines. From scholarships to dream jobs, these are the
          real journeys of success.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto relative">
        <div
          className="flex overflow-hidden relative h-96 items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {
            reviews.map((review, idx) => {
              const position = (idx - current + reviews.length) % reviews.length;

              if (position >= visibleCards) return null;

              let style = "opacity-0 scale-75 translate-x-0 pointer-events-none hidden";

              if (position === 0 && visibleCards >= 3)
                style = "opacity-80 scale-95 -translate-x-48 z-10";
              else if (position === 1 && visibleCards >= 5)
                style = "opacity-90 scale-98 -translate-x-24 z-10";
              else if (position === centerIndex)
                style = "opacity-100 scale-100 z-20 transform translate-x-0";
              else if (position === visibleCards - 2 && visibleCards >= 5)
                style = "opacity-90 scale-98 translate-x-24 z-10";
              else if (position === visibleCards - 1 && visibleCards >= 3)
                style = "opacity-80 scale-95 translate-x-48 z-10";

              return (
                <div
                  key={idx}
                  className={`absolute transition-all duration-500 ease-in-out ${style}`}
                >
                  <ClientReviewCard review={review} isActive={position === centerIndex} />
                </div>
              );
            })
          }
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white shadow-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            aria-label="Previous review"
          >
            <ChevronLeftIcon className="w-6 h-6 text-green-700" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white shadow-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            aria-label="Next review"
          >
            <ChevronRightIcon className="w-6 h-6 text-green-700" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${idx === current ? "bg-green-600 scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to review ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReview;