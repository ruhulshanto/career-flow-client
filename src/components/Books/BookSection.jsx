import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router";
import BookDetailsCard from "./BookDetailsCard";

const BookSection = ({ latestResult, rating }) => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const numericRating = parseFloat(rating);
    const [selectedBook, setSelectedBook] = useState(null);
    const [expandedLevels, setExpandedLevels] = useState({});

    const careerId = latestResult.careerId || "doctor";

    const { data: booksData, isLoading, error } = useQuery({
        queryKey: ["books", careerId],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/books-by-category/${careerId}`);
                return res.data;
            } catch (err) {
                console.error("Error fetching books:", err);
                throw err;
            }
        },
        enabled: true,
    });

    const toggleLevelExpansion = (level) => {
        setExpandedLevels(prev => ({
            ...prev,
            [level]: !prev[level]
        }));
    };

    const getLevelConfig = (level) => {
        const configs = {
            "level1": {
                title: "Beginner",
                color: "success",
                gradient: "from-green-50 to-emerald-50",
                border: "border-green-200",
                badge: "badge-success",
                icon: "🟢"
            },
            "level2": {
                title: "Intermediate",
                color: "warning",
                gradient: "from-amber-50 to-orange-50",
                border: "border-amber-200",
                badge: "badge-warning",
                icon: "🟡"
            },
            "level3": {
                title: "Advanced",
                color: "error",
                gradient: "from-red-50 to-pink-50",
                border: "border-red-200",
                badge: "badge-error",
                icon: "🔴"
            }
        };
        return configs[level] || configs.level1;
    };

    const BookCard = ({ book, level }) => {
        const config = getLevelConfig(level);
        return (
            <div
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedBook(book)}
            >
                {/* Level Indicator */}
                <div className={`absolute btn btn-ghost bg-gray-200 -top-2 -left-2 ${config.badge} text-black font-bold text-xs px-3 py-1 rounded-full z-10 shadow-lg`}>
                    {config.icon} {config.title}
                </div>

                {/* Book Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                        src={book.image}
                        alt={book.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                    <div className="absolute top-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                            {book.pages}p
                        </div>
                    </div>
                </div>

                {/* Book Content */}
                <div className="p-5">
                    {/* Rating and Title */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                            <span className="text-yellow-500 text-sm mr-1">★</span>
                            <span className="font-semibold text-sm text-gray-700">{book.rating}</span>
                        </div>
                    </div>

                    <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {book.name}
                    </h3>

                    <p className="text-primary font-semibold text-sm mb-3">by {book.author}</p>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {book.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {new Date(book.date).getFullYear()}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                            </svg>
                            {book.pages} pages
                        </span>
                    </div>

                    {/* Action Button */}
                    <button
                        className="w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg text-sm transition-all duration-300 border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2 group/btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBook(book);
                        }}
                    >
                        <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                    </button>
                </div>
            </div>
        );
    };

    const renderBookLevel = (level, title) => {
        const config = getLevelConfig(level);
        const books = booksData?.books?.[level] || [];
        const isExpanded = expandedLevels[level] || books.length <= 4;

        if (books.length === 0) return null;

        return (
            <div className={`mb-8 ${config.gradient} p-6 rounded-2xl border ${config.border}`}>
                {/* Level Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-8 rounded-full bg-${config.color}`}></div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                            <p className="text-gray-600 text-sm">Perfect for {config.title.toLowerCase()} learners</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{books.length} books</span>
                        {books.length > 4 && (
                            <button
                                onClick={() => toggleLevelExpansion(level)}
                                className="btn btn-ghost btn-sm text-gray-600"
                            >
                                {isExpanded ? 'Show Less' : 'Show All'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Books Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${isExpanded ? '3' : '2'} xl:grid-cols-${isExpanded ? '4' : '2'} gap-6`}>
                    {books.slice(0, isExpanded ? books.length : 4).map((book, index) => (
                        <BookCard key={index} book={book} level={level} />
                    ))}
                </div>
            </div>
        );
    };

    const handleViewAllBooks = () => {
        navigate(`/books/${careerId}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <span className="ml-4 text-lg text-gray-600">Loading recommended books...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-8 p-6 bg-red-50 rounded-2xl border border-red-200">
                <h2 className="text-2xl font-bold mb-3 text-red-800">Recommended Books</h2>
                <p className="text-red-700">Error loading books: {error.message}</p>
            </div>
        );
    }

    if (!booksData || !booksData.books) {
        return (
            <div className="my-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                <h2 className="text-2xl font-bold mb-3 text-yellow-800">Recommended Books</h2>
                <p className="text-yellow-700">No books found for this career category.</p>
            </div>
        );
    }

    return (
        <div className="my-12">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Recommended Learning Path</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Based on your assessment results, we've curated these books to help you master {careerId.replace('-', ' ')}
                </p>
            </div>

            {/* Progress Indicator - Enhanced */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Your Current Level</h3>
                    <span className={`text-lg font-bold ${numericRating < 5 ? 'text-green-600' :
                            numericRating < 7 ? 'text-amber-600' :
                                'text-red-600'
                        }`}>
                        {numericRating < 5 ? 'Beginner' : numericRating < 7 ? 'Intermediate' : 'Advanced'}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                    </div>

                    <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full transition-all duration-700 ease-out ${numericRating < 5 ? 'bg-gradient-to-r from-green-400 to-green-500 w-1/3' :
                                        numericRating < 7 ? 'bg-gradient-to-r from-amber-400 to-amber-500 w-2/3' :
                                            'bg-gradient-to-r from-red-400 to-red-500 w-full'
                                    }`}
                            ></div>
                        </div>

                        {/* Current Position Marker */}
                        <div
                            className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg ${numericRating < 5 ? 'bg-green-500 left-1/4' :
                                    numericRating < 7 ? 'bg-amber-500 left-2/3' :
                                        'bg-red-500 left-full -ml-3'
                                }`}
                            style={{
                                left: numericRating < 5 ? '33%' :
                                    numericRating < 7 ? '66%' : '100%'
                            }}
                        ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0-4.9</span>
                        <span>5-6.9</span>
                        <span>7-10</span>
                    </div>
                </div>
            </div>

            {/* Books Sections */}
            <div className="space-y-8">
                {numericRating < 5 && (
                    <>
                        {renderBookLevel("level1", "Start Your Journey - Beginner Level")}
                        {renderBookLevel("level2", "Next Steps - Intermediate Level")}
                        {renderBookLevel("level3", "Master Level - Advanced Topics")}
                    </>
                )}

                {numericRating >= 5 && numericRating < 7 && (
                    <>
                        {renderBookLevel("level2", "Recommended Path - Intermediate Level")}
                        {renderBookLevel("level3", "Advanced Concepts - Expert Level")}
                    </>
                )}

                {numericRating >= 7 && (
                    <>
                        {renderBookLevel("level3", "Advanced Mastery - Expert Level")}
                    </>
                )}
            </div>

            {/* View All Books Button */}
            <div className="text-center mt-12">
                <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={handleViewAllBooks}
                >
                    Explore All Books For {careerId.replace('-', ' ')}
                </button>
            </div>

            {/* Book Details Modal */}
            {selectedBook && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-6xl max-h-screen overflow-y-auto p-0">
                        <button
                            className="btn btn-sm btn-circle absolute right-4 top-4 z-10 bg-white shadow-lg"
                            onClick={() => setSelectedBook(null)}
                        >
                            ✕
                        </button>
                        <BookDetailsCard book={selectedBook} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookSection;