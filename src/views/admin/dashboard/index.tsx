import AdminDashboardLayout from 'src/components/layouts/AdminLayouts/Dashboard/AdminDashboardLayout';
import AdminPage from 'src/components/layouts/AdminPage';

export default function AdminDashboard() {
    return (
        <AdminPage title="Admin Dashboard">
            <AdminDashboardLayout />
        </AdminPage>
    );
}
