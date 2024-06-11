import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsIcon from '@mui/icons-material/Settings';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TelegramIcon from '@mui/icons-material/Telegram';
import HistoryIcon from '@mui/icons-material/History';
import { useLocation, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerMenu from './DrawerMenu';
import { useDispatch, useSelector } from 'src/store';
import { getTokenList, getUserTokenList } from 'src/store/slices/token';

export default function MenuCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { refresh } = useSelector((state) => state.token);
    const location = useLocation();
    const pc = useMediaQuery('(min-width:900px)');

    React.useEffect(() => {
        dispatch(getTokenList());
        dispatch(getUserTokenList());
    }, [refresh]);

    return (
        <>
            {pc ? (
                <Box className="menu-card">
                    <BottomNavigation
                        showLabels
                        value={MenuItems.findIndex((item) => location.pathname === item.path)}
                        onChange={(e, val) => navigate(MenuItems[val].path)}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingInline: 20 }}
                    >
                        {MenuItems.map((menu) => (
                            <BottomNavigationAction key={menu.label} label={menu.label} icon={menu.icon} />
                        ))}
                    </BottomNavigation>
                </Box>
            ) : (
                <DrawerMenu />
            )}
        </>
    );
}

export const MenuItems = [
    {
        idx: 0,
        label: 'Dashboard',
        path: '/',
        icon: <RestoreIcon />
    },
    {
        idx: 1,
        label: 'Deposit',
        path: '/deposit',
        icon: <FileDownloadIcon />
    },
    {
        idx: 2,
        label: 'Withdraw',
        path: '/withdraw',
        icon: <FileUploadIcon />
    },
    {
        idx: 3,
        label: 'Transfer',
        path: '/transfer',
        icon: <TelegramIcon />
    },
    {
        idx: 4,
        label: 'Swap',
        path: '/swap',
        icon: <SwapHorizIcon />
    },
    {
        idx: 5,
        label: 'History',
        path: '/history',
        icon: <HistoryIcon />
    },
    {
        idx: 6,
        label: 'Settings',
        path: '/user-settings',
        icon: <SettingsIcon />
    }
];
