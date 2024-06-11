import PayoutLayout from 'src/components/layouts/AdminLayouts/Payout/PayoutLayout';
import AdminPage from 'src/components/layouts/AdminPage';

export default function Payouts() {
    return (
        <AdminPage title="Manage Tokens">
            <PayoutLayout />
        </AdminPage>
    );
}
