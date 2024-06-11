import { Grid, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import { AntTabs, SwitchChild, SwitchContent } from 'src/components/atoms/StyledComponent';
import DepositHistoryList from './DepositHistoryList';
import WithdrawHistoryList from './WithdrawHistoryList';
import TransferHistoryList from './TransferHistoryList';
import SwapHistoryList from './SwapHistoryList';
import { useNotify } from 'src/hooks/useNotify';
import { useQuery } from 'react-query';
import { queryKeyList } from 'src/config';
import axios from 'src/utils/axios';
import Loader from 'src/components/atoms/Loader';

export default function HistoryLayout() {
    const [tabVal, setTabVal] = useState(1);
    const notify = useNotify();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabVal(newValue);
    };

    const { data, isLoading } = useQuery(queryKeyList.txHistory, async () => {
        try {
            const { data: resp } = await axios({
                url: 'transaction/tx_history',
                method: 'GET'
            });
            notify('success', resp.message);
            return resp.history;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    return (
        <Grid>
            <AntTabs value={tabVal} onChange={handleChange} aria-label="Tabs">
                <Tab label={<Typography fontSize={12}>Deposit</Typography>} value={1} />
                <Tab label={<Typography fontSize={12}>Withdraw</Typography>} value={2} />
                <Tab label={<Typography fontSize={12}>Transfer</Typography>} value={3} />
                <Tab label={<Typography fontSize={12}>Swap</Typography>} value={4} />
            </AntTabs>
            {!data || isLoading ? (
                <Loader />
            ) : (
                <SwitchContent value={tabVal}>
                    <SwitchChild index={1}>
                        <DepositHistoryList data={data.deposit} />
                    </SwitchChild>
                    <SwitchChild index={2}>
                        <WithdrawHistoryList data={data.withdraw} />
                    </SwitchChild>
                    <SwitchChild index={3}>
                        <TransferHistoryList data={data.transfer} />
                    </SwitchChild>
                    <SwitchChild index={4}>
                        <SwapHistoryList data={data.swap} />
                    </SwitchChild>
                </SwitchContent>
            )}
        </Grid>
    );
}
