import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, ModalProps, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import Dialog from 'src/components/atoms/Dialog';
import * as yup from 'yup';
import TextField from '../Inputs/TextField';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import { UserProfile } from 'src/types/user';
import { useEffect, useState } from 'react';
import { Switch } from '../Inputs/Switch';

type Props = {
    open: ModalProps['open'];
    type: number; // 1: Create, 2: Edit,
    data: UserProfile | undefined;
    onClose: (v?: boolean) => void;
};
const commonSchema = {
    username: yup.string().min(3, 'username should be greater than length:3').required('username is required'),
    email: yup.string().email('Invalid email').required('email is required'),
    first_name: yup.string().nullable(),
    last_name: yup.string().nullable(),
    postal_code: yup.string().nullable(),
    present_address: yup.string().nullable(),
    refer_enabled: yup.boolean(),
    otp_enabled: yup.boolean()
};

const defaultFormValues = {
    username: '',
    email: '',
    parent_email: '',
    first_name: '',
    last_name: '',
    postal_code: '',
    present_address: '',
    refer_enabled: false,
    otp_enabled: false
};

export default function EditUserDialog(props: Props) {
    const { open, data, type, onClose } = props;
    const [schema, setSchema] = useState<{ [prop: string]: any }>(commonSchema);
    const notify = useNotify();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: defaultFormValues,
        resolver: yupResolver(yup.object(schema))
    });

    const otp_enabled = watch('otp_enabled');

    useEffect(() => {
        if (data && type === 2) {
            reset(data);
        } else {
            setSchema({ ...commonSchema, parent_email: yup.string().email('Invalid email').required('Parent email is required') });
            reset(defaultFormValues);
        }
    }, [open]);

    const close = () => {
        reset(defaultFormValues);
        onClose();
    };

    const saveItem = async (v: FieldValues) => {
        try {
            if (type === 1) {
                await axios.post('account/app_user', v);
                notify('success', 'Created User successfully');
            } else {
                await axios({
                    url: 'account/app_user',
                    method: 'PUT',
                    params: { user_id: data?.id },
                    data: v
                });
                notify('success', 'Updated User successfully');
            }
            onClose();
        } catch (e: any) {
            console.log(e);
            notify('error', `Something went wrong. ${e.response.data.message}`);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={close}
            title={`${type === 1 ? 'Create' : 'Edit'} new user`}
            actions={
                <Grid className="flex w-full" sx={{ width: '100%', justifyContent: 'right', gap: 2 }}>
                    <PrimaryButton onClick={handleSubmit(saveItem)}>{type === 1 ? 'Create' : 'Edit'}</PrimaryButton>
                    <PrimaryOutlineButton onClick={() => close()} className={'ml-2'}>
                        Cancel
                    </PrimaryOutlineButton>
                </Grid>
            }
        >
            <Grid container p={1}>
                <Grid item xs={12} md={6} px={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField control={control} name={'username'} label={'Username'} error={errors.username} />
                    <TextField control={control} name={'email'} label={'Email'} error={errors.email} />
                    <TextField control={control} name={'first_name'} label={'First Name'} error={errors.first_name} />
                </Grid>
                <Grid item xs={12} md={6} px={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: { xs: 3, md: 0 } }}>
                    <TextField control={control} name={'postal_code'} label={'Postal Code'} error={errors.postal_code} />
                    <TextField control={control} name={'present_address'} label={'Present Address'} error={errors.present_address} />
                    <TextField control={control} name={'last_name'} label={'Last Name'} error={errors.last_name} />
                </Grid>
                <Grid xs={12} md={6} px={3} mt={3}>
                    <Switch control={control} name="refer_enabled" label={'Refer State'} />
                    <Switch control={control} name="otp_enabled" label={'2FA State'} disabled={!otp_enabled} />
                    {!otp_enabled && (
                        <Typography fontSize={'12px'} color={'GrayText'}>
                            <span style={{ marginRight: 3, fontSize: '12px' }}>∴</span> Disable function is only possible
                        </Typography>
                    )}
                </Grid>
                <Grid xs={12} md={6} px={3} mt={3.8}>
                    <TextField
                        control={control}
                        name={'parent_email'}
                        disabled={type !== 1}
                        label={'Parent Email'}
                        error={errors.last_name}
                    />
                    <Typography fontSize={'12px'} mt={1} color={'GrayText'}>
                        <span style={{ marginRight: 3, fontSize: '14px' }}>∴</span>Initial password is 12345678
                    </Typography>
                </Grid>
            </Grid>
        </Dialog>
    );
}
