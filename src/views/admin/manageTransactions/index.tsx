import TransactionsLayout from 'src/components/layouts/AdminLayouts/Transactions/TransactionsLayout';
import AdminPage from 'src/components/layouts/AdminPage';

export default function ManageTransactions() {
    return (
        <AdminPage title="Admin | Transaction">
            <TransactionsLayout />
        </AdminPage>
    );
}
