import { Grid, Box, useTheme, Typography, useMediaQuery } from '@mui/material';
import TokenButton from 'src/components/atoms/Buttons/TokenButton';
import Panel from 'src/components/atoms/Panel';
import List from 'src/components/atoms/List';
import TokenAvatar from 'src/components/atoms/TokenAvatar';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import TextField from 'src/components/molecules/Inputs/TextField';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'src/store';
import React, { useEffect, useMemo, useState } from 'react';
import { Token } from 'src/types/crypto';
import useAuth from 'src/hooks/useAuth';
import { openSnackbar } from 'src/store/slices/snackbar';

const defaultValues = {
    depositAddress: 'xxx-xxx-xxx-xxx',
    selectedToken: 'USDT'
};

export default function DepositLayout() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    const { tokenList } = useSelector((state) => state.token);
    const [selectedToken, setSelectedToken] = useState<Token>();
    const [selectIdx, setSelectIdx] = useState(0);
    const [viewDepositAddr, setViewDespositAddr] = useState(false);

    const { control, reset, watch } = useForm({
        mode: 'onChange',
        defaultValues
    });

    const selected = watch('selectedToken');

    useEffect(() => {
        if (tokenList.length !== 0) {
            setSelectedToken(tokenList[0]);
        }
        if (user && tokenList.length > 0) {
            reset({
                depositAddress: user.deposit_addr,
                selectedToken: tokenList[0].name
            });
        }
    }, [tokenList]);

    const copyDepositAddr = () => {
        if (user) {
            navigator.clipboard.writeText(user.deposit_addr);
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Copied ${user.deposit_addr} `,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    };

    const handleTokenSelect = (idx: number) => {
        setSelectedToken(tokenList[idx]);
        setSelectIdx(idx);
    };

    const list_item = useMemo(() => {
        const list = [
            {
                text: 'Coins will be deposited after 3 network confirmations.'
            },
            {
                text: `Send only ${mdMatches ? selectedToken?.name : selected} to this deposit address. Sending coin or token other than ${
                    mdMatches ? selectedToken?.name : selected
                } to this address may result in the loss of your deposit.`
            },
            {
                text: 'Minimum deposit amount: 10.000000',
                color: '#e60012'
            }
        ];
        return list;
    }, [tokenList, selectedToken, selected, mdMatches]);

    return (
        <React.Fragment>
            {tokenList.length === 0 && (
                <Typography mt={3} sx={{ textAlign: 'center' }}>
                    There is no token in app
                </Typography>
            )}
            {tokenList && selectedToken && (
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
                            {tokenList.map((token, index) => (
                                <TokenButton
                                    key={index}
                                    token={token}
                                    noBalance
                                    onClick={() => setSelectedToken(token)}
                                    active={token === selectedToken}
                                />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Panel
                            onChange={handleTokenSelect}
                            headText={'Deposit Wallet Address'}
                            tokenList={tokenList}
                            selectValue={selectIdx}
                        >
                            <TokenAvatar token={selectedToken} />
                            <List listItems={list_item} />
                            <Box
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    height: '150px'
                                }}
                            >
                                <PrimaryButton className="w-fit" size="medium" onClick={() => setViewDespositAddr(!viewDepositAddr)}>
                                    {viewDepositAddr ? 'Hide' : 'View'} Deposit Address
                                    <RemoveRedEyeRoundedIcon sx={{ ml: 2 }} />
                                </PrimaryButton>
                                {viewDepositAddr && (
                                    <Box sx={{ '&>div>div': { paddingRight: 0 }, mt: 3 }}>
                                        <TextField
                                            name="depositAddress"
                                            label=""
                                            readOnly
                                            control={control}
                                            suffix={
                                                <PrimaryButton className="w-fit" size="medium" onClick={copyDepositAddr}>
                                                    COPY
                                                </PrimaryButton>
                                            }
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Panel>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
}
