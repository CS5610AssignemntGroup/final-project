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

export interface RootState {
    bookList: {
        books: Book[];
        loading: string;
        error: string;
    };
}
