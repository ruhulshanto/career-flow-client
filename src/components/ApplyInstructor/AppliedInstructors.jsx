import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { 
    FaTrash, 
    FaTimes, 
    FaEye, 
    FaEnvelope, 
    FaCalendar, 
    FaUser, 
    FaGraduationCap, 
    FaSearch,
    FaDownload,
    FaIdCard,
    FaBriefcase,
    FaHistory,
    FaStar,
    FaClock
} from "react-icons/fa";

const AppliedInstructors = () => {
    const axiosSecure = useAxiosSecure();
    const [actionLoading, setActionLoading] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ["appliedInstructors"],
        queryFn: async () => {
            const res = await axiosSecure.get("/applied-instructors");
            return res.data;
        },
    });

    // Filter and sort applications
    const filteredApplications = applications
        .filter(app => {
            const matchesSearch = app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                app.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || app.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const dateA = new Date(a.appliedAt || a.date);
            const dateB = new Date(b.appliedAt || b.date);
            
            switch (sortBy) {
                case "newest": return dateB - dateA;
                case "oldest": return dateA - dateB;
                case "name": return (a.name || "").localeCompare(b.name || "");
                default: return dateB - dateA;
            }
        });

    const handleReject = async (id, name) => {
        setActionLoading(id);
        try {
            await axiosSecure.patch(`/applied-instructors/${id}`, { status: "rejected" });
            Swal.fire({
                title: "Application Rejected!",
                html: `<strong>${name}</strong>'s application has been rejected.`,
                icon: "success",
                confirmButtonColor: "#ef4444",
                timer: 3000,
                showConfirmButton: false
            });
            refetch();
        } catch (error) {
            console.error("Error rejecting application:", error);
            Swal.fire({
                title: "Error!",
                text: "There was an issue rejecting the application.",
                icon: "error",
                confirmButtonText: "Try Again"
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id, name) => {
        Swal.fire({
            title: "Delete Application?",
            html: `Are you sure you want to permanently delete <strong>${name}</strong>'s application?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                setActionLoading(id);
                try {
                    await axiosSecure.delete(`/applied-instructors/${id}`);
                    Swal.fire({
                        title: "Deleted!",
                        html: `<strong>${name}</strong>'s application has been permanently deleted.`,
                        icon: "success",
                        confirmButtonColor: "#ef4444",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    refetch();
                } catch (error) {
                    console.error("Error deleting application:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the application.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                } finally {
                    setActionLoading(null);
                }
            }
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { 
                class: "badge badge-warning badge-lg animate-pulse", 
                text: "Pending Review",
                icon: FaClock
            },
            approved: { 
                class: "badge badge-success badge-lg", 
                text: "Approved",
                icon: FaStar
            },
            rejected: { 
                class: "badge badge-error badge-lg", 
                text: "Rejected",
                icon: FaTimes
            }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const StatusIcon = config.icon;
        
        return (
            <span className={config.class}>
                <StatusIcon className="mr-1" />
                {config.text}
            </span>
        );
    };

    const openDetails = (application) => {
        setSelectedApplication(application);
    };

    const closeDetails = () => {
        setSelectedApplication(null);
    };


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading applications...</p>
                    <p className="text-gray-400 text-sm">Please wait while we fetch the data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Instructor Applications
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Manage and review instructor applications with ease
                            </p>
                        </div>
  
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="stat bg-white rounded-xl shadow-sm border border-blue-100">
                            <div className="stat-figure text-blue-600">
                                <FaUser className="text-3xl" />
                            </div>
                            <div className="stat-title text-gray-600">Total Applications</div>
                            <div className="stat-value text-blue-600">{applications.length}</div>
                        </div>
                        
                        <div className="stat bg-white rounded-xl shadow-sm border border-orange-100">
                            <div className="stat-figure text-orange-500">
                                <FaClock className="text-3xl" />
                            </div>
                            <div className="stat-title text-gray-600">Pending Review</div>
                            <div className="stat-value text-orange-500">
                                {applications.filter(app => app.status === "pending").length}
                            </div>
                        </div>
                        
                        <div className="stat bg-white rounded-xl shadow-sm border border-green-100">
                            <div className="stat-figure text-green-600">
                                <FaStar className="text-3xl" />
                            </div>
                            <div className="stat-title text-gray-600">Approved</div>
                            <div className="stat-value text-green-600">
                                {applications.filter(app => app.status === "approved").length}
                            </div>
                        </div>

                        <div className="stat bg-white rounded-xl shadow-sm border border-red-100">
                            <div className="stat-figure text-red-600">
                                <FaTimes className="text-3xl" />
                            </div>
                            <div className="stat-title text-gray-600">Rejected</div>
                            <div className="stat-value text-red-600">
                                {applications.filter(app => app.status === "rejected").length}
                            </div>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="flex-1 relative">
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or specialization..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input input-bordered w-full pl-10 pr-4"
                                />
                            </div>
                            
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="select select-bordered"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="select select-bordered"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="name">Sort by Name</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                {filteredApplications.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                        <div className="max-w-md mx-auto">
                            <div className="text-8xl mb-4">📋</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                {applications.length === 0 ? "No Applications Yet" : "No Matching Applications"}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {applications.length === 0 
                                    ? "When users apply to become instructors, their applications will appear here." 
                                    : "Try adjusting your search or filters to see more results."}
                            </p>
                            {searchTerm || statusFilter !== "all" ? (
                                <button 
                                    onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                                    className="btn btn-primary"
                                >
                                    Clear Filters
                                </button>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredApplications.map((app) => (
                            <div key={app._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        {/* Applicant Info */}
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="avatar">
                                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                    {app.photoURL ? (
                                                        <img
                                                            src={app.photoURL}
                                                            alt={app.name}
                                                            className="w-full h-full rounded-xl object-cover"
                                                        />
                                                    ) : (
                                                        <FaUser className="text-2xl text-blue-600" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-xl font-bold text-gray-800">{app.name}</h3>
                                                    {getStatusBadge(app.status || "pending")}
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <FaEnvelope className="text-blue-500" />
                                                        {app.email}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaBriefcase className="text-green-500" />
                                                        {app.specialization}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaHistory className="text-purple-500" />
                                                        {new Date(app.appliedAt || app.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openDetails(app)}
                                                className="btn btn-outline btn-info btn-sm gap-2"
                                                title="View Details"
                                            >
                                                <FaEye />
                                                Details
                                            </button>
                                            
                                            <button
                                                onClick={() => handleReject(app._id, app.name)}
                                                disabled={actionLoading === app._id || app.status === "rejected"}
                                                className="btn btn-outline btn-error btn-sm gap-2"
                                                title="Reject Application"
                                            >
                                                {actionLoading === app._id ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    <FaTimes />
                                                )}
                                                Reject
                                            </button>

                                            <button
                                                onClick={() => handleDelete(app._id, app.name)}
                                                disabled={actionLoading === app._id}
                                                className="btn btn-outline btn-error btn-sm gap-2"
                                                title="Delete Permanently"
                                            >
                                                {actionLoading === app._id ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    <FaTrash />
                                                )}
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Application Details Modal */}
                {selectedApplication && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Application Details</h3>
                                    <p className="text-gray-600">Complete information about the applicant</p>
                                </div>
                                <button onClick={closeDetails} className="btn btn-ghost btn-circle">
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Header Card */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                            {selectedApplication.photoURL ? (
                                                <img
                                                    src={selectedApplication.photoURL}
                                                    alt={selectedApplication.name}
                                                    className="w-full h-full rounded-xl object-cover"
                                                />
                                            ) : (
                                                <FaUser className="text-3xl text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-gray-800">{selectedApplication.name}</h4>
                                            <p className="text-gray-600 flex items-center gap-2">
                                                <FaEnvelope className="text-blue-500" />
                                                {selectedApplication.email}
                                            </p>
                                            <div className="mt-2">{getStatusBadge(selectedApplication.status || "pending")}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grid Layout for Details */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Personal Information */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-blue-600">
                                            <FaIdCard />
                                            Personal Information
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Full Name</label>
                                                <p className="text-gray-800">{selectedApplication.name}</p>
                                            </div>
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Email Address</label>
                                                <p className="text-gray-800">{selectedApplication.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Information */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-600">
                                            <FaBriefcase />
                                            Professional Details
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Category</label>
                                                <p className="text-gray-800">{selectedApplication.categoryTitle}</p>
                                            </div>
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Experience Level</label>
                                                <p className="text-gray-800">{selectedApplication.level?.replace('level', 'Level ') || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Specialization</label>
                                                <p className="text-gray-800">{selectedApplication.specialization}</p>
                                            </div>
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Experience</label>
                                                <p className="text-gray-800">{selectedApplication.experience}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Application Meta */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-purple-600">
                                            <FaCalendar />
                                            Application Timeline
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Applied On</label>
                                                <p className="text-gray-800">
                                                    {new Date(selectedApplication.appliedAt || selectedApplication.date).toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="font-medium text-gray-600 text-sm">Current Status</label>
                                                <div className="mt-1">{getStatusBadge(selectedApplication.status || "pending")}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio Section */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-5 md:col-span-2">
                                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-orange-600">
                                            <FaGraduationCap />
                                            Professional Bio
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                                            {selectedApplication.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action mt-6 pt-6 border-t">
                                <button onClick={closeDetails} className="btn btn-primary">Close Details</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppliedInstructors;