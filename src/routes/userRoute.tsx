import { lazy } from 'react';
import Loadable from 'src/components/atoms/Loadable';
import MainLayout from 'src/components/organisms';
import AuthGuard from 'src/utils/route-guard/AuthGuard';

const UserDashboard = Loadable(lazy(() => import('src/views/user/dashboard/index')));
const DepositLayout = Loadable(lazy(() => import('src/views/user/deposit/index')));
const Withdraw = Loadable(lazy(() => import('src/views/user/withraw/index')));
const UserTransfer = Loadable(lazy(() => import('src/views/user/transfer')));
const Swap = Loadable(lazy(() => import('src/views/user/swap')));
const UserSettings = Loadable(lazy(() => import('src/views/user/settings')));
const UserReferral = Loadable(lazy(() => import('src/views/user/referral')));
const History = Loadable(lazy(() => import('src/views/user/history/index')));

const UserRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '',
            element: <UserDashboard />,
            index: true
        },
        {
            path: '/deposit',
            element: <DepositLayout />,
            index: true
        },
        {
            path: '/withdraw',
            element: <Withdraw />
        },
        {
            path: '/transfer',
            element: <UserTransfer />
        },
        {
            path: '/swap',
            element: <Swap />
        },
        {
            path: '/history',
            element: <History />
        },
        {
            path: '/user-settings',
            element: <UserSettings />
        },
        {
            path: '/user-referral',
            element: <UserReferral />
        }
    ]
};

export default UserRoutes;
