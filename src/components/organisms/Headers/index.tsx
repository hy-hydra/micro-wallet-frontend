import { Box } from '@mui/material';
import ProfileSection from './ProfileSection';
import LogoSection from './LogoSection';

export default function Header() {
    return (
        <Box className={'app-header'}>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', mx: 3, pointerEvents: 'none' }}>
                <LogoSection />
            </Box>

            {/* header search */}
            <Box sx={{ flexGrow: 1 }} />

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{/* <LocalizationSection /> */}</Box>

            {/* notification & profile */}
            {/* <NotificationSection /> */}
            <ProfileSection />
        </Box>
    );
}
