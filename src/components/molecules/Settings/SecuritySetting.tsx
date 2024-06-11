import { Grid, Box, Typography, Alert, AlertTitle } from '@mui/material';
import TextField from '../Inputs/TextField';
import { useForm, FieldValues } from 'react-hook-form';
import PasswordIcon from '@mui/icons-material/Password';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import useAuth from 'src/hooks/useAuth';
import { useState } from 'react';
import TwoFactorAuthModal from './Dialogs/TwoFactorAuth';
import axios from 'src/utils/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNotify } from 'src/hooks/useNotify';

const defaultValues = {
    old_password: '',
    new_password: '',
    confirm_password: ''
};

const schema = yup.object({
    old_password: yup.string().required('Please enter an old password').min(8, 'Password must have at least 8 characters'),
    new_password: yup.string().required('Please enter a password').min(8, 'Password must have at least 8 characters'),
    confirm_password: yup
        .string()
        .required('Please re-type your password')
        .oneOf([yup.ref('new_password')], 'Password does not match')
});

export default function SecuritySetting() {
    const { user, setRefetchUser } = useAuth();
    const notify = useNotify();
    const { control, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const [secret, setSecret] = useState({
        otpauth_url: '',
        base32: ''
    });
    const [loading, setLoading] = useState(false);
    const [openTwoFactorModal, setOpenTwoFactorModal] = useState(false);

    const changePassword = async (v: FieldValues) => {
        setLoading(true);
        try {
            await axios({
                url: '/account/change_password',
                method: 'PUT',
                data: v
            });
            notify('success', 'Updated password successfully');
        } catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 400) {
                console.log('here');
                notify('error', 'Old password is wrong');
            } else {
                notify('error', 'Faild to update password');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTwoFactorAuth = () => {
        if (user) {
            if (user.otp_enabled) {
                disableTwoFactorAuth(user.id);
            } else {
                generateQrCode(user.id, user.email);
            }
        }
    };

    const generateQrCode = async (user_id: number, email: string) => {
        try {
            const response = await axios.post<{
                otpauth_url: string;
                base32: string;
            }>('/account/otp/generate', { user_id, email });
            if (response.status === 200) {
                setOpenTwoFactorModal(true);
                console.log({
                    base32: response.data.base32,
                    otpauth_url: response.data.otpauth_url
                });
                setSecret({
                    base32: response.data.base32,
                    otpauth_url: response.data.otpauth_url
                });
            }
        } catch (err: any) {
            notify('error', err.response.data.message);
        }
    };

    const disableTwoFactorAuth = async (user_id: number) => {
        try {
            await axios.post('/account/otp/disable', { user_id });
            setRefetchUser(true);
            notify('warning', 'Two Factor Authentication Disabled');
        } catch (err: any) {
            notify('error', err.response.data.message);
        }
    };

    const onClose = () => {
        setOpenTwoFactorModal(false);
        setRefetchUser(true);
    };

    return (
        <Grid container py={3}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 3 }}>
                <TextField
                    control={control}
                    name="old_password"
                    label="Current Password"
                    type="password"
                    suffix={<PasswordIcon />}
                    prefix={<LockOpenIcon />}
                />
                <TextField
                    control={control}
                    name="new_password"
                    label="New Password"
                    type="password"
                    suffix={<PasswordIcon />}
                    prefix={<LockIcon />}
                />
                <TextField
                    control={control}
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    suffix={<PasswordIcon />}
                    prefix={<LockIcon />}
                />
                <PrimaryButton disabled={loading} onClick={handleSubmit(changePassword)} children={'Change Password'} />
            </Grid>
            <Grid item xs={12} md={6} px={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: { xs: 3, md: 0 } }}>
                <Alert
                    severity={user && user.is_active ? 'success' : 'warning'}
                    sx={{ width: '100%', '&>div:last-child': { width: '100%' } }}
                >
                    <AlertTitle>{user?.is_active ? user.email : 'Warning'}</AlertTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexGrow: 1
                        }}
                    >
                        <Typography sx={{ fontSize: 14 }}>
                            {user?.is_active ? 'Account already verfied' : 'Account Verification'}
                        </Typography>
                        {!user?.is_active && <PrimaryButton onClick={handleTwoFactorAuth} children={'Verify Now'} />}
                    </Box>
                </Alert>
                <Alert severity={user && user.otp_enabled ? 'success' : 'warning'}>
                    <AlertTitle>{user?.otp_enabled ? '2FA enabled' : 'Warning'}</AlertTitle>
                    <Typography sx={{ fontSize: 14 }}>
                        {user?.otp_enabled
                            ? 'You account looks secure. Please keep two factor authentication'
                            : 'Attention!Your account is not secure enough, please enable two-factor authentication:'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'right', py: 1 }}>
                        <PrimaryButton
                            onClick={handleTwoFactorAuth}
                            children={user?.otp_enabled ? 'Disable Two Factor Authentication' : 'Enable Two Factor Authentication'}
                        />
                    </Box>
                </Alert>
            </Grid>
            {openTwoFactorModal && user && (
                <TwoFactorAuthModal
                    base32={secret.base32}
                    otpauth_url={secret.otpauth_url}
                    user_id={user.id}
                    closeModal={onClose}
                    open={openTwoFactorModal}
                />
            )}
        </Grid>
    );
}
