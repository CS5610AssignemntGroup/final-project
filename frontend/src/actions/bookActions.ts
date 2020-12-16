import axios from 'axios';

export const listBooks = (keyword = '') => async (
    dispatch: (arg0: { type: string; payload?: any }) => void
) => {
    try {
        dispatch({ type: 'BOOK_LIST_REQUEST' });

        const { data } = await axios.get(`/api/books?keyword=${keyword}`);
        console.log('data in action', data);
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
