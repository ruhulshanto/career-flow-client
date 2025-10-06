
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useState } from "react";
import BookDetailsCard from "./BookDetailsCard";

const AllBooksPage = () => {
    const { careerId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [selectedBook, setSelectedBook] = useState(null);

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

    const getBookLevel = (book) => {
        if (book.level) return book.level;
        if (book.tags?.includes('advanced')) return "level3";
        if (book.tags?.includes('intermediate')) return "level2";
        return "level1";
    };

    const { data: categoryData, isLoading, error } = useQuery({
        queryKey: ["books-by-category", careerId],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/books-by-category/${careerId}`);
                return res.data;
            } catch (err) {
                console.error("Error fetching category books:", err);
                throw err;
            }
        },
        enabled: !!careerId,
    });

    const BookCard = ({ book }) => {
        const level = getBookLevel(book);
        const config = getLevelConfig(level);

        return (
            <div
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedBook(book)}
            >
                {/* Level Indicator - Same design as BookSection */}
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
                        View Book Details
                    </button>
                </div>
            </div>
        );
    };

    const CompactBookCard = ({ book, level }) => {
        const config = getLevelConfig(level);

        return (
            <div
                className="group bg-white p-4 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => setSelectedBook(book)}
            >
                <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-20 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className={`absolute -top-2 -left-2 ${config.badge} text-white text-xs px-2 py-1 rounded-full font-bold`}>
                            {config.icon}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                            {book.name}
                        </h3>
                        <p className="text-primary text-sm mt-1">by {book.author}</p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                                </svg>
                                {book.pages}p
                            </span>
                            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                                <span className="text-yellow-500 text-xs mr-1">★</span>
                                <span className="font-semibold text-xs text-gray-700">{book.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading books...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">Error loading books!</h3>
                    <p className="text-red-700 mb-4">{error.message}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-error btn-sm text-white"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const booksByLevel = categoryData?.books || {};
    const allBooksForCategory = Object.values(booksByLevel).flat();

    if (!allBooksForCategory || allBooksForCategory.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">No Books Available</h2>
                    <p className="text-gray-600 mb-6">No books were found for this career category.</p>
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

    return (
        <div className="min-h-screen bg-base-100 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <button
                                onClick={() => navigate(-1)}
                                className="btn btn-ghost btn-sm mb-4 rounded-full border border-gray-300 hover:border-gray-400"
                            >
                                ← Back to Results
                            </button>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                All Books for {careerId?.charAt(0).toUpperCase() + careerId?.slice(1).replace('-', ' ')}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Browse through all available books for your career path
                            </p>
                        </div>
                        <div className="bg-primary text-white px-4 py-2 rounded-full font-bold text-lg">
                            {allBooksForCategory.length} Books
                        </div>
                    </div>
                </div>

                {/* All Books Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <span className="w-3 h-8 bg-primary rounded-full"></span>
                        All Available Books
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allBooksForCategory.map((book, index) => (
                            <BookCard key={index} book={book} />
                        ))}
                    </div>
                </div>

                {/* Level-wise Books Sections */}
                {Object.entries(booksByLevel).map(([level, books]) => (
                    books.length > 0 && (
                        <div key={level} className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-8 rounded-full bg-${getLevelConfig(level).color}`}></div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 capitalize">
                                            {level.replace('level', 'Level ')} Books
                                        </h2>
                                        <p className="text-gray-600">Perfect for {getLevelConfig(level).title.toLowerCase()} learners</p>
                                    </div>
                                </div>
                                <div className={`badge badge-lg ${getLevelConfig(level).badge} text-white font-bold`}>
                                    {books.length} books
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {books.map((book, index) => (
                                    <CompactBookCard key={index} book={book} level={level} />
                                ))}
                            </div>
                        </div>
                    )
                ))}
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

export default AllBooksPage;