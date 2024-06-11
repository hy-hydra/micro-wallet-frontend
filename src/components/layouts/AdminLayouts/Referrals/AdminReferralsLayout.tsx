import ListPage from 'src/components/organisms/List/ListPage';
import { Grid, Typography, Link, Stack } from '@mui/material';
import { useQuery } from 'react-query';
import { queryKeyList } from 'src/config';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import TextField from 'src/components/molecules/Inputs/TextField';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import MonthSelect from 'src/components/molecules/Inputs/MonthSelect';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Breadcrumbs from 'src/components/molecules/Breadcrumbs';
import { format } from 'date-fns';
import { SimpleUserType } from 'src/types/user';
import CsvDownloadButton from 'src/components/molecules/Buttons/CsvDownloadButton';
import { GridRowsProp } from '@mui/x-data-grid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import { searchDefaultValues } from '../../Referral/ReferralLayout';
import { timeFormat } from 'src/utils/time';
import { topBreadcrumb } from 'src/consts';

const defaultValues = {
    tier_0: 0,
    tier_1: 0,
    tier_2: 0,
    tier_3: 0,
    tier_4: 0,
    tier_5: 0
};

const schema = yup.object({
    tier_0: yup.number().required('This field is required'),
    tier_1: yup.number().required('This field is required'),
    tier_2: yup.number().required('This field is required'),
    tier_3: yup.number().required('This field is required'),
    tier_4: yup.number().required('This field is required'),
    tier_5: yup.number().required('This field is required')
});

