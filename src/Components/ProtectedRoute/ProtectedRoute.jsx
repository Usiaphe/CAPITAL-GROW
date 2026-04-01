import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';

// Protected route for regular users
export const ProtectedUserRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    return children;
};

// Protected route for admins only
export const ProtectedAdminRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (!user.isAdmin) return <Navigate to="/dashboard" replace />;

    return children;
};
