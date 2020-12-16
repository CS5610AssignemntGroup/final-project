// @ts-ignore
export const userLoginReducer = (
    state = {},
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true };
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, userInfo: action.payload };
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_LOGOUT':
            return {};
        default:
            return state;
    }
};

// @ts-ignore
export const userRegisterReducer = (
    state = {},
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true };
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, userInfo: action.payload };
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_LOGOUT':
            return {};
        default:
            return state;
    }
};

// @ts-ignore
export const userDetailsReducer = (
    state = { user: {} },
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'USER_DETAILS_REQUEST':
            return { ...state, loading: true };
        case 'USER_DETAILS_SUCCESS':
            return { loading: false, user: action.payload };
        case 'USER_DETAILS_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_DETAILS_RESET':
            return { user: {} };
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (
    state = {},
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case 'USER_UPDATE_PROFILE_REQUEST':
            return { loading: true };
        case 'USER_UPDATE_PROFILE_SUCCESS':
            return { loading: false, success: true, userInfo: action.payload };
        case 'USER_UPDATE_PROFILE_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_UPDATE_PROFILE_RESET':
            return {};
        default:
            return state;
    }
};
