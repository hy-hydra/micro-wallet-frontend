import { Grid, Typography } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { timeFormat } from 'src/utils/time';

type Props = {
    data: any[];
};

export default function TransferHistoryList({ data }: Props) {
    return (
        <Grid>
            <ListPage
                columns={[
                    {
                        field: '_from',
                        headerName: 'From',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.username}</Typography>
                    },
                    {
                        field: '_to',
                        headerName: 'To',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.username}</Typography>
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
