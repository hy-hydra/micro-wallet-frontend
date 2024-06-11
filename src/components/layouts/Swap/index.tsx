import { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Panel from 'src/components/atoms/Panel';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import TextField from 'src/components/molecules/Inputs/TextField';
import { useForm, FieldValues } from 'react-hook-form';
import SelectBox from 'src/components/molecules/Inputs/SelectBox';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useDispatch, useSelector } from 'src/store';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SwapTokenProps } from 'src/types/crypto';
import { swapTokenApi } from 'src/store/slices/token';
import { useNotify } from 'src/hooks/useNotify';

const defaultValues = {
    send_token: 'IQDT',
    get_token: 'USDT',
    send_amount: 0,
    get_amount: 0
};

const schema = yup.object().shape({
    send_token: yup.string().required('Token is required'),
    get_token: yup.string().required('Token is required'),
    send_amount: yup.number().required('Please input amount'),
    get_amount: yup.number().nullable()
});

export default function SwapLayout() {
    const theme = useTheme();
    const notify = useNotify();
    const dispatch = useDispatch();
    const { tokenList, userTokenList } = useSelector((state) => state.token);
    const [isSendUSDT, setIsSendUSDT] = useState(false);
    const { control, handleSubmit, reset, watch } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const sendToken = watch('send_token');
    const getToken = watch('get_token');
    const sendAmount = watch('send_amount');
    const getAmount = watch('get_amount');

    const tokenSelectOptions = useMemo(() => {
        const options = tokenList.map((token) => {
            return {
                label: token.name,
                value: token.contract,
                icon: token.icon
            };
        });

        return options;
    }, [tokenList]);

    const availableBalance = useMemo(() => {
        const sendT = userTokenList.find((item: any) => item.contract === sendToken);
        if (sendT && sendT.name === 'USDT') {
            setIsSendUSDT(true);
        } else {
            setIsSendUSDT(false);
        }
        return sendT?.balance;
    }, [sendToken]);

    useEffect(() => {
        const sendT = tokenList.find((item) => item.contract === sendToken);
        const getT = tokenList.find((item) => item.contract === getToken);
        if (sendT && getT && sendAmount > 0) {
            reset({
                send_token: sendToken,
                get_token: getToken,
                send_amount: sendAmount,
                get_amount: Number(((sendAmount * sendT.sell_price) / getT.buy_price)?.toFixed(5))
            });
        }
    }, [sendAmount, sendToken, getToken]);

    useEffect(() => {
        if (tokenList.length > 0) {
            reset({
                send_token: tokenSelectOptions[1].value,
                get_token: tokenSelectOptions[0].value,
                send_amount: sendAmount,
                get_amount: getAmount
            });
        }
    }, [tokenList]);

    useEffect(() => {
        if (sendToken === getToken) {
            reset({
                get_token: tokenSelectOptions.filter((item) => item.value !== sendToken)[0].value,
                send_token: sendToken,
                send_amount: sendAmount,
                get_amount: getAmount
            });
        }
    }, [sendToken]);

    useEffect(() => {
        if (sendToken === getToken) {
            reset({
                send_token: tokenSelectOptions.filter((item) => item.value !== getToken)[0].value,
                get_token: getToken
            });
        }
    }, [getToken]);

    const swapToken = (v: FieldValues) => {
        if (isSendUSDT && sendAmount < 1000) {
            return notify('error', 'Minimum USDT swap amount for sending should be greater than 1000');
        }
        const sendTokenData = tokenList.find((item) => item.contract === sendToken);
        const getTokenData = tokenList.find((item) => item.contract === getToken);
        if (sendTokenData && getTokenData) {
            const data: SwapTokenProps = {
                send_token_id: sendTokenData.id,
                get_token_id: getTokenData.id,
                send_amount: sendAmount
            };

            dispatch(swapTokenApi(data));
            reset(defaultValues);
        }
    };

    return (
        <Grid
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Grid
                container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '600px',
                    mt: 6
                }}
            >
                <Panel onChange={() => {}} tokenList={[]} height="550px" headText={'Swap Tokens'}>
                    <Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Grid
                            p={2}
                            width={'100%'}
                            gap={2}
                            sx={{
                                '&>div>div': {
                                    paddingRight: 0
                                },
                                p: { xs: 0.5, md: 2 }
                            }}
                        >
                            <Typography sx={{ mt: 2, mb: 1 }}>You send:</Typography>
                            <TextField
                                name="send_amount"
                                label="Amount"
                                size="medium"
                                control={control}
                                type="number"
                                suffix={
                                    <SelectBox
                                        size="medium"
                                        selectOptions={tokenSelectOptions}
                                        name="send_token"
                                        label=""
                                        control={control}
                                        className="outline-none"
                                    />
                                }
                            />
                            <Box display={'flex'} justifyContent={'space-between'} sx={{ my: 0.5, '&>p': { fontSize: '12px' } }}>
                                <Typography>Available: {availableBalance}</Typography>
                                {isSendUSDT && (
                                    <Typography sx={{ color: theme.palette.secondary.light }}>Minimum amount: 1000 USDT</Typography>
                                )}
                            </Box>
                            <Typography sx={{ mt: 2, mb: 1 }}>You get:</Typography>
                            <TextField
                                name="get_amount"
                                label="Amount"
                                size="medium"
                                type="number"
                                control={control}
                                readOnly
                                suffix={
                                    <SelectBox
                                        size="medium"
                                        selectOptions={tokenSelectOptions}
                                        name="get_token"
                                        label=""
                                        control={control}
                                        className="outline-none"
                                    />
                                }
                            />
                            <Grid sx={{ textAlign: 'center', mt: 5 }}>
                                <PrimaryButton size="large" onClick={handleSubmit(swapToken)}>
                                    <SwapHorizIcon sx={{ mr: 1, width: '25px', height: '25px' }} />
                                    Swap
                                </PrimaryButton>
                            </Grid>
                        </Grid>
                        {/* <List listItems={mock_list_item} /> */}
                    </Grid>
                </Panel>
            </Grid>
        </Grid>
    );
}
