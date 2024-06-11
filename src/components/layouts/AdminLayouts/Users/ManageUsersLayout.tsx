import { useState } from 'react';
import { GridRowsProp } from '@mui/x-data-grid';
import { Box, Grid, Typography } from '@mui/material';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import ListPage from 'src/components/organisms/List/ListPage';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { UserProfile } from 'src/types/user';
import EditUserDialog from 'src/components/molecules/ManageUser/EditUserDialog';
import UserMenu from 'src/components/molecules/ManageUser/UserMenu';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import { UserMenuOption } from 'src/types/select';
import { useNavigate } from 'react-router-dom';
import { timeFormat } from 'src/utils/time';
import TextField from 'src/components/molecules/Inputs/TextField';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import { searchDefaultValues } from '../../Referral/ReferralLayout';
import { FieldValues, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeyList } from 'src/config';

export default function ManageUsersLayout() {
    const notify = useNotify();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [filterParams, setFilterParams] = useState();
    const [listData, setListData] = useState<GridRowsProp[]>([]);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [rowUser, setRowUser] = useState<UserProfile>();
    const [dialogNum, setDialogNum] = useState<number>(1);

    const { control: searchControl, handleSubmit: searchSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: searchDefaultValues
    });

    const { data: userList, refetch } = useQuery(queryKeyList.appUser, async () => {
        try {
            const { data: resp } = await axios.get('account/app_user');
            queryClient.setQueryData(queryKeyList.appUser, resp);
            notify('success', 'Get App Users successfully');
            setListData(resp.data);
            return resp.data;
        } catch (err: any) {
            console.log(err);
            notify('error', err.response.data.message);
        }
    });

    const openMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>, user: UserProfile) => {
        setAnchorEl(e.currentTarget);
        setRowUser(user);
        setMenuOpen(true);
    };

    const onClose = () => {
        setMenuOpen(false);
    };

    const handleUserActivity = async () => {
        try {
            const { data: resp } = await axios({
                url: 'account/app_user',
                method: 'DELETE',
                params: { user_id: rowUser?.id }
            });

            notify('success', `Successfully ${rowUser?.is_active ? 'deactivated' : 'activated'} user`);
            refetch();
        } catch (err: any) {
            console.log(err);
            notify('error', 'Something went wrong');
        }
    };

    const onMenuClick = (type: number) => {
        if (!rowUser) return;
        switch (type) {
            case UserMenuOption.detail:
                navigate(`${rowUser.id}`);
                break;
            case UserMenuOption.edit:
                setDialogNum(2);
                setOpen(true);
                break;
        }
        setMenuOpen(false);
    };

    const filterUser = (v: FieldValues) => {
        setListData(
            userList.filter((item: any) => {
                if (v.username && v.user_ref_code)
                    return (item.username === v.username || item.id == v.username) && item.referral_code === v.user_ref_code;
                else if (v.username) return item.username === v.username || item.id == v.username;
                else if (v.user_ref_code) return item.referral_code === v.user_ref_code;
                else return true;
            })
        );
    };

    return (
        <Grid>
            <ListPage
                filterParams={filterParams}
                setFilterParams={setFilterParams}
                filterStateKey={'contracts'}
                columns={[
                    { field: 'id', headerName: 'ID', flex: 0.1 },
                    { field: 'username', headerName: 'Username', flex: 0.1 },
                    { field: 'email', headerName: 'Email', flex: 0.1 },
                    {
                        field: 'is_active',
                        headerName: 'Status',
                        flex: 0.08,
                        renderCell: (params) => <Typography fontSize={'12px'}>{params.value ? 'Active' : 'Inactive'}</Typography>
                    },
                    {
                        field: 'created_at',
                        headerName: 'Register Date',
                        flex: 0.1,
                        renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                    },
                    {
                        field: 'updated_at',
                        headerName: 'Last login Date',
                        flex: 0.08,
                        renderCell: (params) => <Typography fontSize={'12px'}>{timeFormat(params.value)}</Typography>
                    },
                    {
                        field: 'actions',
                        headerName: '',
                        sortable: false,
                        renderCell: (params) => (
                            <Box
                                className={'cursor-pointer text-center flex justify-center w-full'}
                                onClick={(e) => openMenu(e, params.row)}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                <MoreHorizIcon />
                            </Box>
                        ),
                        width: 50
                    }
                ]}
                actions={
                    <>
                        <Grid container justifyContent={'flex-end'} className={'mt-4'}>
                            <Grid xs={8} item className="flex" gap={2}>
                                <TextField name="username" label="User ID OR Username" control={searchControl} defaultWidth />
                                <TextField name="user_ref_code" label="Referral Code" control={searchControl} defaultWidth />
                                <PrimaryOutlineButton variant="outlined" onClick={searchSubmit(filterUser)}>
                                    Search
                                </PrimaryOutlineButton>
                            </Grid>
                            <Grid xs={4} item className="flex justify-end">
                                <PrimaryButton
                                    onClick={() => {
                                        setOpen(true);
                                        setDialogNum(1);
                                    }}
                                >
                                    Create New User
                                </PrimaryButton>
                            </Grid>
                        </Grid>
                    </>
                }
                listData={listData}
                gridRowId={'id'}
            />
            {rowUser && (
                <UserMenu
                    data={rowUser}
                    open={menuOpen}
                    anchorEl={anchorEl}
                    onClick={onMenuClick}
                    onClose={onClose}
                    onDelete={handleUserActivity}
                />
            )}
            <EditUserDialog
                data={rowUser}
                type={dialogNum}
                open={open}
                onClose={() => {
                    setOpen(false);
                    refetch();
                }}
            />
        </Grid>
    );
}
