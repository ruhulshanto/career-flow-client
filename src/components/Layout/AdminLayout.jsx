import { Link, Outlet, useLocation, useNavigate } from "react-router";
import CareerLogo from "../Home/CareerLogo/CareerLogo";
import useAuth from "../hook/useAuth";
import { FaHome, FaTachometerAlt, FaUsers, FaSignOutAlt, FaUserShield } from "react-icons/fa";

const AdminLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(err => console.log(err.message));
  };

  const menuItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { path: "/admin/applicants", label: "Applicants", icon: FaUsers },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navigation Bar (mobile only) */}
        <div className="navbar bg-gradient-to-r from-blue-600 to-purple-600 text-white lg:hidden shadow-lg">
          <div className="flex-none">
            <label
              htmlFor="admin-drawer"
              className="btn btn-ghost btn-circle text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-lg">Admin Dashboard</div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  {user?.displayName?.charAt(0) || 'A'}
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><span className="text-gray-600">{user?.displayName || 'Admin'}</span></li>
                <li><span className="text-gray-500 text-sm">{user?.email}</span></li>
                <li><div className="divider my-1"></div></li>
                <li><button onClick={handleLogout} className="text-red-600"><FaSignOutAlt /> Logout</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        
        <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4 shadow-xl">
          {/* Logo Section */}
          <div className="mb-8 p-4">
            <CareerLogo />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUserShield className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{user?.displayName || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-600'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <IconComponent className={`text-lg ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                    {isActive(item.path) && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout Section */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-all"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;