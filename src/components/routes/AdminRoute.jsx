import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useAdmin from "../hook/useAdmin";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/forbidden" replace />;
};

export default AdminRoute;