export interface Review {
    name: string;
    rating: number;
    comment: string;
    user: string;
}

export interface Book {
    id: string;
    user: string;
    title: string;
    image: string;
    description: string;
    reviews: Review;
    rating: number;
    numReviews: number;
}

export interface RootState {
    bookList: Book[];
}
