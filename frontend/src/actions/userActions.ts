import axios from 'axios';
import { User } from '../types';

export const login = (email: string, password: string) => async (
    dispatch: (arg0: { type: any; payload?: any }) => void
) => {
    try {
        dispatch({
            type: 'USER_LOGIN_REQUEST',
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        );

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch: (arg0: { type: string }) => void) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: 'USER_LOGOUT' });
    dispatch({ type: 'USER_DETAILS_RESET' });
    document.location.href = '/login';
};

export const register = (
    name: string,
    email: string,
    password: string
) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
        dispatch({
            type: 'USER_REGISTER_REQUEST',
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users',
            { name, email, password },
            config
        );

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data,
        });

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUserDetails = (id: string) => async (
    dispatch: (arg0: { type?: string; payload?: any }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'USER_DETAILS_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            // @ts-ignore
            dispatch(logout());
        }
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload: message,
        });
    }
};

export const updateUserProfile = (user: any) => async (
    dispatch: (arg0: { payload?: any; type: string }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'USER_UPDATE_PROFILE_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: data,
        });
        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            // @ts-ignore
            dispatch(logout());
        }
        dispatch({
            type: 'USER_UPDATE_PROFILE_FAIL',
            payload: message,
        });
    }
};
export const listUsers = () => async (
    dispatch: (arg0: { payload?: any; type?: string }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'USER_LIST_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch({
            type: 'USER_LIST_SUCCESS',
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            // @ts-ignore
            dispatch(logout());
        }
        dispatch({
            type: 'USER_LIST_FAIL',
            payload: message,
        });
    }
};

export const deleteUser = (id: string) => async (
    dispatch: (arg0: { payload?: any; type?: string }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'USER_DELETE_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: 'USER_DELETE_SUCCESS' });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            // @ts-ignore
            dispatch(logout());
        }
        dispatch({
            type: 'USER_DELETE_FAIL',
            payload: message,
        });
    }
};

export const updateUser = (user: any) => async (
    dispatch: (arg0: { payload?: any; type?: string }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'USER_UPDATE_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/users/${user._id}`,
            user,
            config
        );

        dispatch({ type: 'USER_UPDATE_SUCCESS' });

        dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data });

        dispatch({ type: 'USER_DETAILS_RESET' });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            // @ts-ignore
            dispatch(logout());
        }
        dispatch({
            type: 'USER_UPDATE_FAIL',
            payload: message,
        });
    }
};
