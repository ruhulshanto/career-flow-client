import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import InstructorCard from "./InstructorCard";
import { useState } from "react";

const AllInstructors = ({ careerId }) => {
    const axiosSecure = useAxiosSecure();
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    const { data: categoryData, isLoading, error } = useQuery({
        queryKey: ["instructors-by-category", careerId],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/instructors-by-category/${careerId}`);
                return res.data;
            } catch (err) {
                console.error("Error fetching category instructors:", err);
                throw err;
            }
        },
        enabled: !!careerId,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-8">
                <span className="loading loading-spinner loading-md"></span>
                <span className="ml-2">Loading Advisor...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-8 p-4 bg-red-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">All Instructors</h2>
                <p>Error loading Advisor: {error.message}</p>
            </div>
        );
    }

    const instructorsByLevel = categoryData?.instructors || {};
    const allInstructorsForCategory = Object.values(instructorsByLevel).flat();

    if (!allInstructorsForCategory || allInstructorsForCategory.length === 0) {
        return (
            <div className="my-8 p-4 bg-yellow-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">All Advisor</h2>
                <p>No Advisor were found for this category.</p>
            </div>
        );
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">All Advisor For Your Goal</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allInstructorsForCategory.map((instructor, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                        onClick={() => setSelectedInstructor(instructor)}
                    >
                        <div className="relative">
                            <img
                                src={instructor.image}
                                alt={instructor.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                TOP RATED
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{instructor.name}</h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium mr-2">Specialization:</span>
                                    <span className="truncate">{instructor.specialization}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium mr-2">Experience:</span>
                                    <span>{instructor.experience}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium mr-2">Rating:</span>
                                    <span className="flex items-center">
                                        {instructor.rating}/5
                                        <svg className="w-4 h-4 text-amber-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium mr-2">Students:</span>
                                    <span>{instructor.students}</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Instructor Detail Modal */}
            {selectedInstructor && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl max-h-screen overflow-y-auto">
                        <button
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                            onClick={() => setSelectedInstructor(null)}
                        >
                            ✕
                        </button>
                        <InstructorCard instructor={selectedInstructor} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllInstructors;