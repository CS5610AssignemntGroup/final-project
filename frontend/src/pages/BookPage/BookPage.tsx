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
import { RootState, Review } from '../../types';
import {
    createBookReview,
    listBookDetails,
    getOtherInfoFromGoogleBook,
} from '../../actions/bookActions';
import { Rating } from '../../components';
import style from './style.module.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../../queries/queries';

interface OwnProps {
    id: string;
}

type Props = OwnProps;

const BookPage: FunctionComponent<Props> = ({ id }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id },
    });

    let book = data ? data.book : undefined;

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    const bookReviewCreate = useSelector(
        (state: RootState) => state.bookReviewCreate
    );
    const {
        success: successBookReview,
        loading: loadingBookReview,
        error: errorBookReview,
    } = bookReviewCreate;

    const bookOtherInfo = useSelector(
        (state: RootState) => state.bookOtherInfo
    );
    const {
        loading: loadingBookOtherInfo,
        error: errorBookOtherInfo,
        info,
    } = bookOtherInfo;

    useEffect(() => {
        if (successBookReview) {
            setRating('0');
            setComment('');
        }

        if (book && (!book._id || book._id !== id)) {
            dispatch({ type: 'BOOK_CREATE_REVIEW_RESET' });
        }

        if (book && book._id) {
            dispatch(getOtherInfoFromGoogleBook(book));
        }
        console.log('book', book);
    }, [dispatch, loading, successBookReview, data]);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(
            createBookReview(id, {
                rating,
                comment,
            })
        );
    };

    // @ts-ignore
    // @ts-ignore
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
                                        <p>Other Info from Google Books</p>
                                        {!info ? (
                                            ''
                                        ) : (
                                            <div>
                                                <b>Average Rating:</b>
                                                <p>
                                                    {info.averageRating
                                                        ? info.averageRating
                                                        : 'no rating'}
                                                </p>
                                                <b>Authors:</b>
                                                <p>
                                                    {info.authors
                                                        ? info.authors
                                                        : 'no authors info'}
                                                </p>
                                                <b>Published Date:</b>
                                                <p>
                                                    {info.publishedDate
                                                        ? info.publishedDate
                                                        : 'no date info'}
                                                </p>
                                                <b>Pages:</b>
                                                <p>
                                                    {info.pageCount
                                                        ? info.pageCount
                                                        : 'no page info'}
                                                </p>
                                                <a
                                                    className={style.mylink}
                                                    href={
                                                        info.previewLink
                                                            ? info.previewLink
                                                            : '/'
                                                    }
                                                    target="_blank">
                                                    Preview Link
                                                </a>
                                                <br />
                                                <a
                                                    className={style.mylink}
                                                    href={
                                                        info.infoLink
                                                            ? info.infoLink
                                                            : '/'
                                                    }
                                                    target="_blank">
                                                    Info Link
                                                </a>
                                            </div>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <div className={style.space}></div>
                    <Row>
                        <Col md={12}>
                            <h2>Reviews</h2>
                            {book.reviews.length === 0 && <p>No Reviews</p>}
                            <ListGroup variant="flush">
                                {book.reviews.map((review: Review) => (
                                    <ListGroup.Item key={review._id}>
                                        <LinkContainer
                                            to={`/publicprofile/${review.user._id}`}>
                                            <strong
                                                className={style.reviewName}>
                                                {review.name}
                                            </strong>
                                        </LinkContainer>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {successBookReview && (
                                        <p>Review submitted successfully</p>
                                    )}
                                    {loadingBookReview && <p>Loading...</p>}
                                    {errorBookReview && (
                                        <p>{errorBookReview}</p>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={e =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }>
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    // row='3'
                                                    value={comment}
                                                    onChange={e =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingBookReview}
                                                type="submit"
                                                variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <p>
                                            Please
                                            <Link to="/login">sign in</Link> to
                                            write a review
                                        </p>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export { BookPage };
