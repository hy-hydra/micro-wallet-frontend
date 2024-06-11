import { Grid, Typography } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import { timeFormat } from 'src/utils/time';

type Props = {
    data: any[];
};

export default function DepositHistoryList({ data }: Props) {
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
                        field: 'token',
                        headerName: 'Token',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.name}</Typography>
                    },
                    {
                        field: 'amount',
                        headerName: 'Amount',
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
