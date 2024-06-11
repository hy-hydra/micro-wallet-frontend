import { lazy } from 'react';
import Loadable from 'src/components/atoms/Loadable';
import AdminLayout from 'src/components/organisms/adminLayout';
import AdminGuard from 'src/utils/route-guard/AdminGuard';

const AdminDashboard = Loadable(lazy(() => import('src/views/admin/dashboard')));
const ManageReferrals = Loadable(lazy(() => import('src/views/admin/manageReferrals')));
const ManageTokens = Loadable(lazy(() => import('src/views/admin/manageTokens')));
const ManageTransactions = Loadable(lazy(() => import('src/views/admin/manageTransactions')));
const ManageUsers = Loadable(lazy(() => import('src/views/admin/manageUsers')));
const UserDetail = Loadable(lazy(() => import('src/views/admin/manageUsers/userDetail')));
const Payouts = Loadable(lazy(() => import('src/views/admin/payouts')));
const AutoCollection = Loadable(lazy(() => import('src/views/admin/autoCollection')));
const AdminSettings = Loadable(lazy(() => import('src/views/admin/settings')));

const AdminRoutes = {
    path: '/',
    element: (
        <AdminGuard>
            <AdminLayout />
        </AdminGuard>
    ),
    children: [
        {
            path: '/dashboard',
            element: <AdminDashboard />,
            index: true
        },
        {
            path: '/manageReferrals',
            element: <ManageReferrals />
        },
        {
            path: '/payouts',
            element: <Payouts />
        },
        {
            path: '/manageTokens',
            element: <ManageTokens />
        },
        {
            path: '/manageTransactions',
            element: <ManageTransactions />
        },
        {
            path: '/manageUsers',
            element: <ManageUsers />
        },
        {
            path: '/manageUsers/:userId',
            element: <UserDetail />
        },
        {
            path: '/autoCollection',
            element: <AutoCollection />
        },
        {
            path: '/admin-settings',
            element: <AdminSettings />
        }
    ]
};

export default AdminRoutes;
