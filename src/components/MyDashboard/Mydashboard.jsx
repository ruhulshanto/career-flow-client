
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import ResultTable from "../Roadmap/ResultTable";
import BookSection from "../Books/BookSection";
import InstructorSection from "../Instructors/InstructorSection";


const MyDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: results = [], isLoading, refetch } = useQuery({
        queryKey: ["results", user?.email],
        queryFn: async () => {
            if (!user) return [];
            const { data } = await axiosSecure.get(`/results/${user.email}`);
            return data;
        },
        enabled: !!user
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                    <p className="text-lg font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-4xl">📊</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Welcome, {user?.displayName || "Student"}!</h1>
                    <p className="text-gray-600 mb-6">
                        Start your learning journey by taking a career assessment quiz to get personalized recommendations.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/roadLayout/roadmap'}
                        className="btn btn-primary btn-lg w-full"
                    >
                        Take Career Quiz
                    </button>
                </div>
            </div>
        );
    }

    const latestResult = results[results.length - 1];
    const rating = ((latestResult.score / latestResult.total) * 10).toFixed(1);

    return (
        <div className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="avatar online mb-4">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName} />
                            ) : (
                                <div className="bg-primary text-white w-full h-full flex items-center justify-center text-2xl font-bold">
                                    {user?.displayName?.charAt(0) || 'U'}
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.displayName || "Student"}!</h1>
                    <p className="text-lg text-gray-600">Continue your personalized learning journey</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stat bg-base-200 rounded-2xl">
                        <div className="stat-figure text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div className="stat-title">Quizzes Taken</div>
                        <div className="stat-value text-primary">{results.length}</div>
                    </div>
                    
                    <div className="stat bg-base-200 rounded-2xl">
                        <div className="stat-figure text-secondary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="stat-title">Latest Score</div>
                        <div className="stat-value text-secondary">{rating}/10</div>
                    </div>
                    
                    <div className="stat bg-base-200 rounded-2xl">
                        <div className="stat-figure text-accent">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div className="stat-title">Career Path</div>
                        <div className="stat-value text-accent text-xl capitalize">{latestResult.careerId || "Not Set"}</div>
                    </div>
                </div>

                {/* Quiz Results */}
                <div className="bg-base-200 rounded-2xl p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Your Quiz History
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Quiz</th>
                                    <th>Score</th>
                                    <th>Rating</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <ResultTable
                                        key={result._id}
                                        result={result}
                                        index={index}
                                        refetch={refetch}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Learning Resources - Books First */}
                {
                latestResult.careerId ? (
                    <div className="space-y-8">
                        {/* Books Section */}
                        <div className="bg-base-100 rounded-2xl p-6 shadow-sm border">
                            <BookSection
                                latestResult={latestResult}
                                rating={rating}
                            />
                        </div>

                        {/* Instructors Section */}
                        <div className="bg-base-100 rounded-2xl p-6 shadow-sm border">
                            <InstructorSection
                                latestResult={latestResult}
                                rating={rating}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-warning shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div>
                                <h3 className="font-bold">Career information needed!</h3>
                                <div className="text-xs">Take a new quiz to get personalized learning recommendations.</div>
                            </div>
                        </div>
                        <div className="flex-none">
                            <button 
                                onClick={() => window.location.href = '/roadLayout/roadmap'}
                                className="btn btn-sm btn-warning"
                            >
                                Take Quiz
                            </button>
                        </div>
                    </div>
                )
                }

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button 
                        onClick={() => window.location.href = '/roadLayout/roadmap'}
                        className="btn btn-primary btn-outline gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Take Another Quiz
                    </button>
                    <button 
                        onClick={() => window.location.href = '/roadLayout/chooseGoal'}
                        className="btn btn-secondary btn-outline gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Explore Careers
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyDashboard;