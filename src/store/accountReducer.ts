// action - state management
import { InitialLoginContextProps } from 'src/types/auth';
import { LOGIN, LOGOUT, REGISTER, UPDATE } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

interface AccountReducerActionProps {
    type: string;
    payload?: InitialLoginContextProps;
}

const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload!;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            const { user } = action.payload!;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        case UPDATE: {
            const { user, isLoggedIn } = action.payload!;
            return {
                ...state,
                isLoggedIn: isLoggedIn,
                user
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
