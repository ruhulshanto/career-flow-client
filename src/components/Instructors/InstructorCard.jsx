
import { useState, useEffect } from 'react';

const InstructorCard = ({ instructor }) => {
    const [reviews, setReviews] = useState([]);

    const sampleReviews = [
        {
            text: "Excellent instructor! Explained complex concepts in a very understandable way.",
            author: "Sarah Johnson",
            rating: 5,
            course: "Web Development Fundamentals"
        },
        {
            text: "Great course material and very responsive to questions. Would definitely recommend!",
            author: "Michael Chen",
            rating: 4,
            course: "JavaScript Mastery"
        },
        {
            text: "Changed my perspective on programming entirely. The projects were challenging but rewarding.",
            author: "Emma Rodriguez",
            rating: 5,
            course: "React.js Deep Dive"
        },
        {
            text: "Patient and knowledgeable. Always went the extra mile to ensure we understood the material.",
            author: "David Kim",
            rating: 5,
            course: "Node.js Backend Development"
        },
        {
            text: "The best instructor I've had! Made learning fun and engaging with real-world examples.",
            author: "Priya Sharma",
            rating: 5,
            course: "Full-Stack Development"
        },
        {
            text: "Challenging but fair. I learned more in this course than any other I've taken.",
            author: "James Wilson",
            rating: 4,
            course: "Data Structures & Algorithms"
        },
        {
            text: "Well-structured curriculum with practical assignments that reinforced the concepts.",
            author: "Sophia Martinez",
            rating: 5,
            course: "Database Design"
        },
        {
            text: "Instructor was passionate about the subject which made the classes enjoyable.",
            author: "Liam Anderson",
            rating: 4,
            course: "UI/UX Design Principles"
        }
    ];

    useEffect(() => {
        const getRandomReviews = () => {
            const shuffled = [...sampleReviews].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 2 + Math.floor(Math.random() * 2));
        };
        setReviews(getRandomReviews());
    }, [instructor]);

    const renderStars = (rating) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Instructor Image and Stats */}
                <div className="lg:w-2/5">
                    <div className="relative">
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-full h-80 object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">{instructor.students}+</div>
                            <div className="text-sm text-blue-800 font-medium">Students</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">{instructor.experience}+</div>
                            <div className="text-sm text-blue-800 font-medium">Experience</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-2xl text-center border border-amber-200">
                            <div className="text-2xl font-bold text-amber-600">98%</div>
                            <div className="text-sm text-amber-800 font-medium">Success Rate</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-center border border-purple-200">
                            <div className="text-2xl font-bold text-purple-600">4.9</div>
                            <div className="text-sm text-purple-800 font-medium">Rating</div>
                        </div>


                    </div>
                </div>

                {/* Instructor Details */}
                <div className="lg:w-3/5">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{instructor.name}</h2>
                        <p className="text-blue-600 font-semibold text-lg mb-4">{instructor.specialization}</p>
                        
                        <div className="flex items-center gap-2 mb-6">
                            {renderStars(Math.floor(instructor.rating))}
                            <span className="text-gray-600 font-medium">{instructor.rating}/5 Rating</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    About Me
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Passionate educator with {instructor.experience} of experience in {instructor.specialization}. 
                                    Committed to helping students achieve their learning goals through practical, real-world projects 
                                    and personalized guidance.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    Teaching Style
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    I believe in learning by doing. My courses focus on hands-on projects that reinforce theoretical concepts. 
                                    I encourage questions and discussion to ensure every student fully understands the material.
                                </p>
                            </div>
                        </div>

                        {/* Specializations */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">Specializations</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Web Development", "JavaScript", "React.js", "Node.js", "MongoDB", "API Design"].map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Book a Session
                            </button>
                            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all duration-300">
                                Send Message
                            </button>
                            <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-all duration-300">
                                Share Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Student Reviews
                </h3>

                <div className="flex flex-col gap-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    {renderStars(review.rating)}
                                    <span className="text-lg font-bold text-gray-700 ml-2">{review.rating}.0</span>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                    {review.course}
                                </span>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4 italic">"{review.text}"</p>
                            <p className="text-gray-600 font-medium">— {review.author}</p>
                        </div>
                    ))}
                </div>

                {reviews.length === 0 && (
                    <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this instructor!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorCard;