import React, { createContext, useEffect, useReducer, useState } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import accountReducer from 'src/store/accountReducer';
import { LOGIN, LOGOUT, UPDATE } from 'src/store/actions';

// project imports
import axios from 'src/utils/axios';

import Loader from 'src/components/atoms/Loader';
import { InitialLoginContextProps, UserContextType } from 'src/types/auth';

// types
import { KeyedObject } from 'src/types';
import TokenService from 'src/utils/tokenService';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from 'src/types/user';

// TokenService instance
const tokenServiceInstance = new TokenService();

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

export const setSession = (accessToken?: string | null) => {
    if (accessToken) {
        localStorage.setItem(tokenServiceInstance.accessTokenKey, accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem(tokenServiceInstance.accessTokenKey);
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| UserContext CONTEXT & PROVIDER ||============================== //
const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: { children: React.ReactElement }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const [refetchUser, setRefetchUser] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = window.localStorage.getItem(tokenServiceInstance.accessTokenKey);
                if (accessToken && verifyToken(accessToken)) {
                    setSession(accessToken);
                    const response = await axios.get('/account/me');
                    const user = response.data.data;
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else if (!state.isLoggedIn) {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, [navigate, refetchUser]);

    const login = async (email: string, password: string) => {
        const response = await axios.post('/account/login', { email, password });
        const { tokenObj, user } = response.data;
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
        if (!user.otp_enabled) {
            setSession(tokenObj.access);
            tokenServiceInstance.setToken(tokenObj);
            navigate('/');
        } else {
            navigate('/validateOtp');
        }
    };

    const register = async (email: string, password: string, username: string, refer_code: string) => {
        // todo: this flow need to be recode as it not verified
        await axios({
            url: '/account/register',
            method: 'POST',
            data: {
                email,
                password,
                username
            },
            params: { code: refer_code }
        });
    };

    const logout = async () => {
        await axios.delete('account/logout'); //Logout
        tokenServiceInstance.clearToken();
        dispatch({ type: LOGOUT });
        navigate('/login');
    };

    const resetPassword = (email: string) => console.log(email);

    const updateProfile = (user: UserProfile) => {
        console.log('user', user);
        dispatch({
            type: UPDATE,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <UserContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, setRefetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
