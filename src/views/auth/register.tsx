import { Card, Grid, Link, Stack } from '@mui/material';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from 'src/components/molecules/Inputs/TextField';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import useAuth from 'src/hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNotify } from 'src/hooks/useNotify';
import { useEffect } from 'react';

const schema = yup.object({
    username: yup.string().min(3).required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required.'),
    password: yup.string().min(8).required('Password is required')
});

const defaultValues = {
    username: '',
    email: '',
    password: ''
};

const UserRegister = () => {
    const navigate = useNavigate();
    const notify = useNotify();
    const { register } = useAuth();
    const [searchParams] = useSearchParams();

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
        if (!searchParams.get('referral')) {
            notify('warning', 'Register is only possible by referral');
        }
    });

    const registerUser = async (v: FieldValues) => {
        const refer_code = searchParams.get('referral');
        if (!refer_code) return notify('error', 'You are only able to register by refferal code');
        try {
            await register(v.email, v.password, v.username, refer_code);
            notify('success', 'Successfully registered');
            navigate('/login');
        } catch (err: any) {
            console.log(err);
            notify('error', `Error ${err.response.data.message}`);
        }
    };

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'} pb={10}>
            <Card className="login-form">
                <Stack spacing={3} padding={4}>
                    <TextField control={control} name="username" label="Username" error={errors} />
                    <TextField control={control} name="email" label="Email" error={errors} />
                    <TextField control={control} name="password" label="Password" error={errors} type="password" />
                    <PrimaryButton type="submit" onClick={handleSubmit(registerUser)}>
                        Register
                    </PrimaryButton>
                    <Link variant="body2" href="/login">
                        Already have an account?
                    </Link>
                </Stack>
            </Card>
        </Grid>
    );
};

export default UserRegister;
