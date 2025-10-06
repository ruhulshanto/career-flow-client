
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import CareerLogo from "../Home/CareerLogo/CareerLogo";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaHome,
  FaTachometerAlt,
  FaSignOutAlt,
  FaUser,
  FaChartLine,
  FaBars
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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

  // Function to render user avatar
  const renderUserAvatar = (size = 'w-12') => {
    if (user?.photoURL) {
      return (
        <div className={`avatar ${size}`}>
          <div className="rounded-full">
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="object-cover w-full h-full"
              onError={(e) => {
                // Hide the image and show fallback
                e.target.style.display = 'none';
              }}
            />
            {/* Fallback avatar - always rendered but hidden by default */}
            <div className="absolute inset-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`avatar ${size}`}>
          <div className="bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg w-full h-full">
            {user?.displayName?.charAt(0) || 'U'}
          </div>
        </div>
      );
    }
  };

  const menuItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/dashboard/myDashboard", label: "My Dashboard", icon: FaTachometerAlt },
    { path: "/dashboard/apply-instructor", label: "Apply Advisor", icon: FaUser },
    ...(results.length > 0 ? [{ path: "/roadLayout/roadmap", label: "Requiz", icon: FaChartLine }] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle drawer-button">
              <FaBars className="text-lg" />
            </label>
            <CareerLogo />
          </div>
          <div className="flex items-center gap-3">
            {renderUserAvatar('w-8 h-8')}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 shadow-sm z-40">
          {/* Logo Section */}
          <div className="flex items-center justify-center p-6 border-b border-gray-200">
            <CareerLogo />
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div>
                {
                  user?.photoURL ? <><img className="w-12 h-12 rounded-full" src={user?.photoURL} /></> : <>{renderUserAvatar('w-12 h-12')}</>
                }

              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user?.displayName || 'User'}</p>
                <p className="text-gray-500 text-sm truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <IconComponent className="text-lg flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-all duration-200"
            >
              <FaSignOutAlt className="text-lg flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        <div className="drawer lg:hidden z-50">
          <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu bg-white min-h-full w-80 p-4 border-r border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <CareerLogo />
                <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle drawer-button">
                  ✕
                </label>
              </div>

              {/* Mobile User Profile */}
              <div className="p-4 mb-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {renderUserAvatar('w-10 h-10')}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{user?.displayName || 'User'}</p>
                    <p className="text-gray-500 text-sm truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        const drawer = document.getElementById('dashboard-drawer');
                        if (drawer) drawer.checked = false;
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <IconComponent className="text-lg flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Logout */}
              <div className="mt-auto pt-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-all duration-200"
                >
                  <FaSignOutAlt className="text-lg flex-shrink-0" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="p-4 lg:p-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;