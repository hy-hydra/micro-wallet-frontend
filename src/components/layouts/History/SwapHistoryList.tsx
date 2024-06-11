import { Grid, Typography } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import { timeFormat } from 'src/utils/time';

type Props = {
    data: any[];
};

export default function SwapHistoryList({ data }: Props) {
    return (
        <Grid>
            <ListPage
                columns={[
                    {
                        field: 'user',
                        headerName: 'User',
                        flex: 0.1,
                        renderCell: (params) => <Link to={`/manageUsers/${params.value.id}`}>{params.value.username}</Link>
                    },
                    {
                        field: 'send_token',
                        headerName: 'Sent Token',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.name}</Typography>
                    },
                    {
                        field: 'send_amount',
                        headerName: 'Sent Amount',
                        flex: 0.1
                    },
                    {
                        field: 'get_token',
                        headerName: 'Got Token',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.name}</Typography>
                    },
                    {
                        field: 'get_amount',
                        headerName: 'Got Amount',
                        flex: 0.1
                    },
                    {
                        field: 'timestamp',
                        headerName: 'Time',
                        flex: 0.1,
                        renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                    }
                ]}
                listData={data}
                gridRowId={'id'}
            />
        </Grid>
    );
}
