import { Grid, Typography, useTheme } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import { timeFormat } from 'src/utils/time';

type Props = {
    data: any[];
};

export default function WithdrawHistoryList({ data }: Props) {
    const theme = useTheme();

    const statusLabelFunc = (v: number, isColor?: boolean) => {
        switch (v) {
            case 0:
                return isColor ? theme.palette.secondary.light : 'Rejected';
            case 1:
                return isColor ? theme.palette.secondary.main : 'Pending';
            case 2:
                return isColor ? theme.palette.primary.light : 'Completed';
        }
    };

    return (
        <Grid>
            <ListPage
                columns={[
                    {
                        field: 'user',
                        headerName: 'User',
                        flex: 0.2,
                        renderCell: (params) => <Link to={`/manageUsers/${params.value.id}`}>{params.value.username}</Link>
                    },
                    {
                        field: 'token',
                        headerName: 'Token',
                        flex: 0.2,
                        renderCell: (params) => <Typography>{params.value.name}</Typography>
                    },
                    {
                        field: 'amount',
                        headerName: 'Amount',
                        flex: 0.2
                    },
                    {
                        field: 'timestamp',
                        headerName: 'Time',
                        flex: 0.2,
                        renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                    },
                    {
                        field: 'status',
                        headerName: '',
                        sortable: false,
                        renderCell: (params) => (
                            <Typography
                                fontSize={'12px'}
                                sx={{
                                    color: statusLabelFunc(params.value, true)
                                }}
                            >
                                {statusLabelFunc(params.value)}
                            </Typography>
                        ),
                        flex: 0.2
                    }
                ]}
                listData={data}
                gridRowId={'id'}
            />
        </Grid>
    );
}
