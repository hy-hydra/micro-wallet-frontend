// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'src/types';
import axios from 'src/utils/axios';
import { SwapTokenProps, TransferTokenProps, WithdrawTokenProps } from 'src/types/crypto';
import { openSnackbar } from './snackbar';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['token'] = {
    error: null,
    tokenList: [],
    isLoading: true,
    userTokenList: [],
    refresh: false
};

const slice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET TOKENS
        getTokenListSuccess(state, action) {
            state.tokenList = action.payload;
        },
        // GET User Wallet TOKENS
        getUserTokenListSuccess(state, action) {
            state.userTokenList = action.payload;
        },
        updateLoadingState(state, action) {
            state.isLoading = action.payload;
        },
        refreshData(state) {
            state.refresh = !state.refresh;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTokenList() {
    return async () => {
        try {
            const response = await axios.get('/tokens/get_app_token');
            dispatch(slice.actions.getTokenListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.updateLoadingState(false));
        }
    };
}

// GET USER Token API
export function getUserTokenList() {
    return async () => {
        try {
            const response = await axios.get('/transaction/refresh_user_token');
            dispatch(slice.actions.getUserTokenListSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.updateLoadingState(false));
        }
    };
}

/**
 * Token Tranfer
 */

export function postTransferToken(v: TransferTokenProps) {
    return async () => {
        try {
            const response = await axios.post('/transaction/transfer_token', v);
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Transfered ${v.amount} token successfully `,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(slice.actions.hasError(err));
            if (err.response.status !== 500) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: err.response.data.message,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Something went wrong, try again',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
        }
    };
}

export function swapTokenApi(v: SwapTokenProps) {
    return async () => {
        try {
            await axios.post('/transaction/swap_tokens', v);
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Swaped token successfully `,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(slice.actions.hasError(err));
            if (err.response.status !== 500) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: err.response.data.message,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Something went wrong, try again',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
        }
    };
}

export function withdrawTokenApi(v: WithdrawTokenProps, mail_code: string) {
    return async () => {
        try {
            await axios({
                url: '/transaction/request_withdraw',
                method: 'POST',
                params: { mail_code: mail_code },
                data: v
            });
            dispatch(slice.actions.refreshData());
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Requested withdrawal successfully `,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(slice.actions.hasError(err));
            if (err.response.status !== 500) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: err.response.data.message,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Something went wrong, try again',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
        }
    };
}
