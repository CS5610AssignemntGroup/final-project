import { gql } from '@apollo/client';

const getBooksQuery = gql`
    query books($keyword: String) {
        books(keyword: $keyword) {
            _id
            title
            image
            rating
            numReviews
            isbn
        }
    }
`;

const getBookQuery = gql`
    query GetBook($id: ID) {
        book(id: $id) {
            _id
            title
            isbn
            image
            description
            rating
            numReviews
            reviews {
                name
                rating
                comment
                createdAt
                user {
                    _id
                }
            }
        }
    }
`;

export { getBooksQuery, getBookQuery };
