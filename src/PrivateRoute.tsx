import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const signinInfo = localStorage.getItem('signinInfo');
    const isAuthenticated = signinInfo && JSON.parse(signinInfo)?.token;

    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
