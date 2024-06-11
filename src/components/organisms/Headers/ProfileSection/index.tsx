import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography,
    IconButton
} from '@mui/material';

// third-party

// project imports
import MainCard from 'src/components/atoms/MainCard';

// assets
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import RuleIcon from '@mui/icons-material/Rule';
import Transitions from 'src/components/atoms/Transition';
import useAuth from 'src/hooks/useAuth';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { logout, user } = useAuth();
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef<any>(null);

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number, route: string = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Avatar
                    src={'/ddd'}
                    sx={{
                        cursor: 'pointer'
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    color="inherit"
                />
            </IconButton>

            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" alignItems="center" justifyContent={'space-between'}>
                                                    <Typography component="span" variant="h5" sx={{ fontWeight: 400 }}>
                                                        {user?.username}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="subtitle2">{user?.is_staff ? 'Project Admin' : 'User'}</Typography>
                                            </Stack>
                                            <Divider />
                                        </Box>
                                        <Box sx={{ p: 2, pt: 0 }}>
                                            <Divider />
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                {user?.is_staff && (
                                                    <ListItemButton
                                                        sx={{ borderRadius: '10px' }}
                                                        selected={selectedIndex === 1}
                                                        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                            handleListItemClick(event, 1, '/dashboard')
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <PersonIcon />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Grid container spacing={1} justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="body2">Admin Panel</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                )}
                                                <ListItemButton
                                                    sx={{ borderRadius: '10px' }}
                                                    selected={selectedIndex === 0}
                                                    onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                        handleListItemClick(event, 0, '/user-settings')
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <SettingsIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Settings</Typography>} />
                                                </ListItemButton>
                                                {user?.refer_enabled && (
                                                    <ListItemButton
                                                        sx={{ borderRadius: '10px' }}
                                                        selected={selectedIndex === 2}
                                                        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                            handleListItemClick(event, 2, '/user-referral')
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <EscalatorWarningIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">My Referral</Typography>} />
                                                    </ListItemButton>
                                                )}
                                                <ListItemButton
                                                    href="https://marcowallet.io/contact.html"
                                                    target="_blank"
                                                    sx={{ borderRadius: '10px' }}
                                                >
                                                    <ListItemIcon>
                                                        <ContactPageIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Contacts</Typography>} />
                                                </ListItemButton>
                                                <ListItemButton
                                                    target="_blank"
                                                    href="https://marcowallet.io/terms.html"
                                                    sx={{ borderRadius: '10px' }}
                                                >
                                                    <ListItemIcon>
                                                        <RuleIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Terms</Typography>} />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{ borderRadius: '10px' }}
                                                    selected={selectedIndex === 4}
                                                    onClick={logout}
                                                >
                                                    <ListItemIcon sx={{ ml: 0.4 }}>
                                                        <LogoutIcon sx={{ width: '20px', height: 'auto' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
