import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    bookDeleteReducer,
    bookCreateReducer,
    bookUpdateReducer,
    bookReviewCreateReducer,
    bookOtherInfoReducer,
} from './reducers/bookReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userDeleteReducer,
    userListReducer,
    userUpdateReducer,
    userPublicProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
    bookDelete: bookDeleteReducer,
    bookCreate: bookCreateReducer,
    bookUpdate: bookUpdateReducer,
    bookReviewCreate: bookReviewCreateReducer,
    bookOtherInfo: bookOtherInfoReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userPublicProfile: userPublicProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(<string>localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
