import { Grid, Box, Typography } from '@mui/material';
import TokenButton from 'src/components/atoms/Buttons/TokenButton';
import Panel from 'src/components/atoms/Panel';
import List from 'src/components/atoms/List';
import TokenAvatar from 'src/components/atoms/TokenAvatar';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import TextField from 'src/components/molecules/Inputs/TextField';
import { FieldValues, useForm } from 'react-hook-form';
import ForwardIcon from '@mui/icons-material/Forward';
import { useDispatch, useSelector } from 'src/store';
import React, { useMemo, useState } from 'react';
import { Token, WithdrawTokenProps } from 'src/types/crypto';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { withdrawTokenApi } from 'src/store/slices/token';
import WithdrawConfirmDialog from 'src/components/molecules/Dialogs/WithdrawConfirmDialog';
import { useNotify } from 'src/hooks/useNotify';
import axios from 'src/utils/axios';

const defaultValues = {
    withdraw_addr: '',
    amount: 0
};

const schema = yup.object({
    withdraw_addr: yup
        .string()
        .min(40)
        .required('Withdraw address is required')
        .test('starts-with', 'Address must start with "0x"', (value) => value.startsWith('0x')),
    amount: yup.number().required('Amount is required')
});

export default function WithdrawLayout() {
    const dispatch = useDispatch();
    const notify = useNotify();
    const { userTokenList } = useSelector((state) => state.token);
    const [selectedToken, setSelectedToken] = useState<Token>();
    const [selectIdx, setSelectIdx] = useState(0);
    const [amountErr, setAmountErr] = useState(false);
    const [withdrawData, setWithdrawData] = useState<WithdrawTokenProps>();
    const [openWD, setOpenWD] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const w_amount = watch('amount');
    const w_addr = watch('withdraw_addr');

    const token_IQDT = useMemo(() => {
        return userTokenList.find((token) => token.name === 'IQDT');
    }, [userTokenList]);

    const total_amount = useMemo(() => {
        if (!selectedToken || !token_IQDT) return 0;
        const fee = selectedToken.name === 'IQDT' ? Number((15 / token_IQDT.sell_price).toFixed(2)) : 15;
        const total = Number(fee) + Number(w_amount);
        if (total > selectedToken.balance) {
            setAmountErr(true);
        } else {
            setAmountErr(false);
        }
        return total;
    }, [w_amount, selectedToken, token_IQDT]);

    const withdrawToken = (v: FieldValues) => {
        const data: WithdrawTokenProps = {
            withdraw_addr: v.withdraw_addr,
            token_id: selectedToken ? selectedToken.id : 0,
            amount: v.amount,
            direct: false
        };
        setWithdrawData(data);
        axios({
            method: 'PUT',
            url: '/transaction/request_withdraw'
        });
        setOpenWD(true);
    };

    const confirmWithdraw = (code: string) => {
        if (code.length === 6 && withdrawData) {
            dispatch(withdrawTokenApi(withdrawData, code));
            reset(defaultValues);
            onClose();
        } else {
            notify('error', 'Code is invalid');
        }
    };

    const onClose = () => {
        setOpenWD(false);
    };

    const handleTokenSelect = (idx: number) => {
        setSelectedToken(userTokenList[idx]);
        setSelectIdx(idx);
    };

    return (
        <React.Fragment>
            {userTokenList.length === 0 && (
                <Typography mt={3} sx={{ textAlign: 'center' }}>
                    You don't have any token to withdraw
                </Typography>
            )}
            {userTokenList && (
                <Grid
                    container
                    spacing={1}
                    sx={{
                        display: 'flex',
                        mt: 8
                    }}
                >
                    <Grid item md={4} sx={{ display: { md: 'block', xs: 'none' } }}>
                        <Box className="asset-list" sx={{ gap: 2 }}>
                            {userTokenList.map((token, index) => (
                                <TokenButton
                                    key={index}
                                    token={token}
                                    onClick={() => setSelectedToken(token)}
                                    active={token.name === selectedToken?.name}
                                />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Panel onChange={handleTokenSelect} tokenList={userTokenList} headText={'Withdraw Token'} selectValue={selectIdx}>
                            {selectedToken ? (
                                <>
                                    <TokenAvatar token={selectedToken} />
                                    <Grid p={2}>
                                        <Grid
                                            className="flex-align-center"
                                            container
                                            spacing={1}
                                            sx={{
                                                justifyContent: 'space-between',
                                                display: {
                                                    xs: 'block',
                                                    sm: 'flex'
                                                }
                                            }}
                                        >
                                            <Grid item sm={4} xs={12}>
                                                <Typography>Destination {selectedToken.type} address:</Typography>
                                            </Grid>
                                            <Grid item sm={8} xs={12}>
                                                <TextField
                                                    name="withdraw_addr"
                                                    label="Address"
                                                    control={control}
                                                    error={errors.withdraw_addr}
                                                    placeholder="0x-xxx-xxx-xxx-xxx"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            className="flex-align-center"
                                            container
                                            spacing={1}
                                            mt={2}
                                            sx={{ justifyContent: 'space-between' }}
                                        >
                                            <Grid item sm={4} xs={12}>
                                                <Typography>Withraw {selectedToken.name} Amount:</Typography>
                                            </Grid>
                                            <Grid item sm={8} xs={12}>
                                                <TextField type="number" name="amount" label="Amount" control={control} />
                                            </Grid>
                                        </Grid>
                                        <Grid className="flex-align-center" container spacing={1} mt={2}>
                                            <Grid item xs={4}>
                                                <Typography>Network Fee</Typography>
                                            </Grid>
                                            <Grid item xs={8} sx={{ textAlign: 'right' }}>
                                                {selectedToken.name === 'IQDT' ? (
                                                    <>
                                                        <Typography>
                                                            {token_IQDT && Number(15 / token_IQDT.sell_price).toFixed(2)}
                                                        </Typography>
                                                        <Typography fontSize={12}>
                                                            ※ This withdrawal fee token will be calculated as IQDT
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography>15 USD</Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid className="flex-align-center" container spacing={1} mt={2}>
                                            <Grid item xs={4}>
                                                <Typography>Total withdraw amount</Typography>
                                            </Grid>
                                            <Grid item xs={8} sx={{ textAlign: 'right' }}>
                                                <Typography>{total_amount}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid sx={{ textAlign: 'right', mt: 2 }}>
                                            <PrimaryButton
                                                disabled={!w_addr || !w_amount || !!errors.withdraw_addr || amountErr || !!errors.amount}
                                                size="medium"
                                                onClick={handleSubmit(withdrawToken)}
                                            >
                                                <ForwardIcon sx={{ mr: 1, width: '20px', height: '20px' }} />
                                                {amountErr ? 'Insufficent Balance' : 'Withraw'}
                                            </PrimaryButton>
                                        </Grid>
                                    </Grid>
                                    <List listItems={mock_list_item} />
                                </>
                            ) : (
                                <Typography>Please select token you want to withdraw</Typography>
                            )}
                        </Panel>
                    </Grid>
                </Grid>
            )}
            <WithdrawConfirmDialog confirmWithdraw={confirmWithdraw} open={openWD} onClose={onClose} />
        </React.Fragment>
    );
}

const mock_list_item = [
    {
        text: 'Coins will be withdrawed after admin approved request.'
    }
    // {
    //     text: 'Minimum withraw amount: 1 USDT + Fee',
    //     color: '#e60012'
    // }
];
