import { NavLink, Outlet, useNavigate } from 'react-router';
import CareerLogo from '../Home/CareerLogo/CareerLogo';
import {
    FaHome,
    FaTachometerAlt,
    FaUser,
    FaChartLine,
    FaUsers,
    FaUserShield,
    FaSignOutAlt,
    FaBars,
} from 'react-icons/fa';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hook/useAuth';
import useUserRole from '../hook/useUserRole';
import useAxiosSecure from '../hook/useAxiosSecure';

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const { role, roleLoading } = useUserRole();
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { data: results = [] } = useQuery({
        queryKey: ["userResults", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/results/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleLogout = () => {
        logOut()
            .then(() => navigate("/"))
            .catch(err => console.log(err.message));
    };

    // Active button class
    const navButtonClass = ({ isActive }) =>
        `flex items-center gap-3 justify-start px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform ${isActive ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-gray-700 hover:bg-gray-100 hover:scale-105'}`;

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col justify-between transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                <div className="p-5">
                    {/* Logo */}
                    <div className="mb-6 flex justify-center">
                        <CareerLogo />
                    </div>

                    {/* User Info */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                {user?.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt={user.displayName} 
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-blue-600 font-bold text-lg">
                                        {user?.displayName?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-gray-800 truncate">
                                    {user?.displayName || 'User'}
                                </p>
                                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                                {!roleLoading && role && (
                                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                                        role === 'admin' 
                                            ? 'bg-red-100 text-red-800' 
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* Common Links for all users */}
                        <NavLink to="/" end className={navButtonClass}>
                            <FaHome className="text-lg" />
                            <span>Home</span>
                        </NavLink>

                        <NavLink to="/dashboard/myDashboard" end className={navButtonClass}>
                            <FaTachometerAlt className="text-lg" />
                            <span>My Dashboard</span>
                        </NavLink>

                        <NavLink to="/dashboard/apply-instructor" className={navButtonClass}>
                            <FaUser className="text-lg" />
                            <span>Apply Instructor</span>
                        </NavLink>

                        {/* Roadmap or Requiz based on quiz history */}
                        {results.length === 0 ? (
                            <NavLink to="/roadLayout/roadmap" className={navButtonClass}>
                                <FaChartLine className="text-lg" />
                                <span>Roadmap</span>
                            </NavLink>
                        ) : (
                            <NavLink to="/roadLayout/roadmap" className={navButtonClass}>
                                <FaChartLine className="text-lg" />
                                <span>Requiz</span>
                            </NavLink>
                        )}

                        {/* Admin Links */}
                        {!roleLoading && role === 'admin' && (
                            <>
                                <div className="border-t border-gray-200 my-2 pt-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                                        Admin Panel
                                    </p>
                                    
                                    <NavLink to="/dashboard/admin/applicants" className={navButtonClass}>
                                        <FaUsers className="text-lg" />
                                        <span>Applied Instructors</span>
                                    </NavLink>

                                    <NavLink to="/dashboard/admin/adminPanel" className={navButtonClass}>
                                        <FaUserShield className="text-lg" />
                                        <span>Admin Panel</span>
                                    </NavLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Logout */}
                <div className="p-5 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-200 transform active:scale-95"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Overlay (for mobile only) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <main className="flex-1 lg:ml-64 overflow-y-auto">
                {/* Top Bar (mobile only) */}
                <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow-md mb-4">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <FaBars className="text-xl" />
                    </button>
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </div>

                {/* Page Content */}
                <div className="p-4 lg:p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;