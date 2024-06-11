import { Grid, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { AntTabs, SwitchChild, SwitchContent } from 'src/components/atoms/StyledComponent';
import DepositList from './DepositList';
import WithdrawList from './WithdrawList';
import TransferList from './TransferList';
import SwapList from './SwapList';

export default function TransactionsLayout() {
    const [tabVal, setTabVal] = useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabVal(newValue);
    };

    return (
        <Grid>
            <AntTabs value={tabVal} onChange={handleChange} aria-label="Tabs">
                <Tab label={<Typography fontSize={12}>Deposit</Typography>} value={1} />
                <Tab label={<Typography fontSize={12}>Withdraw</Typography>} value={2} />
                <Tab label={<Typography fontSize={12}>Transfer</Typography>} value={3} />
                <Tab label={<Typography fontSize={12}>Swap</Typography>} value={4} />
            </AntTabs>
            <SwitchContent value={tabVal}>
                <SwitchChild index={1}>
                    <DepositList />
                </SwitchChild>
                <SwitchChild index={2}>
                    <WithdrawList />
                </SwitchChild>
                <SwitchChild index={3}>
                    <TransferList />
                </SwitchChild>
                <SwitchChild index={4}>
                    <SwapList />
                </SwitchChild>
            </SwitchContent>
        </Grid>
    );
}
