import { useNavigate } from 'react-router-dom';

// project imports
import { useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';
import { GuardProps } from 'src/types';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('login', { replace: true });
        } else if (user?.otp_enabled && !user?.otp_verified) {
            navigate('login', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default AuthGuard;
