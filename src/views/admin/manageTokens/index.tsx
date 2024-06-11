import { useQuery, useQueryClient } from 'react-query';
import ManageTokensLayout from 'src/components/layouts/AdminLayouts/Tokens/ManageTokensLayout';
import AdminPage from 'src/components/layouts/AdminPage';
import { queryKeyList } from 'src/config';
import { useNotify } from 'src/hooks/useNotify';
import axios from 'src/utils/axios';

export default function ManageTokens() {
    const queryClient = useQueryClient();
    const notify = useNotify();

    const { data, refetch } = useQuery(queryKeyList.appToken, async () => {
        try {
            const { data: resp } = await axios.get('tokens/get_app_token');
            queryClient.setQueryData(queryKeyList.appToken, resp);
            notify('success', 'Get App Tokens successfully');
            return resp;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    return (
        <AdminPage title="Manage Tokens">
            <ManageTokensLayout apiResponse={data} refetch={refetch} />
        </AdminPage>
    );
}
