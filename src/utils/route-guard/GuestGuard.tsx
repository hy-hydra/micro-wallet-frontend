import { useNavigate } from 'react-router-dom';

// project imports
import { useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';
import { GuardProps } from 'src/types';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if ((isLoggedIn && !user?.otp_enabled) || (isLoggedIn && user?.otp_enabled && user.otp_verified)) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default GuestGuard;
