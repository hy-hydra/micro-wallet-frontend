import { useNavigate } from 'react-router-dom';

// project imports
import { useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';
import { GuardProps } from 'src/types';

// ==============================|| ADMIN GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AdminGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            // navigate('login', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default AdminGuard;
