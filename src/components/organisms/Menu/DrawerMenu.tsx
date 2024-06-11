import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuItems } from './MenuCard';
import { useNavigate } from 'react-router-dom';

type Anchor = 'bottom';

export default function DrawerMenu() {
    const navigate = useNavigate();
    const [state, setState] = React.useState({ bottom: false });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <Box sx={{ width: 'auto' }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                {MenuItems.map((menu, index) => (
                    <ListItem key={menu.idx} disablePadding>
                        <ListItemButton onClick={(e) => navigate(menu.path)}>
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <Button
                    onClick={toggleDrawer('bottom', true)}
                    sx={{
                        position: 'fixed',
                        left: 0,
                        bottom: -2,
                        width: '100%',
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        zIndex: 100,
                        p: 2,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}
                >
                    Menu
                </Button>
                <SwipeableDrawer
                    anchor={'bottom'}
                    open={state.bottom}
                    onClose={toggleDrawer('bottom', false)}
                    onOpen={toggleDrawer('bottom', true)}
                >
                    {list('bottom')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
