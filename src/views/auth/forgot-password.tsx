import { Card, Grid, Link, Stack } from '@mui/material';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from 'src/components/molecules/Inputs/TextField';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import { useState } from 'react';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required.')
});

const defaultValues = {
    email: ''
};

const ForgotPassword = () => {
    const notify = useNotify();

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
            email: ''
        });

        await axios({
            url: '/account/forgot_password',
            method: 'GET',
            params: { email: v.email }
        });

        notify('success', 'Reset password mail has been sent.');

        setTimeout(() => {
            setSendState(false);
        }, 30000);
    };

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'} pb={10}>
            <Card className="login-form">
                <Stack spacing={3} padding={4}>
                    <TextField control={control} name="email" label="Email" error={errors} />
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

export default ForgotPassword;
