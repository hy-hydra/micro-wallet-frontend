import { Card, Grid, Link, Stack } from '@mui/material';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from 'src/components/molecules/Inputs/TextField';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import useAuth from 'src/hooks/useAuth';
import { useNotify } from 'src/hooks/useNotify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required.'),
    password: yup.string().min(8).required('Password is required')
});

const defaultValues = {
    email: '',
    password: ''
};

const UserLogin = () => {
    const navigate = useNavigate();
    const notify = useNotify();
    const { login, isLoggedIn } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, []);

    const userLogin = async (v: FieldValues) => {
        try {
            await login(v.email, v.password);
            notify('success', 'Login success');
        } catch (err: any) {
            console.log(err);
            notify('error', `Error ${err.response.data.message}`);
        }
    };

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'} pb={10}>
            <Card className="login-form">
                <Stack spacing={3} padding={4}>
                    <TextField control={control} name="email" label="Email" error={errors} />
                    <TextField control={control} name="password" label="Password" error={errors} type="password" />
                    <PrimaryButton type="submit" onClick={handleSubmit(userLogin)}>
                        Login
                    </PrimaryButton>
                    <Link variant="body2" href="/register">
                        Don't have an account yet?
                    </Link>
                </Stack>
            </Card>
        </Grid>
    );
};

export default UserLogin;
