import React, { FunctionComponent, useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { updateBook } from '../../actions/bookActions';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../../queries/queries';

interface OwnProps {
    id: string;
}

type Props = OwnProps;

const AdminBookEditPage: FunctionComponent<Props> = ({ id }) => {
    const history = createBrowserHistory();
    //TODO initial state
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id },
    });

    let book = data ? data.book : undefined;

    const bookUpdate = useSelector((state: RootState) => state.bookUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = bookUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: 'BOOK_UPDATE_RESET' });
            history.push('/admin/booklist');
        }
    }, [dispatch, history, id, book, successUpdate]);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(
            updateBook({
                _id: id,
                title,
                image,
                isbn,
                description,
            })
        );
    };

    return (
        <div>
            <Link to="/admin/booklist" className="btn btn-light my-3">
                Go Back
            </Link>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <h1>Edit Book</h1>
                        {loadingUpdate && <p>Loading...</p>}
                        {errorUpdate && <p>{errorUpdate}</p>}
                        {!book ? (
                            <div></div>
                        ) : loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            //TODO bug in input

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    {console.log('title', title)}
                                    <Form.Control
                                        type="title"
                                        placeholder="Enter book title"
                                        value={title}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setTitle(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter image url"
                                        value={image}
                                        onChange={e =>
                                            setImage(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="isbn">
                                    <Form.Label>Isbn</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter isbn"
                                        value={isbn}
                                        onChange={e =>
                                            setIsbn(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={e =>
                                            setDescription(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Button type="submit" variant="primary">
                                    Update
                                </Button>
                            </Form>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export { AdminBookEditPage };
