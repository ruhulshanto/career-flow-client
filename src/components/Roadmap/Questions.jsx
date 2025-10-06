
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";

const Questions = () => {
    const axiosSecure = useAxiosSecure();
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
            offset: 50
        });
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ["questions", questionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/questions/${questionId}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
                <div className="text-center" data-aos="fade-in">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-700">Preparing your assessment...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center" data-aos="zoom-in">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">❓</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find the assessment questions.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-primary rounded-full px-6"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const questions = data.questions;
    const category = data.categories?.find(cat => cat.id === questionId) || { title: questionId };

    const handleAnswer = (isCorrect, optionIndex) => {
        setSelectedOption(optionIndex);
        
        setTimeout(() => {
            if (isCorrect) setScore((s) => s + 1);
            
            if (current < questions.length - 1) {
                setCurrent((c) => c + 1);
                setSelectedOption(null);
            } else {
                navigate(`/roadLayout/result/${score + (isCorrect ? 1 : 0)}/${questions.length}`, {
                    state: { careerId: questionId, careerTitle: category.title }
                });
            }
        }, 500);
    };

    const currentQuestion = questions[current];
    const progressPercentage = ((current + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8" data-aos="fade-down">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Career Assessment
                    </h1>
                    <p className="text-lg text-gray-600">Assessing your compatibility with: <strong>{category.title}</strong></p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8" data-aos="fade-up">
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
                            <div className="step-circle">3</div>
                            <div className="step-label">Take Quiz</div>
                        </div>
                        <div className="step">
                            <div className="step-circle">4</div>
                            <div className="step-label">Get Results</div>
                        </div>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Question {current + 1} of {questions.length}
                            </h2>
                            <p className="text-sm text-gray-600">Career: {category.title}</p>
                        </div>
                        <span className="text-blue-600 font-bold text-lg">
                            {Math.round(progressPercentage)}%
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Started</span>
                        <span>Complete</span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden" data-aos="zoom-in" data-aos-delay="400">
                    <div className="p-6 md:p-8">
                        <div className="mb-8 text-center">
                            <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                                {currentQuestion.text}
                            </p>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(opt.isCorrect, i)}
                                    disabled={selectedOption !== null}
                                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                                        selectedOption === i
                                            ? opt.isCorrect
                                                ? 'border-green-500 bg-green-50 shadow-md'
                                                : 'border-red-500 bg-red-50 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                                    } ${selectedOption !== null && selectedOption !== i ? 'opacity-50' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                                            selectedOption === i
                                                ? opt.isCorrect
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'bg-red-500 border-red-500 text-white'
                                                : 'bg-gray-100 border-gray-300 text-gray-600'
                                        }`}>
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <span className="font-medium">{opt.text}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                        <p className="text-center text-sm text-gray-500">
                            {selectedOption === null 
                                ? "Select the best answer to continue"
                                : "Moving to next question..."
                            }
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="600">
                    <button
                        onClick={() => navigate("/roadLayout/chooseGoal")}
                        className="btn btn-outline rounded-full px-6"
                    >
                        ← Choose Different Career
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;