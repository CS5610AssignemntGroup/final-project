import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const books = bookList;

    useEffect(() => {
        dispatch(listBooks(keyword));
    }, [dispatch, keyword]);

    return (
        <div>
            <h1>Latest Books</h1>
            <div className={style.bookContainer}>
                {books.map((book: Book) => (
                    <ProductCard
                        id={book.id}
                        title={book.title}
                        image={book.image}
                        rating={book.rating}
                        numReviews={book.numReviews}
                        size={300}
                    />
                ))}
            </div>
        </div>
    );
};

export { HomePage };
