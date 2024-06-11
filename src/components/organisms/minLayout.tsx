import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function MinLayout() {
    return (
        <Box display={'flex'}>
            <CssBaseline />
            <Box sx={{ width: '100%' }}>
                <Outlet />
            </Box>
        </Box>
    );
}
