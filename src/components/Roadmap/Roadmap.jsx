import { useNavigate } from "react-router";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Roadmap = () => {
  const [undergrad, setUndergrad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const handleGetStarted = () => {
    if (undergrad) {
      navigate("/roadLayout/chooseGoal");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setUndergrad(!undergrad);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Career Flow Roadmap
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover your ideal career path with our personalized assessment.
            Answer a few questions and get tailored recommendations based on your interests and strengths.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="steps steps-horizontal">
            <div className="step step-primary">
              <div className="step-circle">1</div>
              <div className="step-label">Verify</div>
            </div>
            <div className="step">
              <div className="step-circle">2</div>
              <div className="step-label">Choose Goal</div>
            </div>
            <div className="step">
              <div className="step-circle">3</div>
              <div className="step-label">Take Quiz</div>
            </div>
            <div className="step">
              <div className="step-circle">4</div>
              <div className="step-label">Get Results</div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-auto max-w-2xl" data-aos="zoom-in" data-aos-delay="400">
          {/* Verification Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Let's Get Started!
            </h2>
            <p className="text-gray-600 mb-6">
              First, let's verify your current academic status to provide you with the most relevant career guidance.
            </p>
          </div>

          {/* Checkbox Section */}
          <div
            className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer mb-8 ${undergrad
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              }`}
            onClick={() => setUndergrad(!undergrad)}
            onKeyPress={handleKeyPress}
            tabIndex={0}
            role="checkbox"
            aria-checked={undergrad}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${undergrad
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-white border-gray-300 text-transparent'
                  }`}>
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    I am an undergraduate student
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Currently pursuing or completed undergraduate studies
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                className="checkbox checkbox-lg hidden"
                checked={undergrad}
                onChange={(e) => setUndergrad(e.target.checked)}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleGetStarted}
              disabled={!undergrad}
              className={`btn btn-lg w-full max-w-xs text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${undergrad
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white shadow-lg hover:shadow-xl'
                : 'btn-disabled bg-gray-100 text-gray-400'
                }`}
            >
              {undergrad ? (
                <span className="flex items-center justify-center gap-2">
                  Choose Your GOAL
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              ) : (
                "Please verify above"
              )}
            </button>

            {!undergrad && (
              <p className="text-sm text-gray-500 mt-3">
                You need to verify your undergraduate status to continue
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10 w-full mxa-aut ">
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline btn-lg rounded-full px-8 text-gray-600 hover:bg-gray-100"
            ><IoArrowBackCircleOutline className="text-2xl"/> Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;