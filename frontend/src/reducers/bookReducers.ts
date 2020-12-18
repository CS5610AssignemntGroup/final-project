export const bookOtherInfoReducer = (
    state = { info: {} },
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'BOOK_OTHER_INFO_REQUEST':
            return { ...state, loading: true };
        case 'BOOK_OTHER_INFO_SUCCESS':
            return { loading: false, info: action.payload };
        case 'BOOK_OTHER_INFO_FAIL':
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
