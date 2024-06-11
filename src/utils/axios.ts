import axios from 'axios';

import { useReducer } from 'react';
import TokenService from './tokenService';
import accountReducer from 'src/store/accountReducer';

const requestService = axios.create({
    baseURL: process.env.REACT_APP_API_ENTRYPOINT
});

const tokenServiceInstance = new TokenService();

requestService.interceptors.request.use(
    (config) => {
        const token = tokenServiceInstance.getAccessToken();
        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

requestService.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const valid = tokenServiceInstance.getRefreshTokenValidity();
        // if refresh token is expired, redirect user to login with action
        if (!valid) {
            useReducer(accountReducer, {
                isLoggedIn: false,
                isInitialized: false,
                user: null
            });
        }

        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            const res = await requestService({
                url: '/token/refresh',
                method: 'POST',
                data: {
                    refresh: tokenServiceInstance.getRefreshToken()
                }
            });
            if (res.status === 200) {
                tokenServiceInstance.setToken(res.data);

                requestService.defaults.headers.common.Authorization = `Bearer ${tokenServiceInstance.getAccessToken()}`;

                return requestService(originalRequest);
            }
            return null;
        }
        return Promise.reject(error);
    }
);

export default requestService;
