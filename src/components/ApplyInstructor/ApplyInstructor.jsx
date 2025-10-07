
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useState } from "react";
import { 
    FaUser, 
    FaEnvelope, 
    FaGraduationCap, 
    FaChartLine, 
    FaBriefcase, 
    FaEdit,
    FaArrowLeft,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

const ApplyInstructor = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Available categories based on your MongoDB structure
    const categories = [
        { id: "doctor", title: "Doctor (MBBS)", icon: "🩺" },
        { id: "engineer", title: "Engineer (B.Tech)", icon: "⚙️" },
        { id: "software", title: "Software Developer", icon: "💻" },
        { id: "data-science", title: "Data Scientist", icon: "📊" },
        { id: "business", title: "Business Administration", icon: "💼" },
        { id: "design", title: "Graphic Design", icon: "🎨" },
        { id: "marketing", title: "Digital Marketing", icon: "📱" },
        { id: "finance", title: "Finance & Accounting", icon: "💰" },
        { id: "education", title: "Teaching & Education", icon: "📚" },
        { id: "healthcare", title: "Healthcare", icon: "🏥" }
    ];

    const experienceLevels = [
        { value: "level1", label: "Beginner Level (1-3 years)", description: "Foundational teaching" },
        { value: "level2", label: "Intermediate Level (4-7 years)", description: "Practical experience" },
        { value: "level3", label: "Advanced Level (8+ years)", description: "Expert mentorship" }
    ];

    const steps = [
        { number: 1, title: "Personal Info", icon: FaUser },
        { number: 2, title: "Professional Details", icon: FaBriefcase },
        { number: 3, title: "Bio & Finalize", icon: FaEdit }
    ];

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        
        const application = {
            // Personal Information
            name: user?.displayName || data.name,
            email: user?.email,
            photoURL: user?.photoURL || "",
            
            // Professional Information
            category: data.category,
            categoryTitle: categories.find(cat => cat.id === data.category)?.title || data.category,
            level: data.level,
            specialization: data.specialization,
            experience: `${data.experienceYears} years`,
            bio: data.bio,
            
            // Additional Details
            rating: 0,
            students: 0,
            image: user?.photoURL || "/default-instructor.jpg",
            
            // Application Metadata
            date: new Date(),
            status: "pending",
            appliedAt: new Date()
        };

        try {
            await axiosSecure.post("/applied-instructors", application);
            
            Swal.fire({
                title: "🎉 Application Submitted!",
                text: "Your instructor application has been received and is under review.",
                icon: "success",
                confirmButtonText: "Go to Dashboard",
                confirmButtonColor: "#3B82F6",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            
            reset();
            navigate("/dashboard/myDashboard");
        } catch (error) {
            console.error("Error submitting application:", error);
            Swal.fire({
                title: "❌ Submission Failed",
                text: "There was an issue submitting your application. Please try again.",
                icon: "error",
                confirmButtonText: "Try Again"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const bioLength = watch('bio')?.length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button 
                        onClick={() => navigate('/dashboard/myDashboard')}
                        className="btn btn-ghost btn-sm mb-4 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        Become an Instructor
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Join our community of expert Instructors and share your knowledge with aspiring learners worldwide.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-8">
                        {steps.map((step, index) => {
                            const StepIcon = step.icon;
                            const isCompleted = currentStep > step.number;
                            const isActive = currentStep === step.number;
                            
                            return (
                                <div key={step.number} className="flex items-center flex-1">
                                    <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                            isCompleted 
                                                ? 'bg-green-500 border-green-500 text-white' 
                                                : isActive 
                                                ? 'bg-blue-500 border-blue-500 text-white shadow-lg scale-110' 
                                                : 'bg-white border-gray-300 text-gray-400'
                                        }`}>
                                            {isCompleted ? (
                                                <FaCheckCircle className="text-lg" />
                                            ) : (
                                                <StepIcon className="text-lg" />
                                            )}
                                        </div>
                                        <span className={`text-sm font-medium mt-2 transition-colors ${
                                            isActive || isCompleted ? 'text-blue-600' : 'text-gray-400'
                                        }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-1 mx-4 transition-colors ${
                                            currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                                        }`}></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                        
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center mb-6">
                                    <FaUser className="text-4xl text-blue-500 mx-auto mb-3" />
                                    <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                                    <p className="text-gray-600">Let's start with your basic details</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold flex items-center gap-2">
                                                <FaUser className="text-blue-500" />
                                                Full Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={user?.displayName}
                                            {...register("name")}
                                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold flex items-center gap-2">
                                                <FaEnvelope className="text-blue-500" />
                                                Email Address
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue={user?.email}
                                            {...register("email")}
                                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button 
                                        type="button" 
                                        onClick={nextStep}
                                        className="btn btn-primary px-8"
                                    >
                                        Next <FaChartLine className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Professional Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center mb-6">
                                    <FaBriefcase className="text-4xl text-blue-500 mx-auto mb-3" />
                                    <h2 className="text-2xl font-bold text-gray-800">Professional Details</h2>
                                    <p className="text-gray-600">Tell us about your expertise and experience</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold flex items-center gap-2">
                                                <FaGraduationCap className="text-blue-500" />
                                                Teaching Category *
                                            </span>
                                        </label>
                                        <select
                                            {...register("category", { required: "Please select a category" })}
                                            className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Choose your category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.icon} {cat.title}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <span className="text-error text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.category.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold flex items-center gap-2">
                                                <FaChartLine className="text-blue-500" />
                                                Experience Level *
                                            </span>
                                        </label>
                                        <select
                                            {...register("level", { required: "Please select your experience level" })}
                                            className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select your level</option>
                                            {experienceLevels.map(level => (
                                                <option key={level.value} value={level.value}>
                                                    {level.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.level && (
                                            <span className="text-error text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.level.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Specialization/Area of Expertise *</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Cardiovascular Surgery, Machine Learning, UI/UX Design"
                                        {...register("specialization", { required: "Specialization is required" })}
                                        className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {errors.specialization && (
                                        <span className="text-error text-sm mt-2 flex items-center gap-1">
                                            ⚠️ {errors.specialization.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Years of Professional Experience *</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 5"
                                        {...register("experienceYears", { 
                                            required: "Experience is required",
                                            min: { value: 1, message: "Minimum 1 year experience required" },
                                            max: { value: 50, message: "Please enter valid experience years" }
                                        })}
                                        className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {errors.experienceYears && (
                                        <span className="text-error text-sm mt-2 flex items-center gap-1">
                                            ⚠️ {errors.experienceYears.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button 
                                        type="button" 
                                        onClick={prevStep}
                                        className="btn btn-outline px-6"
                                    >
                                        <FaArrowLeft className="mr-2" /> Back
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={nextStep}
                                        className="btn btn-primary px-8"
                                    >
                                        Next <FaChartLine className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Bio & Finalize */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center mb-6">
                                    <FaEdit className="text-4xl text-blue-500 mx-auto mb-3" />
                                    <h2 className="text-2xl font-bold text-gray-800">Professional Bio</h2>
                                    <p className="text-gray-600">Introduce yourself to potential students</p>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Bio/Introduction *</span>
                                        <span className="label-text-alt">{bioLength}/500 characters</span>
                                    </label>
                                    <textarea
                                        placeholder="Tell us about your teaching philosophy, professional background, achievements, and why you want to become an instructor. This will be visible to students..."
                                        {...register("bio", { 
                                            required: "Bio is required",
                                            minLength: {
                                                value: 100,
                                                message: "Bio should be at least 100 characters long"
                                            },
                                            maxLength: {
                                                value: 500,
                                                message: "Bio should not exceed 500 characters"
                                            }
                                        })}
                                        className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                    ></textarea>
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.bio ? (
                                            <span className="text-error text-sm flex items-center gap-1">
                                                ⚠️ {errors.bio.message}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 text-sm">
                                                Minimum 100 characters required
                                            </span>
                                        )}
                                        <div className={`text-xs font-medium ${
                                            bioLength > 400 ? 'text-orange-500' : 
                                            bioLength >= 100 ? 'text-green-500' : 'text-gray-400'
                                        }`}>
                                            {bioLength >= 100 ? '✓ Good length' : 'More details needed'}
                                        </div>
                                    </div>
                                </div>

                                {/* Application Preview */}
                                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                        <FaCheckCircle /> Application Preview
                                    </h3>
                                    <div className="text-sm text-blue-700 space-y-1">
                                        <p><strong>Category:</strong> {categories.find(cat => cat.id === watch('category'))?.title || 'Not selected'}</p>
                                        <p><strong>Level:</strong> {experienceLevels.find(lvl => lvl.value === watch('level'))?.label || 'Not selected'}</p>
                                        <p><strong>Specialization:</strong> {watch('specialization') || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-6">
                                    <button 
                                        type="button" 
                                        onClick={prevStep}
                                        className="btn btn-outline px-6"
                                    >
                                        <FaArrowLeft className="mr-2" /> Back
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="btn btn-success px-8"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Application <FaCheckCircle className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer Info */}
                <div className="text-center mt-8 text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaClock className="text-blue-500" />
                        <span className="text-sm">Application review typically takes 2-3 business days</span>
                    </div>
                    <p className="text-xs">By submitting this application, you agree to our instructor terms and conditions</p>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ApplyInstructor;