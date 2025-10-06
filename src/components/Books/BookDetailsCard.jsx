// src/components/Books/BookDetailsCard.jsx
import { useState, useEffect } from 'react';
import { GiStairsGoal } from 'react-icons/gi';
import { LuNotebookPen } from 'react-icons/lu';
import { MdOutlineContentPasteSearch } from 'react-icons/md';

const BookDetailsCard = ({ book }) => {
    const [reviews, setReviews] = useState([]);

    // Sample reviews data
    const sampleReviews = [
        {
            text: "This book completely changed my perspective on the subject. The examples are practical and easy to follow.",
            author: "Sarah Johnson",
            rating: 5,
            date: "2024-01-15"
        },
        {
            text: "Excellent resource for beginners and intermediate learners alike. The exercises are challenging but rewarding.",
            author: "Michael Chen",
            rating: 4,
            date: "2024-01-10"
        },
        {
            text: "Well-structured and comprehensive. I've recommended this to all my colleagues.",
            author: "Emma Rodriguez",
            rating: 5,
            date: "2024-01-05"
        },
        {
            text: "The author explains complex concepts in a very accessible way. Perfect for self-study.",
            author: "David Kim",
            rating: 5,
            date: "2023-12-28"
        }
    ];

    // Generate random reviews for each book
    useEffect(() => {
        const getRandomReviews = () => {
            const shuffled = [...sampleReviews].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 2 + Math.floor(Math.random() * 2));
        };

        setReviews(getRandomReviews());
    }, [book]);

    // Function to render star ratings
    const renderStars = (rating) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    // Calculate reading time (assuming 200 words per minute)
    const calculateReadingTime = (pages) => {
        const wordsPerPage = 300;
        const wordsPerMinute = 200;
        const totalMinutes = Math.ceil((pages * wordsPerPage) / wordsPerMinute);

        if (totalMinutes < 60) return `${totalMinutes} minutes`;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Book Cover and Basic Info */}
                <div className="lg:w-2/5">
                    <div className="sticky top-6">
                        <div className="relative">
                            <img
                                src={book.image}
                                alt={book.name}
                                className="w-full h-80 object-cover rounded-2xl shadow-lg"
                            />
                            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {book.pages} pages
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 bg-base-100 p-4 rounded-2xl shadow-sm border">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">{book.rating}</p>
                                    <p className="text-sm text-gray-600">Rating</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">{book.pages}</p>
                                    <p className="text-sm text-gray-600">Pages</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">
                                        {calculateReadingTime(book.pages)}
                                    </p>
                                    <p className="text-sm text-gray-600">Reading Time</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">
                                        {new Date(book.date).getFullYear()}
                                    </p>
                                    <p className="text-sm text-gray-600">Published</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-4">
                            <button className="btn btn-primary gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Start Reading
                            </button>
                            <button className="btn btn-outline gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Add to Favorites
                            </button>
                            <button className="btn btn-ghost gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share Book
                            </button>
                        </div>
                    </div>
                </div>
                {/* Book Details */}
                {/* Book Details */}
<div className="lg:w-3/5 w-full px-4 lg:px-0">
    {/* Header Section */}
    <div className="mb-8">
        {/* Badges and Rating */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge badge-primary badge-lg px-4 py-2 rounded-full font-semibold">
                {book.level || 'All Levels'}
            </span>
            <span className="badge badge-outline badge-lg px-4 py-2 rounded-full border-2 font-semibold">
                {book.category || 'Education'}
            </span>
            <div className="flex items-center ml-auto bg-base-200 px-3 py-1 rounded-full">
                <div className="flex items-center">
                    {renderStars(book.rating)}
                    <span className="ml-2 font-bold text-gray-900">{book.rating}/5</span>
                </div>
            </div>
        </div>

        {/* Title and Author */}
        <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {book.name}
            </h1>
            <p className="text-xl text-primary font-semibold mb-4 flex items-center">
                <span className="w-1 h-6 bg-primary mr-3 rounded-full"></span>
                by {book.author}
            </p>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-base-100 to-base-50 p-6 rounded-xl border-l-4 border-primary">
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                {book.description ||
                    "A comprehensive guide that takes you from basic concepts to advanced techniques. Perfect for learners at all stages."}
            </p>
        </div>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Book Information */}
        <div className="bg-base-100 p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="flex items-center justify-center gap-2 font-bold text-lg mb-4 text-gray-800">
                <LuNotebookPen className="text-primary text-xl" />
                Book Information
            </h3>
            <div className="space-y-3">
                {[
                    { label: "Publisher:", value: book.publisher || "Tech Publications" },
                    { label: "ISBN:", value: book.isbn || "978-3-16-148410-0" },
                    { label: "Language:", value: "English" },
                    { label: "Format:", value: "Paperback & Digital" }
                ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600 font-medium">{item.label}</span>
                        <span className="font-semibold text-gray-900 text-right">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-base-100 p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="flex items-center justify-center gap-2 font-bold text-lg mb-4 text-gray-800">
                <GiStairsGoal className="text-primary text-xl" />
                Learning Outcomes
            </h3>
            <ul className="space-y-3">
                {[
                    "Master fundamental concepts",
                    "Practical project experience", 
                    "Industry best practices",
                    "Advanced problem-solving skills"
                ].map((outcome, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{outcome}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>

    {/* Table of Contents */}
    <div className="mb-8">
        <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-gray-800">
            <MdOutlineContentPasteSearch className="text-primary text-2xl" />
            Table of Contents
        </h3>
        <div className="bg-base-100 rounded-xl border shadow-sm divide-y divide-gray-100 overflow-hidden">
            {[1, 2, 3, 4, 5].map((chapter) => (
                <div key={chapter} className="flex justify-between items-center p-4 hover:bg-base-200 transition-colors duration-200 group">
                    <div className="flex items-center">
                        <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                            {chapter}
                        </span>
                        <span className="text-gray-700 font-medium group-hover:text-gray-900">
                            Chapter {chapter}: Introduction to Key Concepts
                        </span>
                    </div>
                    <span className="text-sm text-gray-500 bg-base-300 px-3 py-1 rounded-full">
                        Pages {chapter * 20 - 19}-{chapter * 20}
                    </span>
                </div>
            ))}
        </div>
    </div>

    {/* Reviews Section */}
    <div>
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-yellow-500">🌟</span>
                Customer Reviews
            </h3>
            <span className="text-sm text-gray-600 bg-base-200 px-3 py-1 rounded-full">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </span>
        </div>

        <div className="space-y-4">
            {reviews.map((review, index) => (
                <div key={index} className="bg-base-100 p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                        <div className="flex items-center mb-2 sm:mb-0">
                            <div className="flex items-center bg-base-200 px-3 py-1 rounded-full">
                                {renderStars(review.rating)}
                                <span className="ml-2 font-semibold text-gray-900">{review.rating}.0</span>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </span>
                    </div>
                    <p className="text-gray-700 mb-3 text-lg leading-relaxed">"{review.text}"</p>
                    <p className="text-base text-gray-800 font-semibold">— {review.author}</p>
                </div>
            ))}
        </div>

        {reviews.length === 0 && (
            <div className="text-center py-8 bg-base-100 rounded-xl border-2 border-dashed">
                <div className="text-4xl mb-3">📚</div>
                <p className="text-gray-500 text-lg font-medium">
                    No reviews yet. Be the first to review this book!
                </p>
                <button className="mt-4 btn btn-primary btn-sm rounded-full px-6">
                    Write a Review
                </button>
            </div>
        )}
    </div>
</div>
            </div>
        </div>
    );
};

export default BookDetailsCard;