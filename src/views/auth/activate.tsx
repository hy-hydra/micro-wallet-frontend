import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';

const ActivateAccount = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const notify = useNotify();

    useEffect(() => {
        const callActivateAPI = async () => {
            try {
                await axios({
                    url: `/account/activate/${searchParams.get('uidb64')}/${searchParams.get('token')}`,
                    method: 'GET'
                });
                notify('success', 'Successfully activated your account');
            } catch (err: any) {
                if (err.response.status === 401) {
                    notify('error', 'Failed to activate your account, please make sure if you logged in.');
                } else {
                    notify('error', 'Failed to activate your account');
                }
            } finally {
                navigate('/');
            }
        };

        callActivateAPI();
    }, [searchParams]);

    return (
        <Grid className="flex flex-center">
            <Typography>Activating your account...</Typography>
        </Grid>
    );
};

export default ActivateAccount;
