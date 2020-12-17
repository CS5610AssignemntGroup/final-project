import axios from 'axios';
import { logout } from './userActions';

export const listBooks = (keyword = '') => async (
    dispatch: (arg0: { type: string; payload?: any }) => void
) => {
    try {
        dispatch({ type: 'BOOK_LIST_REQUEST' });

        const { data } = await axios.get(`/api/books?keyword=${keyword}`);

        dispatch({
            type: 'BOOK_LIST_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'BOOK_LIST_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listBookDetails = (id: string) => async (
    dispatch: (arg0: { type: any; payload?: any }) => void
) => {
    try {
        dispatch({ type: 'BOOK_DETAILS_REQUEST' });

        const { data } = await axios.get(`/api/books/${id}`);

        dispatch({
            type: 'BOOK_DETAILS_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'BOOK_DETAILS_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteBook = (id: string) => async (
    dispatch: (arg0: { type?: string; payload?: any }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'BOOK_DELETE_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/books/${id}`, config);

        dispatch({
            type: 'BOOK_DELETE_SUCCESS',
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
            type: 'BOOK_DELETE_FAIL',
            payload: message,
        });
    }
};

export const createBook = () => async (
    dispatch: (arg0: { payload?: any; type?: string }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'BOOK_CREATE_REQUEST',
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/books`, {}, config);

        dispatch({
            type: 'BOOK_CREATE_SUCCESS',
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
            type: 'BOOK_CREATE_FAIL',
            payload: message,
        });
    }
};

export const updateBook = (book: any) => async (
    dispatch: (arg0: { payload?: any; type?: string }) => void,
    getState: () => { userLogin: { userInfo: any } }
) => {
    try {
        dispatch({
            type: 'BOOK_UPDATE_REQUEST',
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
            `/api/books/${book._id}`,
            book,
            config
        );

        dispatch({
            type: 'BOOK_UPDATE_SUCCESS',
            payload: data,
        });
        dispatch({ type: 'BOOK_DETAILS_SUCCESS', payload: data });
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
            type: 'BOOK_UPDATE_FAIL',
            payload: message,
        });
    }
};
