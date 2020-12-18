import React, { FunctionComponent, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as H from 'history';
import { Book, RootState } from '../../types';
import { deleteBook, createBook } from '../../actions/bookActions';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../../queries/queries';

interface OwnProps {
    history: H.History;
}

type Props = OwnProps;

const AdminBookListPage: FunctionComponent<Props> = ({ history }) => {
    const dispatch = useDispatch();

    const { loading, error, data } = useQuery(getBooksQuery);
    let books = data ? data.books : undefined;

    const bookDelete = useSelector((state: RootState) => state.bookDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = bookDelete;

    const bookCreate = useSelector((state: RootState) => state.bookCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        book: createdBook,
    } = bookCreate;

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: 'BOOK_CREATE_RESET' });

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }

        if (successCreate) {
            history.push(`/admin/book/${createdBook._id}/edit`);
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdBook,
        data,
    ]);

    const deleteHandler = (id: string) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteBook(id));
        }
    };

    const createBookHandler = () => {
        dispatch(createBook());
    };

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Books</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createBookHandler}>
                        <i className="fas fa-plus"></i> Create Book
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <p>Loading...</p>}
            {errorDelete && <p>{errorDelete}</p>}
            {loadingCreate && <p>Loading...</p>}
            {errorCreate && <p>{errorCreate}</p>}
            {!books ? (
                <div></div>
            ) : loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>ISBN</th>
                                <th>OPERATION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book: Book) => (
                                <tr key={book._id}>
                                    <td>{book._id}</td>
                                    <td>{book.title}</td>
                                    <td>${book.isbn}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/book/${book._id}/edit`}>
                                            <Button
                                                variant="light"
                                                className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() =>
                                                deleteHandler(book._id)
                                            }>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export { AdminBookListPage };
