import { ThemeProvider } from '@mui/material';
import './assets/scss/style.scss';
import { UserContextProvider } from './contexts/UserContext';
import Routes from './routes';
import theme from './themes';

function App() {
    return (
        <UserContextProvider>
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </UserContextProvider>
    );
}

export default App;
