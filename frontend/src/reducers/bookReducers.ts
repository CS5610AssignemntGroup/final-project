export const bookListReducer = (
    state = { books: [] },
    action: { type: any; payload: { books: any } }
) => {
    switch (action.type) {
        case 'BOOK_LIST_REQUEST':
            return { loading: true, books: [] };
        case 'BOOK_LIST_SUCCESS':
            return {
                loading: false,
                books: action.payload.books,
            };
        case 'BOOK_LIST_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bookDetailsReducer = (
    state = { book: { reviews: [] } },
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'BOOK_DETAILS_REQUEST':
            return { ...state, loading: true };
        case 'BOOK_DETAILS_SUCCESS':
            return { loading: false, book: action.payload };
        case 'BOOK_DETAILS_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
