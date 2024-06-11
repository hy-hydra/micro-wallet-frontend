import { AppBar, Box, Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Headers';
import Sidebar from './Sidebars';

export default function AdminLayout() {
    return (
        <Box display={'flex'}>
            <CssBaseline />
            <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
                <Header />
            </AppBar>
            <Sidebar />
            <Container className="w-100" sx={{ mb: 5, pb: 5, maxWidth: '1500px !important' }}>
                <Outlet />
            </Container>
        </Box>
    );
}
