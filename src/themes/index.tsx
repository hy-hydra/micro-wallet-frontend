import React from 'react';
import { createTheme } from '@mui/material/styles';

// Create a custom theme with primary color
const theme = createTheme({
    palette: {
        primary: {
            main: '#009944'
        },
        secondary: {
            main: '#C4D700',
            light: '#E60012',
            dark: '#cf222f'
        }
    }
});

export default theme;
