
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hook/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const locaion = useLocation();

    if (loading) {
        return <div className='flex items-center justify-center mt-16'>
            <progress className="progress w-56"></progress>
        </div>
    }
    if (!user) {
        return <Navigate state={{from: locaion.pathname}} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;