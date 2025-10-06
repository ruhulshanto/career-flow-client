import { useNavigate, useParams, useLocation } from "react-router";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Result = () => {
  const { score, total } = useParams();
  const location = useLocation();
  const careerId = location.state?.careerId;
  const careerTitle = location.state?.careerTitle || careerId;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const rating = ((Number(score) / Number(total)) * 10).toFixed(1);
  const percentage = ((Number(score) / Number(total)) * 100).toFixed(1);

  const getRatingColor = () => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return 'text-green-600 bg-green-100 border-green-200';
    if (numRating >= 6) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };


  const getRatingLevel = () => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "Advanced";
    if (numRating >= 6) return "Intermediate";
    return "Beginner";
  };

  const handleUpgrade = async () => {
    try {
      const payload = {
        userId: user?.email,
        score: Number(score),
        total: Number(total),
        date: new Date(),
        careerId: careerId,
        careerTitle: careerTitle,
        rating: parseFloat(rating),
        level: getRatingLevel()
      };

      const result = await axiosSecure.post("/results", payload);
      console.log("Save result response:", result.data);

      navigate("/dashboard/myDashboard");
    } catch (err) {
      console.error("Error saving result:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">

        {/* Header Section */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Assessment Complete!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Here are your results for <strong>{careerTitle}</strong>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12" data-aos="fade-up">
          <div className="steps steps-horizontal">
            <div className="step step-primary">
              <div className="step-circle">✓</div>
              <div className="step-label">Verify</div>
            </div>
            <div className="step step-primary">
              <div className="step-circle">✓</div>
              <div className="step-label">Choose Goal</div>
            </div>
            <div className="step step-primary">
              <div className="step-circle">✓</div>
              <div className="step-label">Take Quiz</div>
            </div>
            <div className="step step-primary">
              <div className="step-circle">4</div>
              <div className="step-label">Get Results</div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-auto max-w-2xl" data-aos="zoom-in" data-aos-delay="400">
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-white">{rating}/10</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md border">
                <span className={`text-sm font-semibold ${getRatingColor().split(' ')[0]}`}>
                  {percentage}%
                </span>
              </div>
            </div>

            {/* Rating Badge */}

            <p className="text-gray-600">
              You answered <span className="font-bold text-blue-600">{score}</span> out of{" "}
              <span className="font-bold text-blue-600">{total}</span> questions correctly.
            </p>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-green-50 rounded-2xl border-2 border-green-200">
              <div className="text-2xl mb-2"></div>
              <h3 className="font-semibold text-gray-800">Correct Answers</h3>
              <p className="text-2xl font-bold text-green-600">{score}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-2xl border-2 border-red-200">
              <div className="text-2xl mb-2"></div>
              <h3 className="font-semibold text-gray-800">Incorrect Answers</h3>
              <p className="text-2xl font-bold text-red-600">{total - score}</p>
            </div>
            <div className={`text-center p-4 rounded-2xl border-2 ${getRatingColor()}`}>
              <div className="text-2xl mb-2"></div>
              <h3 className="font-semibold text-gray-800">Success Rate</h3>
              <p className={`text-2xl font-bold ${getRatingColor().split(' ')[0]}`}>{percentage}%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <button
              onClick={handleUpgrade}
              className="btn btn-lg w-full max-w-md bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Begin Your Skill Upgrade
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="btn btn-ghost rounded-full px-8 text-gray-600 hover:bg-gray-100 flex items-center gap-2"
              >
               <IoArrowBackCircleOutline className="text-3xl"/> Home
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Result;