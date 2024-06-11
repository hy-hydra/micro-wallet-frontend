import { Box, Grid, Typography } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import Loader from 'src/components/atoms/Loader';
import { queryKeyList } from 'src/config';
import { useNotify } from 'src/hooks/useNotify';
import axios from 'src/utils/axios';

export default function AdminDashboardLayout() {
    const queryClient = useQueryClient();
    const notify = useNotify();
    const { data, isLoading } = useQuery(queryKeyList.appTokenBalances, async () => {
        try {
            const { data: resp } = await axios.get('transaction/app_balances');
            console.log('resp', resp);
            queryClient.setQueryData(queryKeyList.appTokenBalances, resp);
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    return (
        <Grid>
            <Typography fontSize={20}>- App Balances, IQDT Sales</Typography>
            {isLoading ? (
                <Loader />
            ) : (
                <Box display={'flex'} alignContent={'center'} justifyContent={'space-evenly'} mt={3}>
                    <Typography className="balance-box">
                        {data.usdt} <span>USDT</span>
                    </Typography>
                    <Typography className="balance-box">
                        {data.iqdt} <span>IQDT</span>
                    </Typography>
                    <Typography className="balance-box">
                        {data.iqdt_sales} <span>IQDT Sold</span>
                    </Typography>
                </Box>
            )}
        </Grid>
    );
}
