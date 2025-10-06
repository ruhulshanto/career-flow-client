import { useState, useEffect } from 'react';

const Process = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    { 
      number: 1, 
      title: "Frame the Problem", 
      desc: "Understand your career goals and aspirations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      number: 2, 
      title: "Collect Information", 
      desc: "Gather details on courses, universities, and visa processes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      number: 3, 
      title: "Explore Options", 
      desc: "Compare opportunities and align with your goals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    { 
      number: 4, 
      title: "Start Your Journey", 
      desc: "Get admission, visa, and support until you arrive abroad.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => prev === 4 ? 1 : prev + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="process" className="px-4 py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Working <span className="text-blue-600">Process</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A streamlined approach to guide you through your career development journey
          </p>
        </div>

        {/* Progress line for desktop */}
        <div className="hidden lg:flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 -z-10"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2 transition-all duration-500 -z-10" 
            style={{ width: `${(activeStep - 1) * 33.33}%` }}
          ></div>
          
          {steps.map((step) => (
            <div 
              key={step.number} 
              className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                step.number <= activeStep 
                  ? 'bg-blue-600 border-blue-600 text-white scale-110' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
              onMouseEnter={() => setActiveStep(step.number)}
            >
              <span className="text-xl font-bold">{step.number}</span>
            </div>
          ))}
        </div>

        {/* Mobile step indicators */}
        <div className="flex lg:hidden justify-center mb-8 space-x-4">
          {steps.map((step) => (
            <button
              key={step.number}
              className={`w-4 h-4 rounded-full transition-colors ${
                step.number === activeStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setActiveStep(step.number)}
              aria-label={`Go to step ${step.number}`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 transform ${
                step.number === activeStep
                  ? 'scale-105 border-2 border-blue-600 shadow-xl'
                  : 'scale-100 border border-gray-100 opacity-80'
              }`}
              onMouseEnter={() => setActiveStep(step.number)}
            >
              <div className={`mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center ${
                step.number === activeStep 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {step.icon}
              </div>
              
              <div className={`text-3xl font-bold mb-2 ${
                step.number === activeStep ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {step.number}
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed">
                {step.desc}
              </p>
              
              {/* Animated underline for active step */}
              {step.number === activeStep && (
                <div className="mt-4 h-1 w-12 bg-blue-600 rounded-full transition-all duration-500"></div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation buttons for mobile */}
        <div className="flex lg:hidden justify-center mt-10 space-x-4">
          <button
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
            className="px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;