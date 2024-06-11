import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import UserDetailLayout from 'src/components/layouts/AdminLayouts/Users/UserDetailLayout';
import AdminPage from 'src/components/layouts/AdminPage';
import { queryKeyList } from 'src/config';
import { useNotify } from 'src/hooks/useNotify';
import axios from 'src/utils/axios';

export default function UserDetail() {
    const { userId } = useParams();
    const notify = useNotify();

    const { data, refetch } = useQuery(queryKeyList.userDetail, async () => {
        try {
            const { data: resp } = await axios({
                url: 'account/app_user/detail',
                method: 'GET',
                params: { user_id: userId }
            });
            console.log(resp);
            notify('success', resp.message);
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    return (
        <AdminPage title="User Detail">
            <UserDetailLayout refetch={refetch} apiResponse={data} />
        </AdminPage>
    );
}
