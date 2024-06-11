import { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import MonthSelect from 'src/components/molecules/Inputs/MonthSelect';
import { useQuery } from 'react-query';
import { queryKeyList } from 'src/config';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import { format } from 'date-fns';
import { timeFormat } from 'src/utils/time';

export default function PayoutLayout() {
    const notify = useNotify();
    const [targetYearMonth, setTargetYearMonth] = useState<Date>(new Date());

    const { data, refetch } = useQuery(queryKeyList.payout, async () => {
        try {
            const { data: resp } = await axios({
                url: 'transaction/token_payout',
                method: 'GET',
                params: { target_month: format(targetYearMonth, 'yyyy-MM-01') }
            });
            notify('success', 'Retreived payout info successfully');
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    useEffect(() => {
        refetch();
    }, [targetYearMonth]);

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
                        field: 'get_token',
                        headerName: 'Token',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.name}</Typography>
                    },
                    {
                        field: 'get_amount',
                        headerName: 'Payout Amount',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{Number(params.value)?.toFixed(5)}</Typography>
                    },
                    {
                        field: 'timestamp',
                        headerName: 'Time',
                        flex: 0.1,
                        renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                    }
                ]}
                actions={
                    <Grid>
                        <Box sx={{ width: '30%' }}>
                            <MonthSelect setTargetYearMonth={setTargetYearMonth} targetYearMonth={targetYearMonth} />
                        </Box>
                    </Grid>
                }
                listData={data}
                gridRowId={'id'}
            />
        </Grid>
    );
}
