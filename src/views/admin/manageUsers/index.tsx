import ManageUsersLayout from 'src/components/layouts/AdminLayouts/Users/ManageUsersLayout';
import AdminPage from 'src/components/layouts/AdminPage';

export default function ManageUsers() {
    return (
        <AdminPage title="Manage Users">
            <ManageUsersLayout />
        </AdminPage>
    );
}
