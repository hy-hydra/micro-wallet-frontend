import { Grid, Card, CardContent, Typography, Switch } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useAuth from 'src/hooks/useAuth';

const defaultValues = {
    username: '',
    referral_code: ''
};

export default function GeneralSetting() {
    const { user } = useAuth();
    const { control, reset } = useForm({
        mode: 'onSubmit',
        defaultValues
    });
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                referral_code: user.referral_code
            });
        }
    }, [user]);

    return (
        <Grid container spacing={3} my={2} px={3}>
            <Grid item xs={12} md={6}>
                <Card
                    sx={
                        {
                            // bgcolor: theme.palette.primary.light
                        }
                    }
                >
                    <CardContent>
                        {/* <FormLabel id="theme-radio">Theme setting</FormLabel>
                        <RadioGroup
                            aria-labelledby="theme-radio"
                            name="theme"
                            value={value}
                            onChange={handleRadioChange}
                            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
                        >
                            <FormControlLabel value="light" control={<Radio checked />} label="Light" />
                            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                        </RadioGroup>
                        <Divider sx={{ width: '100%', px: 5, mb: 2 }} /> */}
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1">Allow Notifications</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={notification}
                                    onChange={(e) => setNotification(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {/* <Grid item xs={12} md={6}>
                <Card
                    sx={
                        {
                            // bgcolor: theme.palette.primary.light
                        }
                    }
                >
                    <CardContent>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <Grid
                                    item
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ '&>div>div': { paddingRight: 0 } }}
                                >
                                    <FormLabel id="referral_code" sx={{ my: 1.5 }}>
                                        Get free 5 IQDT by sharing below code.{' '}
                                    </FormLabel>
                                    <TextField
                                        name="referral_code"
                                        label="Referral Code"
                                        disabled
                                        control={control}
                                        suffix={
                                            <IconButton onClick={copyReferralCode}>
                                                <ShareIcon />
                                            </IconButton>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid> */}
        </Grid>
    );
}
