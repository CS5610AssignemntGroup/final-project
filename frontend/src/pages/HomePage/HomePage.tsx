import React, { FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from '../../components';
import { Book } from '../../types';
import style from './style.module.css';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../../queries/queries';

interface OwnProps {
    keyword: string;
}

type Props = OwnProps;

const HomePage: FunctionComponent<Props> = ({ keyword }) => {
    const { loading, error, data } = useQuery(getBooksQuery, {
        variables: { keyword },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {!keyword ? (
                <div />
            ) : (
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
            )}
            <h1>Latest Books</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={style.bookContainer}>
                    {data.books.map((book: Book) => (
                        <BookCard
                            key={book._id}
                            id={book._id}
                            title={book.title}
                            image={book.image}
                            rating={book.rating}
                            numReviews={book.numReviews}
                            size={300}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export { HomePage };
