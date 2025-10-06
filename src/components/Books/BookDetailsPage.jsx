// src/components/Books/BookDetailsPage.jsx
import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import BookDetailsCard from "./BookDetailsCard";

const BookDetailsPage = () => {
    const { careerId, bookId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // In a real app, you'd fetch the specific book by ID
    // For now, we'll fetch all books and find the matching one
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

    // Find the specific book (you might want to modify your API to fetch by book ID)
    const booksByLevel = categoryData?.books || {};
    const allBooks = Object.values(booksByLevel).flat();
    const book = allBooks.find(b => b._id === bookId) || allBooks[0]; // Fallback to first book

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-lg">Loading book details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="alert alert-error shadow-lg max-w-md">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="font-bold">Error loading book!</h3>
                            <div className="text-xs">{error.message}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">❌</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Book Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested book could not be found.</p>
                    <button 
                        onClick={() => navigate(`/books/${careerId}`)}
                        className="btn btn-primary"
                    >
                        Back to Books
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Navigation */}
                <div className="mb-6">
                    <div className="text-sm breadcrumb">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={`/books/${careerId}`}>Books</Link></li>
                            <li>{book.name}</li>
                        </ul>
                    </div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="btn btn-ghost btn-sm mt-2"
                    >
                        ← Back
                    </button>
                </div>

                {/* Book Details */}
                <BookDetailsCard book={book} />
            </div>
        </div>
    );
};

export default BookDetailsPage;