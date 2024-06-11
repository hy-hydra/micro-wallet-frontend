import { Grid } from '@mui/material';
import TextField from '../Inputs/TextField';
import { useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import useAuth from 'src/hooks/useAuth';
import { useEffect } from 'react';

const defaultValues = {
    username: '',
    email: '',
    name: '',
    birthday: '',
    postalCode: '',
    city: '',
    presentAddress: '',
    country: ''
};

export default function PersonalSetting() {
    const { user } = useAuth();
    const { control, reset } = useForm({
        mode: 'onSubmit',
        defaultValues
    });

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                email: user.email,
                name: `${user.first_name} ${user.last_name}`,
                birthday: user.birth_date,
                postalCode: user.postal_code,
                city: user.city,
                presentAddress: user.present_address
            });
        }
    }, [user]);

    // const saveProfile = async (v: FieldValues) => {
    //     try {
    //         await axios({
    //             url: 'account/app_user',
    //             method: 'PUT',
    //             data: v
    //         });
    //         notify('success', 'Updated User successfully');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <Grid container>
            <Grid item xs={12} md={6} px={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField control={control} name={'username'} label={'Username'} />
                <TextField control={control} readOnly name={'email'} label={'Email'} />
                <TextField control={control} name={'name'} label={'Your Name'} />
                <TextField control={control} name={'birthday'} label={'Date of Birth'} />
            </Grid>
            <Grid item xs={12} md={6} px={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: { xs: 3, md: 0 } }}>
                <TextField control={control} name={'postalCode'} label={'Postal Code'} />
                <CountrySelect />
                <TextField control={control} name={'city'} label={'City'} />
                <TextField control={control} name={'presentAddress'} label={'Present Address'} />
            </Grid>
            {/* <Box className="w-full" sx={{ display: 'flex', justifyContent: 'right', my: 2, px: 3 }}>
                <PrimaryButton onClick={handleSubmit(saveProfile)}>Save</PrimaryButton>
            </Box> */}
        </Grid>
    );
}
