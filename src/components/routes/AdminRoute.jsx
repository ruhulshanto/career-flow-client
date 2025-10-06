
import useAuth from "../hook/useAuth";
import useAdmin from "../hook/useAdmin";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();

  if (loading || adminLoading) {
    return <p>Loading...</p>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
