import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    children: ReactNode;
    meta?: ReactNode;
    title: string;
}
const AdminPage = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
    <>
        <Helmet>
            <title>{`${title} | Centralized Wallet`}</title>
            {meta}
        </Helmet>

        <Box ref={ref} {...other} sx={{ pt: 10 }}>
            {children}
        </Box>
    </>
));

export default AdminPage;
