import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoSection from '../Headers/LogoSection';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import TokenIcon from '@mui/icons-material/Token';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    minHeight: '56px'
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default function Sidebar() {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader
                    sx={{
                        justifyContent: open ? 'space-between' : 'center'
                    }}
                >
                    {open && (
                        <Box ml={2}>
                            <LogoSection />
                        </Box>
                    )}
                    <IconButton onClick={handleDrawer}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {MenuItems.map((menu, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            onClick={() => navigate(menu.path)}
                            sx={{
                                display: 'block',
                                background: location.pathname.includes(menu.path) ? theme.palette.primary.light : '#fff',
                                color: location.pathname.includes(menu.path) ? '#fff' : 'rgba(0, 0, 0, 0.87)'
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: location.pathname.includes(menu.path) ? '#fff' : 'rgba(0, 0, 0, 0.87)'
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
        </Box>
    );
}

const MenuItems = [
    {
        idx: 0,
        label: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />
    },
    {
        idx: 1,
        label: 'Users',
        path: '/manageUsers',
        icon: <PersonIcon />
    },
    {
        idx: 2,
        label: 'Tokens',
        path: '/manageTokens',
        icon: <TokenIcon />
    },
    {
        idx: 3,
        label: 'Transactions',
        path: '/manageTransactions',
        icon: <RecyclingIcon />
    },
    {
        idx: 4,
        label: 'Referrals',
        path: '/manageReferrals',
        icon: <ShareIcon />
    },
    {
        idx: 5,
        label: 'Payouts',
        path: '/payouts',
        icon: <AttachMoneyIcon />
    },
    {
        idx: 6,
        label: 'Auto-Collection',
        path: '/autoCollection',
        icon: <AutofpsSelectIcon />
    },
    {
        idx: 7,
        label: 'Settings',
        path: '/admin-settings',
        icon: <SettingsIcon />
    }
];