export default function AdminReferralsLayout() {
    const notify = useNotify();
    const [value, setValue] = useState('1');
    const [targetYearMonth, setTargetYearMonth] = useState<Date>(new Date());
    const [breadcrumbs, setBreadcrumbs] = useState<SimpleUserType[]>([topBreadcrumb]);
    const [summaryData, setSummaryData] = useState<GridRowsProp[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [selectedUserID, setSelectedUserID] = useState<number>();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues
    });

    const {
        control: searchControl,
        getValues: getSearchValues,
        handleSubmit: searchSubmit
    } = useForm({
        mode: 'onSubmit',
        defaultValues: searchDefaultValues
    });

    const { data } = useQuery(queryKeyList.referal, async () => {
        try {
            const { data: resp } = await axios({
                url: 'account/referral_tier',
                method: 'GET'
            });
            reset(resp.tier_data);
            notify('success', resp.message);
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    const handleChangeTier = async (v: FieldValues) => {
        try {
            await axios.put('account/referral_tier', v);
            notify('success', 'Updated tier level value successfully');
        } catch (err: any) {
            console.log(err);
            notify('error', 'Something went wrong');
        }
    };

    const { data: listData, refetch } = useQuery(queryKeyList.adminReferral, async () => {
        try {
            const { data: resp } = await axios({
                url: 'account/user_refer_list_by_admin',
                method: 'GET'
            });
            notify('success', resp.message);
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    const { data: summary, refetch: refetchSummary } = useQuery(queryKeyList.adminRefSummary, async () => {
        try {
            const { data: resp } = await axios({
                url: 'account/user_refer_summary_by_admin',
                method: 'GET',
                params: {
                    target_month: format(targetYearMonth, 'yyyy-MM-01'),
                    selected_parent_id: selectedUserID
                }
            });
            const user_id_name = getSearchValues('username');
            const user_ref_code = getSearchValues('user_ref_code');
            setTotalAmount(resp.total_iqdt);
            if (user_id_name || user_ref_code) {
                setSummaryData(
                    resp.data.filter((item: any) => {
                        if (user_id_name && user_ref_code)
                            return (item.username === user_id_name || item.id == user_id_name) && item.referral_code === user_ref_code;
                        else if (user_id_name) return item.username === user_id_name || item.id == user_id_name;
                        else if (user_ref_code) return item.referral_code === user_ref_code;
                        else return true;
                    })
                );
            } else {
                setSummaryData(resp.data);
            }
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    useEffect(() => {
        refetch();
        refetchSummary();
    }, [targetYearMonth, breadcrumbs]);

    const handleBreadcrumbs = (index: number) => {
        setBreadcrumbs(breadcrumbs.slice(0, index + 1));
        setSelectedUserID(breadcrumbs.length > 1 ? breadcrumbs[index].id : undefined);
    };

    const openUserReferralList = (id: number) => {
        const selected_item = summary.find((item: any) => item.id === id);
        if (selected_item) {
            const newBreadcrumbItem: SimpleUserType = {
                id: id,
                username: selected_item.username
            };
            setSelectedUserID(id);
            const draftBreadcrumbs = breadcrumbs.length === 0 ? [topBreadcrumb, newBreadcrumbItem] : [...breadcrumbs, newBreadcrumbItem];
            setBreadcrumbs(draftBreadcrumbs);
        }
    };

    const filterSummary = async (v: FieldValues) => {
        if (v.username || v.user_ref_code) {
            try {
                const { data: resp } = await axios({
                    url: 'account/user_refer_summary',
                    method: 'PUT',
                    params: { user_id_name: v.username, user_ref_code: v.user_ref_code }
                });
                setSelectedUserID(resp.data.length ? resp.data.slice(-1)[0].id : undefined);
                setBreadcrumbs([topBreadcrumb, ...resp.data]);
            } catch (error: any) {
                if (error.response.status === 404) {
                    notify('warning', 'User is not found');
                    setSummaryData([]);
                }
            }
        } else {
            setSelectedUserID(undefined);
            setBreadcrumbs([topBreadcrumb]);
        }
    };

    const listCSVData = useMemo(() => {
        if (data) {
            return data.map((item: any) => {
                return {
                    ID: item.id,
                    Inviter: item.parent.username,
                    Invited: item.child.username,
                    'Tier level': item.tier_level,
                    'Bought amount': item.iqdt_payout,
                    'Signup date': item.created_at
                };
            });
        }
    }, [data]);

    const summaryCSVData = useMemo(() => {
        if (summary) {
            return summary.map((item: any) => {
                return {
                    ID: item.id,
                    Username: item.username,
                    'Referral code': item.referral_code,
                    Tier: item.tier,
                    'Bought amount': item.iqdt_payout,
                    'Children bought amount': item.children_iqdt_payout,
                    'Referral earnings': item.earns,
                    'Signup date': item.date
                };
            });
        }
    }, [data]);

    return (
        <Grid>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="tab-referral">
                        <Tab label="List" value="1" />
                        <Tab label="Summary" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Stack direction={'row'} gap={2}>
                        {Array.from({ length: 6 }, (x, i) => i).map((item) => (
                            <TextField
                                key={item}
                                name={`tier_${item}`}
                                label={`tier_${item}`}
                                control={control}
                                error={errors}
                                inputProps={{ className: 'text-right' }}
                                suffix={'%'}
                            />
                        ))}
                        <PrimaryButton onClick={handleSubmit(handleChangeTier)}>
                            <Typography sx={{ px: 2, fontSize: '12px' }}>Change</Typography>
                        </PrimaryButton>
                    </Stack>
                    <Box className="flex justify-end w-full" mt={2}>
                        <CsvDownloadButton csvData={listCSVData ? listCSVData : []} />
                    </Box>
                    <ListPage
                        columns={[
                            {
                                field: 'id',
                                headerName: 'ID',
                                flex: 0.05
                            },
                            {
                                field: 'parent',
                                headerName: 'Inviter',
                                flex: 0.1,
                                renderCell: (params) => params.value.username
                            },
                            {
                                field: 'child',
                                headerName: 'Invited',
                                flex: 0.1,
                                renderCell: (params) => params.value.username
                            },
                            {
                                field: 'tier_level',
                                headerName: 'Tier level',
                                flex: 0.1
                            },
                            {
                                field: 'iqdt_payout',
                                headerName: 'Bought Amount',
                                flex: 0.1,
                                valueGetter: (params) => params.row.child.iqdt_payout_amount
                            },
                            {
                                field: 'created_at',
                                headerName: 'Signup date',
                                flex: 0.1,
                                renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.row.child.created_at)}</Typography>
                            }
                        ]}
                        listData={listData}
                        gridRowId={'id'}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <Grid sx={{ ml: -4.5 }}>
                        <MonthSelect setTargetYearMonth={setTargetYearMonth} targetYearMonth={targetYearMonth} />
                    </Grid>
                    <Grid container display={'flex'} alignItems={'flex-start'} justifyContent={'right'} mt={1}>
                        <Grid container item md={7} xs={12} className="flex" alignItems={'center'} spacing={1}>
                            <Typography sx={{ mr: 3 }}>Total sales</Typography>
                            <Typography className="balance-font" style={{ fontSize: '22px' }}>
                                {totalAmount.toFixed(2)}
                                <span style={{ fontSize: 20, fontWeight: 600, marginLeft: 2 }}>USD</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Grid className="flex-center">
                                <Grid item xs={12} md={5}>
                                    <Typography>User ID / Name</Typography>
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <TextField name="username" label="" control={searchControl} />
                                </Grid>
                            </Grid>
                            <Grid className="flex-center" mt={1}>
                                <Grid item xs={12} md={5}>
                                    <Typography>Referral Code</Typography>
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <TextField name="user_ref_code" label="" control={searchControl} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="flex-end" mt={2} container columnGap={2} justifyContent={'flex-end'}>
                            <PrimaryOutlineButton variant="outlined" onClick={searchSubmit(filterSummary)}>
                                Search
                            </PrimaryOutlineButton>
                            <CsvDownloadButton csvData={summaryCSVData ? summaryCSVData : []} />
                        </Grid>
                    </Grid>
                    <Breadcrumbs
                        breadcrumbs={breadcrumbs.length === 1 ? [] : breadcrumbs.map((item) => item.username)}
                        setBreadcrumbs={handleBreadcrumbs}
                        disableIndex={breadcrumbs.length - 1}
                    />
                    <ListPage
                        columns={[
                            {
                                field: 'id',
                                headerName: 'ID',
                                flex: 0.05
                            },
                            {
                                field: 'username',
                                headerName: 'User',
                                flex: 0.1,
                                renderCell: (params) =>
                                    params.row.has_child ? (
                                        <Link onClick={() => openUserReferralList(params.row.id)} sx={{ cursor: 'pointer' }}>
                                            {params.value}
                                        </Link>
                                    ) : (
                                        params.value
                                    )
                            },
                            {
                                field: 'referral_code',
                                headerName: 'Referral Code',
                                flex: 0.1
                            },
                            {
                                field: 'tier',
                                headerName: 'Tier',
                                flex: 0.1
                            },
                            {
                                field: 'iqdt_payout',
                                headerName: 'Bought Amount',
                                flex: 0.1
                            },
                            {
                                field: 'children_iqdt_payout',
                                headerName: 'Children bought amount',
                                flex: 0.1
                            },
                            {
                                field: 'earns',
                                headerName: 'Referral earnings',
                                flex: 0.1
                            },
                            {
                                field: 'date',
                                headerName: 'Signup date',
                                flex: 0.1,
                                renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                            }
                        ]}
                        listData={summaryData}
                        gridRowId={'id'}
                    />
                </TabPanel>
            </TabContext>
        </Grid>
    );
}
