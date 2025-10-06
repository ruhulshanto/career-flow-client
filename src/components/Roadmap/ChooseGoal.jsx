
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ChooseGoal = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
    retry: 0,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center" data-aos="fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading career options...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center" data-aos="zoom-in">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Failed</h2>
          <p className="text-gray-600 mb-6">Failed to load career categories: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary rounded-full px-6"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categories = data?.[0]?.categories || [];

  const getCategoryIcon = (categoryId) => {
    const icons = {
      'doctor': '👨‍⚕️',
      'engineer': '👨‍💻',
      'pharmacy': '💊',
      'technology': '🤖',
      'design': '🎨',
      'environmental_science': '🌱',
      'biotechnology': '🧬',
      'clinical_psychology': '🧠',
      'nursing': '👩‍⚕️',
      'bba': '💼',
      'mechanical_engineering': '⚙️',
      'civil_engineering': '🏗️',
      'fashion_design': '👗',
      'animation': '🎬',
      'electrical_engineering': '⚡'
    };
    return icons[categoryId] || '🎯';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12" data-aos="fade-down">
         
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Choose Your Career Path
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select the career field that interests you most. We'll assess your compatibility
            and provide personalized recommendations to guide your journey.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="steps steps-horizontal">
            <div className="step step-primary">
              <div className="step-circle">✓</div>
              <div className="step-label">Verify</div>
            </div>
            <div className="step step-primary">
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

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-blue-200 group"
              onClick={() => navigate(`/roadLayout/questions/${cat.id}`)}
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{getCategoryIcon(cat.id)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {cat.questions?.length || 15} assessment questions
                </p>
                <div className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full inline-block">
                  Start Assessment
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="400">
          <p className="text-gray-600 mb-6">
            Can't decide? You can always come back and explore other options later.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/roadLayout/roadmap")}
              className="btn btn-outline rounded-full px-8 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              ← Back to Verification
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-ghost rounded-full px-8 text-gray-600 hover:bg-gray-100"
            >
             Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseGoal;