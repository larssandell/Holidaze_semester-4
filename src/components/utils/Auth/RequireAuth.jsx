import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }) {
    const isAuthenticated = localStorage.getItem('token');
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return children;
}
