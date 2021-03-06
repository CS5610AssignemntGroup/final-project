export interface Review {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    user: User;
    createdAt: string;
}

export interface Book {
    _id: string;
    isbn: string;
    user: string;
    title: string;
    image: string;
    description: string;
    reviews: Review[];
    rating: number;
    numReviews: number;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface RootState {
    bookDelete: { loading: boolean; error: string; success: string };
    bookCreate: {
        loading: boolean;
        error: string;
        success: string;
        book: Book;
    };
    bookUpdate: {
        loading: boolean;
        error: string;
        success: string;
        book: Book;
    };
    bookReviewCreate: {
        loading: boolean;
        error: string;
        success: string;
    };
    bookOtherInfo: {
        loading: boolean;
        error: string;
        success: string;
        info: {
            authors: string[];
            averageRating: number;
            infoLink: string;
            pageCount: number;
            previewLink: string;
            publishedDate: string;
        };
    };
    userLogin: {
        loading: boolean;
        error: string;
        userInfo: User;
    };
    userRegister: {
        loading: boolean;
        error: string;
        userInfo: User;
    };
    userDetails: {
        loading: boolean;
        error: string;
        user: User;
    };
    userPublicProfile: {
        loading: boolean;
        error: string;
        user: User;
    };
    userUpdateProfile: {
        loading: boolean;
        error: string;
        success: string;
        userInfo: User;
    };
    userList: {
        loading: boolean;
        error: string;
        users: User[];
    };
    userDelete: {
        loading: boolean;
        error: string;
        success: string;
    };
    userUpdate: {
        loading: boolean;
        error: string;
        success: string;
        user: User;
    };
}
