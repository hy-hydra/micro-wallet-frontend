import ListPage from 'src/components/organisms/List/ListPage';
import { IconButton, Grid, Typography } from '@mui/material';
import TextField from 'src/components/molecules/Inputs/TextField';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import MonthSelect from 'src/components/molecules/Inputs/MonthSelect';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Breadcrumbs from 'src/components/molecules/Breadcrumbs';
import { ReactNode, useState } from 'react';
import { Control } from 'react-hook-form';
import { timeFormat } from 'src/utils/time';

type Props = {
    control: Control<any>;
    listTopEl: ReactNode;
    listData: any;
};

export default function ReferralTabContext(props: Props) {
    const { control, listTopEl, listData } = props;

    const [value, setValue] = useState('1'); // Tab value
    const [targetYearMonth, setTargetYearMonth] = useState<Date>(new Date());

    /**
     * Tab change
     * @param event click event
     * @param newValue new selected tab value
     */
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="List" value="1" />
                    <Tab label="Summary" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">
                {listTopEl}
                <ListPage
                    columns={[
                        {
                            field: 'id',
                            headerName: 'ID',
                            flex: 0.05
                        },
                        {
                            field: 'child',
                            headerName: 'Invited',
                            flex: 0.1,
                            renderCell: (params) => <Typography>{params.value.username}</Typography>
                        },
                        {
                            field: 'tier_level',
                            headerName: 'Tier Level',
                            flex: 0.1
                        },
                        {
                            field: 'created_at',
                            headerName: 'Time',
                            flex: 0.1,
                            renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                        }
                    ]}
                    listData={listData}
                    gridRowId={'id'}
                />
            </TabPanel>
            <TabPanel value="2">
                <Grid>
                    <MonthSelect setTargetYearMonth={setTargetYearMonth} targetYearMonth={targetYearMonth} />
                </Grid>
                <Grid container display={'flex'} alignItems={'flex-start'} justifyContent={'right'} mt={1}>
                    <Grid item md={7} xs={12} className="flex" alignItems={'center'} spacing={1}>
                        <Typography sx={{ mr: 3 }}>期間購入額</Typography>
                        <Typography className="balance-font" style={{ fontSize: '22px' }}>
                            0.00<span style={{ fontSize: 20, fontWeight: 600, marginLeft: 2 }}>USD</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid className="flex-center">
                            <Grid item xs={12} md={5}>
                                <Typography>User ID / Name</Typography>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <TextField name="username" label="" control={control} />
                            </Grid>
                        </Grid>
                        <Grid className="flex-center" mt={1}>
                            <Grid item xs={12} md={5}>
                                <Typography>Referral Code</Typography>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <TextField name="referral_code" label="" control={control} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="flex-end" mt={2} container columnGap={2} justifyContent={'flex-end'}>
                        <PrimaryOutlineButton variant="outlined">Search</PrimaryOutlineButton>
                        <PrimaryOutlineButton variant="outlined">Download</PrimaryOutlineButton>
                    </Grid>
                </Grid>
                <Breadcrumbs breadcrumbs={['top', 'xxx']} setBreadcrumbs={() => {}} />
                <ListPage
                    columns={[
                        {
                            field: 'child',
                            headerName: 'Invited',
                            flex: 0.1,
                            renderCell: (params) => <Typography>{params.value.username}</Typography>
                        },
                        {
                            field: 'tier_level',
                            headerName: 'Tier Level',
                            flex: 0.1
                        },
                        {
                            field: 'created_at',
                            headerName: 'Time',
                            flex: 0.1,
                            renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                        }
                    ]}
                    listData={listData}
                    gridRowId={'id'}
                />
            </TabPanel>
        </TabContext>
    );
}
