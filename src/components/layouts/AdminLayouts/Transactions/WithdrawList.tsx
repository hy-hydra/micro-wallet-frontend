import { useEffect, useMemo, useState } from 'react';
import { GridRowsProp } from '@mui/x-data-grid';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import { useNotify } from 'src/hooks/useNotify';
import axios from 'src/utils/axios';
import { useQuery } from 'react-query';
import { queryKeyList } from 'src/config';
import DeleteButton from 'src/components/molecules/Buttons/DeleteButton';
import ApproveButton from 'src/components/molecules/Buttons/ApproveButton';
import { WithdrawListType } from 'src/types/crypto';
import DateSelect from 'src/components/molecules/Inputs/DateSelect';
import { format } from 'date-fns';
import CsvDownloadButton from 'src/components/molecules/Buttons/CsvDownloadButton';
import { timeFormat } from 'src/utils/time';

export default function WithdrawList() {
    const theme = useTheme();
    const notify = useNotify();
    const [listData, setListData] = useState<GridRowsProp[]>();
    const [targetFromDate, setTargetFromDate] = useState<Date>(new Date());
    const [targetToDate, setTargetToDate] = useState<Date>(new Date());

    const { data, refetch } = useQuery(queryKeyList.withdrawTx, async () => {
        try {
            const { data: resp } = await axios({
                url: 'transaction/withdraw_tx',
                method: 'GET',
                params: {
                    from: format(targetFromDate, 'yyyy-MM-dd'),
                    to: format(targetToDate, 'yyyy-MM-dd')
                }
            });
            setListData(resp.result);
            notify('success', resp.message);
            return resp.request;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    const csvData = useMemo(() => {
        if (listData) {
            return listData.map((item: any) => {
                return {
                    user_id: item.user.id,
                    user_email: item.user.email,
                    token: item.token.name,
                    token_contract: item.token.contract,
                    amount: item.amount,
                    status: item.status === 2 ? 'Success' : 'Failed',
                    time: timeFormat(item.timestamp)
                };
            });
        }
        return [];
    }, [listData]);

    useEffect(() => {
        refetch();
    }, [targetFromDate, targetToDate]);

    const rejectRequest = async (row: WithdrawListType) => {
        try {
            await axios({
                url: 'transaction/handle_withdrawal',
                method: 'DELETE',
                params: { request_id: row.id }
            });
            notify('success', 'Successfully rejected withdrawal');
            refetch();
        } catch (err: any) {
            console.log(err);
            notify('error', 'Something went wrong');
        }
    };

    const approveRequest = async (row: WithdrawListType) => {
        console.log('row', row);
        try {
            await axios({
                url: 'transaction/handle_withdrawal',
                method: 'PUT',
                params: { request_id: row.id }
            });
            refetch();
            notify('success', 'Successfully approved withdrawal');
        } catch (err: any) {
            console.log(err);
            notify('error', 'Insufficient fund or gas.');
        }
    };

    return (
        <Grid>
            <Typography
                sx={{
                    mt: 3,
                    color: theme.palette.primary.dark
                }}
            >
                - Withdraw Request List
            </Typography>
            <ListPage
                columns={[
                    {
                        field: 'user_id',
                        headerName: 'User ID',
                        flex: 0.05,
                        valueGetter: (params) => params.row.user.id
                    },
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
                        field: 'actions',
                        headerName: '',
                        sortable: false,
                        renderCell: (params) => (
                            <>
                                <ApproveButton onApprove={() => approveRequest(params.row)}>Approve</ApproveButton>
                                <DeleteButton
                                    message={'Are you sure to reject this token?'}
                                    text={'Reject'}
                                    onDelete={() => rejectRequest(params.row)}
                                />
                            </>
                        ),
                        flex: 0.2
                    }
                ]}
                listData={data}
                gridRowId={'id'}
            />
            <Typography
                sx={{
                    mt: 3,
                    color: theme.palette.primary.dark
                }}
            >
                - Witdraw List
            </Typography>
            <ListPage
                columns={[
                    {
                        field: 'user_id',
                        headerName: 'User ID',
                        flex: 0.05,
                        valueGetter: (params) => params.row.user.id
                    },
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
                                    color: params.value === 2 ? theme.palette.primary.light : theme.palette.secondary.light
                                }}
                            >
                                {params.value === 2 ? 'Completed' : 'Rejected'}
                            </Typography>
                        ),
                        flex: 0.2
                    }
                ]}
                listData={listData}
                gridRowId={'id'}
                actions={
                    <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box display={'flex'} alignItems={'center'} gap={2}>
                            <DateSelect setTargetDate={setTargetFromDate} targetDate={targetFromDate} label="From" />
                            <DateSelect setTargetDate={setTargetToDate} targetDate={targetToDate} label="To" />
                        </Box>
                        <CsvDownloadButton csvData={csvData} />
                    </Grid>
                }
            />
        </Grid>
    );
}
