import { Link, NavLink } from "react-router";
import CareerLogo from "../Home/CareerLogo/CareerLogo";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAdmin from "../hook/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, adminLoading] = useAdmin();

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["userResults", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/results/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLogOut = () => {
    logOut().catch(err => console.log(err.message));
  };

  const getNavLinkClass = (isActive) => {
    return `btn rounded-2xl px-4 transition-all duration-100 ${isActive
        ? 'btn-primary text-white shadow-md transform scale-105'
        : 'btn-ghost text-gray-600 hover:bg-blue-50 hover:text-blue-600'
      }`;
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/50 px-4 py-3">
      <div className="navbar-start">
        <CareerLogo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          <li>
            <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/coverage" className={({ isActive }) => getNavLinkClass(isActive)}>
              Coverage
            </NavLink>
          </li>

          {user?.email && (
            <li>
              <NavLink to="/dashboard/apply-instructor" className={({ isActive }) => getNavLinkClass(isActive)}>
                Apply Advisor
              </NavLink>
            </li>
          )}

          {!adminLoading && isAdmin && (
            <li>
              <NavLink to="/admin/applicants" className={({ isActive }) => getNavLinkClass(isActive)}>
                Applied Advisor
              </NavLink>
            </li>
          )}

          {user && !isLoading && (
            results.length === 0 ? (
              <li>
                <NavLink to="/roadLayout/roadmap" className={({ isActive }) => getNavLinkClass(isActive)}>
                  Roadmap
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/dashboard/myDashboard" className={({ isActive }) => getNavLinkClass(isActive)}>
                  My Dashboard
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Right Side - User Profile or Login */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            {/* Profile Avatar Button */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online hover:bg-blue-100 transition-colors">
              <div className="w-10 rounded-full ring-2 ring-blue-200 ring-offset-2 ring-offset-blue-50">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt={user?.displayName || "User"}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-64 p-2 shadow-xl border border-blue-100">
              {/* User Info Section */}
              <li className="px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-box">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-white shadow-sm">
                      <img src={user?.photoURL || "/default-avatar.png"} alt={user?.displayName || "User"} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-gray-800">{user?.displayName || "User"}</p>
                    <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                    {isAdmin && (
                      <span className="badge badge-primary badge-xs mt-1 text-white">Admin</span>
                    )}
                  </div>
                </div>
              </li>

              {/* Quick Stats */}
              {!isLoading && results.length > 0 && (
                <li className="px-4 py-2 border-b border-blue-100 bg-blue-25">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Quizzes Taken:</span>
                    <span className="font-semibold text-blue-600">{results.length}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-600">Latest Score:</span>
                    <span className="font-semibold text-green-600">
                      {((results[results.length - 1]?.score / results[results.length - 1]?.total) * 10).toFixed(1)}/10
                    </span>
                  </div>
                </li>
              )}

              {/* Navigation Links with icons kept */}
              <li>
                <Link to="/dashboard/myDashboard" className="py-3 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm text-blue-600">📊</span>
                    </div>
                    <span>My Dashboard</span>
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/dashboard/profile" className="py-3 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm text-green-600">👤</span>
                    </div>
                    <span>Edit Profile</span>
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/dashboard/settings" className="py-3 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm text-purple-600">⚙️</span>
                    </div>
                    <span>Settings</span>
                  </span>
                </Link>
              </li>

              {isAdmin && (
                <li>
                  <Link to="/admin/dashboard" className="py-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <span className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-sm text-red-600">🛠️</span>
                      </div>
                      <span>Admin Panel</span>
                    </span>
                  </Link>
                </li>
              )}

              {/* Logout Section */}
              <li className="border-t border-blue-100 mt-2">
                <button
                  onClick={handleLogOut}
                  className="py-3 text-red-600 hover:bg-red-50 rounded-lg w-full text-left transition-colors"
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">🚪</span>
                    </div>
                    <span>Logout</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm text-gray-600 hover:bg-blue-100 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm bg-gradient-to-r from-blue-500 to-indigo-500 border-0 text-white hover:from-blue-600 hover:to-indigo-600">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-56 p-2 shadow-xl border border-blue-100">
            <li><Link to="/" className="py-2 hover:bg-blue-50 rounded-lg">Home</Link></li>
            <li><Link to="/coverage" className="py-2 hover:bg-blue-50 rounded-lg">Coverage</Link></li>
            {user?.email && <li><Link to="/dashboard/apply-instructor" className="py-2 hover:bg-blue-50 rounded-lg">Apply Advisor</Link></li>}
            {!adminLoading && isAdmin && <li><Link to="/admin/applicants" className="py-2 hover:bg-blue-50 rounded-lg">Applied Advisor</Link></li>}
            {user && !isLoading && (
              results.length === 0 ? (
                <li><Link to="/roadLayout/roadmap" className="py-2 hover:bg-blue-50 rounded-lg">Roadmap</Link></li>
              ) : (
                <li><Link to="/dashboard/myDashboard" className="py-2 hover:bg-blue-50 rounded-lg">My Dashboard</Link></li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
