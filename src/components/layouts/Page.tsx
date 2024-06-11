import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
import MenuCard from '../organisms/Menu/MenuCard';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    children: ReactNode;
    meta?: ReactNode;
    title: string;
}
const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
    <>
        <Helmet>
            <title>{`${title} | Centralized Wallet`}</title>
            {meta}
        </Helmet>

        <Box ref={ref} {...other} sx={{ pt: 10 }}>
            <MenuCard />
            {children}
        </Box>
    </>
));

export default Page;
