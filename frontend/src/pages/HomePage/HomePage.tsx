import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { RootState, Book } from '../../types';
import { listBooks } from '../../actions/bookActions';
import style from './style.module.css';

interface OwnProps {
    keyword: string;
}

type Props = OwnProps;

const HomePage: FunctionComponent<Props> = ({ keyword }) => {
    const dispatch = useDispatch();

    const bookList = useSelector((state: RootState) => state.bookList);

    const { loading, error, books } = bookList;

    useEffect(() => {
        dispatch(listBooks(keyword));
    }, [dispatch, keyword]);

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
                    {books.map((book: Book) => (
                        <ProductCard
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
