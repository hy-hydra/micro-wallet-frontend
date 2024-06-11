import { FC, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'src/utils/axios';
import QRCode from 'qrcode';
import Dialog from 'src/components/atoms/Dialog';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import { Grid, Typography, Box } from '@mui/material';
import TextField from '../../Inputs/TextField';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import { useNotify } from 'src/hooks/useNotify';

type TwoFactorAuthProps = {
    open: boolean;
    otpauth_url: string;
    base32: string;
    user_id: number;
    closeModal: () => void;
};

const twoFactorAuthSchema = yup.object({
    token: yup.string().required('Token is required')
});

const TwoFactorAuthModal: FC<TwoFactorAuthProps> = ({ open, otpauth_url, base32, user_id, closeModal }) => {
    const notify = useNotify();
    const [qrcodeUrl, setqrCodeUrl] = useState('');

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(twoFactorAuthSchema)
    });

    const verifyOtp = async (token: string) => {
        try {
            const {
                data: { user }
            } = await axios({
                method: 'POST',
                url: 'account/otp/verify',
                data: { token, user_id }
            });

            closeModal();
            notify('success', 'Two-Factor Auth Enabled Successfully');
        } catch (err: any) {
            notify('error', err.response.data.message);
        }
    };

    const onSubmitHandler = (v: FieldValues) => {
        verifyOtp(v.token);
    };

    useEffect(() => {
        QRCode.toDataURL(otpauth_url).then(setqrCodeUrl);
    }, []);

    return (
        <Dialog
            open={open}
            onClose={closeModal}
            title={'Two Factor Authentication'}
            width="400px"
            actions={<PrimaryOutlineButton onClick={closeModal}>Cancel</PrimaryOutlineButton>}
        >
            <Grid className="flex-center" flexDirection={'column'} rowGap={2}>
                <Grid className="flex-center" flexDirection={'column'}>
                    <Typography>Scan QR Code</Typography>
                    <img src={qrcodeUrl} alt="qrcode url" />
                </Grid>
                <Typography>Or Enter Code Into Your App</Typography>
                <Typography fontSize={'12px'}>SecretKey: {base32} (Base32 encoded)</Typography>
                <Box
                    sx={{
                        width: '300px'
                    }}
                >
                    <TextField
                        className="text-center"
                        name="token"
                        size="small"
                        label="Two Factor Code"
                        control={control}
                        error={errors.token}
                    />
                </Box>
                <PrimaryButton onClick={handleSubmit(onSubmitHandler)}>Verify & Activate</PrimaryButton>
            </Grid>
        </Dialog>
    );
};

export default TwoFactorAuthModal;
