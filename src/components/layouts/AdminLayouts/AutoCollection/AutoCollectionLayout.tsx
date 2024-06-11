import { useEffect, useMemo, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { queryKeyList } from 'src/config';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import RadioButtonsGroup from 'src/components/atoms/Buttons/RadioButtonsGroup';
import { TokenAmountRadioGroupList, TokenRadioGroupList } from 'src/consts/autoCollect';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import { green } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from 'src/components/atoms/Buttons/Switch';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SetHardwareWalletDialog from 'src/components/molecules/Admin/AutoCollection/Dialog/SetHardwareWalletDialog';

export default function AutoCollectionLayout() {
    const notify = useNotify();
    const [minBalance, setMinBalance] = useState(0);
    const [tokenName, setTokenName] = useState<string>('ALL');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuto, setIsAuto] = useState<boolean>(false);
    const [hardwareAddress, setHardwareAddress] = useState<string>('');

    const [openHardwareDlg, setOpenHardwareDlg] = useState<boolean>(false);

    const { data } = useQuery(queryKeyList.payout, async () => {
        try {
            const { data: resp } = await axios({
                url: 'tokens/get_balanced_info',
                method: 'GET'
            });
            notify('success', 'Retreived payout info successfully');
            setIsAuto(resp.collect_setting.is_auto);
            setHardwareAddress(resp.collect_setting.hardware_wallet);
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    const filteredData = useMemo(() => {
        if (data) {
            const filter_data_by_name = data.filter((item: any) => (tokenName === 'ALL' ? true : item.token.name === tokenName));
            return filter_data_by_name.filter((item: any) => item.prev_balance > Number(minBalance));
        }
        return [];
    }, [minBalance, tokenName, data]);

    const collectBalances = async () => {
        setIsLoading(true);
        try {
            const res = await axios({
                url: 'transaction/auto_collect',
                method: 'POST',
                params: { min_amount: minBalance, token: tokenName }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAutoCollect = async (v: boolean) => {
        const text = isAuto ? 'Do you want to collect balances manually?' : 'Do you want to collect balances automatically?';
        if (window.confirm(text)) {
            try {
                await axios({
                    url: 'transaction/auto_collect',
                    method: 'PUT',
                    data: { is_auto: v }
                });
                setIsAuto(v);
                notify('success', 'Successfully updated collection setting');
            } catch (error) {
                console.log(error);
                notify('error', 'Something went wrong');
            }
        }
    };

    const setHardwareWallet = async (addr: string) => {
        try {
            await axios({
                url: 'transaction/auto_collect',
                method: 'GET',
                params: { hardare_addr: addr }
            });
            setHardwareAddress(addr);
            setOpenHardwareDlg(false);
            notify('success', 'Updated hardware wallet successfully');
        } catch (error: any) {
            console.log(error);
            notify('error', `Server Error ${error.response.data.message}`);
        }
    };

    return (
        <Grid>
            <Grid className="w-full flex-between">
                <Grid item xs={12} sm={6} lg={3}>
                    <RadioButtonsGroup groupLabel="Token" radioGroupList={TokenRadioGroupList} onChange={setTokenName} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <RadioButtonsGroup
                        groupLabel="Balance"
                        radioGroupList={TokenAmountRadioGroupList}
                        onChange={(v: string) => setMinBalance(Number(v))}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <PrimaryButton onClick={() => setOpenHardwareDlg(true)}>Set Hardware wallet</PrimaryButton>
                </Grid>
                <Grid item xs={12} sm={6} lg={3} sx={{ position: 'relative', display: 'flex' }}>
                    <Stack direction="row" spacing={1} alignItems="center" mr={3} className="auto-panel">
                        <AutofpsSelectIcon color={isAuto ? 'success' : 'disabled'} />
                        <FlashOffIcon color={isAuto ? 'disabled' : 'success'} />
                        <Switch onChange={handleAutoCollect} isChecked={isAuto} />
                        <FlashOnIcon color={isAuto ? 'success' : 'disabled'} />
                    </Stack>
                    <Stack direction="row" spacing={1} p={0.1}>
                        <PrimaryButton disabled={isLoading || isAuto} onClick={collectBalances}>
                            <AssistWalkerIcon sx={{ mr: 1 }} />
                            Collect
                        </PrimaryButton>
                    </Stack>
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px'
                            }}
                        />
                    )}
                </Grid>
            </Grid>
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
                        field: 'prev_balance',
                        headerName: 'Conract Balance',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{Number(params.value)?.toFixed(5)}</Typography>
                    }
                ]}
                listData={filteredData}
                gridRowId={'id'}
            />
            <SetHardwareWalletDialog
                open={openHardwareDlg}
                hardwareWallet={hardwareAddress}
                setHardwareWallet={setHardwareWallet}
                onClose={() => setOpenHardwareDlg(false)}
            />
        </Grid>
    );
}
