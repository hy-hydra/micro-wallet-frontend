import { Card, Grid, Link, Stack } from '@mui/material';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from 'src/components/molecules/Inputs/TextField';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import { useState } from 'react';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import { useSearchParams } from 'react-router-dom';

const schema = yup.object({
    new_password: yup.string().required('Please enter a password').min(8, 'Password must have at least 8 characters'),
    confirm_password: yup
        .string()
        .required('Please re-type your password')
        .oneOf([yup.ref('new_password')], 'Password does not match')
});

const defaultValues = {
    new_password: '',
    confirm_password: ''
};

const ResetPassword = () => {
    const notify = useNotify();
    const [searchParams] = useSearchParams();

    const {
        control,
        reset: resetForm,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    });

    const [sendState, setSendState] = useState<boolean>(false);

    const reset = async (v: FieldValues) => {
        setSendState(true);
        resetForm({
            new_password: '',
            confirm_password: ''
        });

        await axios({
            url: `/account/reset_password/${searchParams.get('uidb64')}/${searchParams.get('token')}`,
            method: 'GET',
            params: { new_password: v.new_password }
        });

        notify('success', 'Password has been updated successfully');

        setTimeout(() => {
            setSendState(false);
        }, 30000);
    };

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'} pb={10}>
            <Card className="login-form">
                <Stack spacing={3} padding={4}>
                    <TextField control={control} name="new_password" label="New Password" type="password" error={errors.new_password} />
                    <TextField
                        control={control}
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        error={errors.confirm_password}
                    />
                    <PrimaryButton type="submit" disabled={sendState} onClick={handleSubmit(reset)}>
                        {sendState ? 'Reset email has been sent.' : 'Reset password'}
                    </PrimaryButton>
                    <Link variant="body2" href="/login">
                        Go to login.
                    </Link>
                </Stack>
            </Card>
        </Grid>
    );
};

export default ResetPassword;
