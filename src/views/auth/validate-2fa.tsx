import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import TextField from 'src/components/molecules/Inputs/TextField';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'src/utils/axios';
import useAuth from 'src/hooks/useAuth';
import { useNotify } from 'src/hooks/useNotify';
import { setSession } from 'src/contexts/UserContext';
import TokenService from 'src/utils/tokenService';

const validate2faSchema = yup.object({
    token: yup.string().min(1, 'Authentication code is required')
});

const defaultValues = {
    token: ''
};
// TokenService instance
const tokenServiceInstance = new TokenService();

const Validate2fa = () => {
    const notify = useNotify();
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();
    notify('warning', 'Please pass two factor authentication');
    const {
        handleSubmit,
        setFocus,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(validate2faSchema)
    });

    const validate2fa = async (token: string) => {
        try {
            const resp = await axios.post<{ otp_valid: boolean; tokenObj: any }>('account/otp/validate', {
                token,
                user_id: user?.id
            });

            const { otp_valid, tokenObj } = resp.data;

            if (otp_valid && user) {
                setSession(tokenObj);
                tokenServiceInstance.setToken(tokenObj);
                updateProfile({ ...user, otp_verified: true });
                navigate('/');
            }
        } catch (error: any) {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.response.data.detail ||
                error.message ||
                error.toString();
            notify('error', resMessage);
        }
    };

    const onSubmitHandler = (v: FieldValues) => {
        validate2fa(v.token);
    };

    useEffect(() => {
        setFocus('token');
    }, [setFocus]);

    return (
        <Grid className="flex-center two-factor-form">
            <Grid className="w-full">
                <Typography className="text-center" sx={{ my: 2 }}>
                    Welcome Back
                </Typography>
                <Typography className="text-center">Verify the Authentication Code</Typography>
                <Box
                    my={2}
                    component={'form'}
                    className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
                >
                    <Typography className="text-center">Two-Factor Authentication</Typography>
                    <Typography
                        className="text-center"
                        sx={{
                            fontSize: '12px',
                            my: 3
                        }}
                    >
                        Open the two-step verification app on your mobile device to get your verification code.
                    </Typography>
                    <TextField className="auth-code" name="token" label="" control={control} error={errors.token} />
                    <Box className="action" mt={3}>
                        <PrimaryButton onClick={handleSubmit(onSubmitHandler)}>Authenticate</PrimaryButton>
                        <Link to="/login" className="text-ct-blue-600">
                            Back to basic login
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Validate2fa;
