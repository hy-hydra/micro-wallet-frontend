import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'src/config';

// assets

import Logo from 'src/assets/images/app_logo/logo_text.jpg';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={'/'}>
        <img src={Logo} width={120} height={27} alt="logo" />
    </Link>
);

export default LogoSection;
