
import { Outlet } from 'react-router';
import AuthNavbar from '../share/AuthNavbar';

const AuthLayout = () => {
    return (
        <div>
            <AuthNavbar></AuthNavbar>
            <Outlet></Outlet>            
        </div>
    );
};

export default AuthLayout;