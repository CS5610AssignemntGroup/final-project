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

export const bookDeleteReducer = (
    state = {},
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'BOOK_DELETE_REQUEST':
            return { loading: true };
        case 'BOOK_DELETE_SUCCESS':
            return { loading: false, success: true };
        case 'BOOK_DELETE_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bookCreateReducer = (
    state = {},
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'BOOK_CREATE_REQUEST':
            return { loading: true };
        case 'BOOK_CREATE_SUCCESS':
            return { loading: false, success: true, book: action.payload };
        case 'BOOK_CREATE_FAIL':
            return { loading: false, error: action.payload };
        case 'BOOK_CREATE_RESET':
            return {};
        default:
            return state;
    }
};

export const bookUpdateReducer = (
    state = { book: {} },
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'BOOK_UPDATE_REQUEST':
            return { loading: true };
        case 'BOOK_UPDATE_SUCCESS':
            return { loading: false, success: true, book: action.payload };
        case 'BOOK_UPDATE_FAIL':
            return { loading: false, error: action.payload };
        case 'BOOK_UPDATE_RESET':
            return { book: {} };
        default:
            return state;
    }
};

export const bookReviewCreateReducer = (
    state = {},
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'BOOK_CREATE_REVIEW_REQUEST':
            return { loading: true };
        case 'BOOK_CREATE_REVIEW_SUCCESS':
            return { loading: false, success: true };
        case 'BOOK_CREATE_REVIEW_FAIL':
            return { loading: false, error: action.payload };
        case 'BOOK_CREATE_REVIEW_RESET':
            return {};
        default:
            return state;
    }
};
