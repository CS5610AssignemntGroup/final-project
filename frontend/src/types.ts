export interface Review {
    name: string;
    rating: number;
    comment: string;
    user: string;
}

export interface Book {
    _id: string;
    isbn: string;
    user: string;
    title: string;
    image: string;
    description: string;
    reviews: Review;
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
    bookList: {
        books: Book[];
        loading: string;
        error: string;
    };
    bookDetails: {
        book: Book;
        loading: string;
        error: string;
    };
    userLogin: {
        loading: string;
        error: string;
        userInfo: User;
    };
    userRegister: {
        loading: string;
        error: string;
        userInfo: User;
    };
    userDetails: {
        loading: string;
        error: string;
        user: User;
    };
}
