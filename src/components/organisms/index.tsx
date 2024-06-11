import { AppBar, Box, Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Headers';

export default function MainLayout() {
    return (
        <Box display={'flex'}>
            <CssBaseline />
            <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
                <Header />
            </AppBar>
            <Container className="w-100" sx={{ mb: 5, pb: 5 }}>
                <Outlet />
            </Container>
        </Box>
    );
}
