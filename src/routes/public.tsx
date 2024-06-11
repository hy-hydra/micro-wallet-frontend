import { lazy } from 'react';
import Loadable from 'src/components/atoms/Loadable';
import MinLayout from 'src/components/organisms/minLayout';
import GuestGuard from 'src/utils/route-guard/GuestGuard';

const UserLogin = Loadable(lazy(() => import('../views/auth/login')));
const UserRegister = Loadable(lazy(() => import('../views/auth/register')));
const ForgotPassword = Loadable(lazy(() => import('../views/auth/forgot-password')));
const Validate2fa = Loadable(lazy(() => import('../views/auth/validate-2fa')));
const ActivateAccount = Loadable(lazy(() => import('../views/auth/activate')));
const ResetPassword = Loadable(lazy(() => import('../views/auth/reset-password')));

const PublicRoutes = {
    path: '/',
    element: (
        <GuestGuard>
            <MinLayout />
        </GuestGuard>
    ),
    children: [
        {
            path: '/login',
            element: <UserLogin />
        },
        {
            path: '/validateOtp',
            element: <Validate2fa />
        },
        {
            path: '/register',
            element: <UserRegister />
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword />
        },
        {
            path: '/activate',
            element: <ActivateAccount />
        },
        {
            path: '/reset-password',
            element: <ResetPassword />
        }
    ]
};
export default PublicRoutes;
