import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import { RootState, Book } from '../../types';
import { listBookDetails } from '../../actions/bookActions';
import { Rating } from '../../components';

interface OwnProps {
    id: string;
}

type Props = OwnProps;

const BookPage: FunctionComponent<Props> = ({ id }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const bookDetails = useSelector((state: RootState) => state.bookDetails);
    const { loading, error, book } = bookDetails;

    useEffect(() => {
        if (!book._id || book._id !== id) {
            dispatch(listBookDetails(id));
        }
    }, []);
    console.log('loading', book);
    console.log('book', book);
    if (!book) {
        return <div>Book Not found</div>;
    }

    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Row>
                        <Col md={3}>
                            <Image src={book.image} alt={book.title} fluid />
                        </Col>
                        <Col md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{book.title}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {console.log('rating', book.rating)}
                                    <Rating
                                        value={book.rating || 0}
                                        number={book.numReviews}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {book.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Button>Add To Favorite List</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export { BookPage };
