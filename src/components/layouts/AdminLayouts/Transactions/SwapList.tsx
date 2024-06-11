import { Box, Grid, Typography } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { queryKeyList } from 'src/config';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import DateSelect from 'src/components/molecules/Inputs/DateSelect';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import CsvDownloadButton from 'src/components/molecules/Buttons/CsvDownloadButton';
import { timeFormat } from 'src/utils/time';

export default function SwapList() {
    const notify = useNotify();
    const [targetFromDate, setTargetFromDate] = useState<Date>(new Date());
    const [targetToDate, setTargetToDate] = useState<Date>(new Date());

    const { data, refetch } = useQuery(queryKeyList.swapTx, async () => {
        try {
            const { data: resp } = await axios({
                url: 'transaction/swap_tx',
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
                    send_token: item.send_token.name,
                    send_token_contract: item.send_token.contract,
                    send_amount: item.send_amount,
                    get_token: item.get_token.name,
                    get_token_contract: item.get_token.contract,
                    get_amount: item.get_amount,
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
                        field: 'send_token',
                        headerName: 'Sent Token',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.name}</Typography>
                    },
                    {
                        field: 'send_amount',
                        headerName: 'Sent Amount',
                        flex: 0.1
                    },
                    {
                        field: 'get_token',
                        headerName: 'Got Token',
                        flex: 0.1,
                        renderCell: (params) => <Typography>{params.value.name}</Typography>
                    },
                    {
                        field: 'get_amount',
                        headerName: 'Got Amount',
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
