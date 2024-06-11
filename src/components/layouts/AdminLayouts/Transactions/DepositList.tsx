import { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import { useNotify } from 'src/hooks/useNotify';
import { useQuery } from 'react-query';
import { queryKeyList } from 'src/config';
import axios from 'src/utils/axios';
import DateSelect from 'src/components/molecules/Inputs/DateSelect';
import { format } from 'date-fns';
import CsvDownloadButton from 'src/components/molecules/Buttons/CsvDownloadButton';
import { timeFormat } from 'src/utils/time';

export default function DepositList() {
    const notify = useNotify();
    const [targetFromDate, setTargetFromDate] = useState<Date>(new Date());
    const [targetToDate, setTargetToDate] = useState<Date>(new Date());

    const { data, refetch } = useQuery(queryKeyList.depositTx, async () => {
        try {
            const { data: resp } = await axios({
                url: 'transaction/deposit_tx',
                method: 'GET',
                params: {
                    from: format(targetFromDate, 'yyyy-MM-dd'),
                    to: format(targetToDate, 'yyyy-MM-dd')
                }
            });

            notify('success', resp.message);
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });
    useEffect(() => {
        refetch();
    }, [targetFromDate, targetToDate]);

    const csvData = useMemo(() => {
        if (data) {
            return data.map((item: any) => {
                return {
                    user_id: item.user.id,
                    user_email: item.user.email,
                    token: item.token.name,
                    token_contract: item.token.contract,
                    amount: item.amount,
                    time: timeFormat(item.timestamp)
                };
            });
        }
        return [];
    }, [data]);

    return (
        <Grid>
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
                        field: 'amount',
                        headerName: 'Amount',
                        flex: 0.1
                    },
                    {
                        field: 'timestamp',
                        headerName: 'Time',
                        flex: 0.1,
                        renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                    }
                ]}
                listData={data}
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
