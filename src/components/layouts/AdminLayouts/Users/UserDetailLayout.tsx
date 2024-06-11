import { Grid } from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import ListPage from 'src/components/organisms/List/ListPage';
import { UserDetailType, UserProfile } from 'src/types/user';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LabelWithText from 'src/components/atoms/LabelWithText';
import { timeFormat } from 'src/utils/time';

type Props = {
    apiResponse: UserDetailType;
    refetch: () => void;
};

export default function UserDetailLayout({ apiResponse, refetch }: Props) {
    const navigate = useNavigate();
    const [listData, setListData] = useState<GridRowsProp[]>([]);
    const [user, setUser] = useState<UserProfile>();

    useEffect(() => {
        if (apiResponse) {
            //@ts-ignore
            setListData(apiResponse.user_token);
            setUser({ ...apiResponse.user, rewards: apiResponse.rewards });
        }
    }, [apiResponse]);

    return (
        <Grid>
            {user && (
                <Grid container direction={'row'} className="w-full">
                    <Grid item xs={12} md={6} container direction={'column'} p={2}>
                        <LabelWithText label={'ID'}>{user.id}</LabelWithText>
                        <LabelWithText label={'Email'}>{user.email}</LabelWithText>
                        <LabelWithText label={'Username'}>{user.username}</LabelWithText>
                        <LabelWithText label={'Legal Name'}>{`${user.first_name === '' ? '-' : user.first_name} ${
                            user.last_name
                        }`}</LabelWithText>
                        <LabelWithText label={'Birthday'}>{user.birth_date}</LabelWithText>
                        <LabelWithText label={'Present Address'}>{user.present_address}</LabelWithText>
                        <LabelWithText label={'Postal Code'}>{user.postal_code}</LabelWithText>
                        <LabelWithText label={'Register Date'}>{timeFormat(user.created_at)}</LabelWithText>
                    </Grid>
                    <Grid item xs={12} md={6} container direction={'column'} p={2}>
                        <LabelWithText label={'Refer Enabled'}>{user.refer_enabled ? 'Enabled' : 'Disabled'}</LabelWithText>
                        <LabelWithText label={'Referral Code'}>{user.referral_code}</LabelWithText>
                        <LabelWithText label={'Refer Count'}>{user.refer_count}</LabelWithText>
                        <LabelWithText label={'Rewards'}>{user.rewards} IQDT</LabelWithText>
                        <LabelWithText label={'Last active Date'}>{timeFormat(user.created_at)}</LabelWithText>
                        <LabelWithText label={'Deposit Address'}>{user.deposit_addr}</LabelWithText>
                    </Grid>
                </Grid>
            )}
            <ListPage
                columns={[
                    { field: 'name', headerName: 'Token Name', flex: 0.1 },
                    { field: 'type', headerName: 'Type', flex: 0.1 },
                    {
                        field: 'decimals',
                        headerName: 'Status',
                        flex: 0.08
                    },
                    { field: 'contract', headerName: 'Contract', flex: 0.1 },
                    { field: 'balance', headerName: 'Balance', flex: 0.1 },
                    { field: 'sell_price', headerName: 'Price', flex: 0.1 }
                ]}
                actions={
                    <>
                        <Grid container justifyContent={'flex-end'} className={'mt-4'}>
                            <PrimaryOutlineButton onClick={() => navigate(-1)}>
                                <ArrowBackIosIcon sx={{ width: 'auto', height: '15px' }} />
                                Back
                            </PrimaryOutlineButton>
                        </Grid>
                    </>
                }
                listData={listData}
                gridRowId={'contract'}
            />
        </Grid>
    );
}
