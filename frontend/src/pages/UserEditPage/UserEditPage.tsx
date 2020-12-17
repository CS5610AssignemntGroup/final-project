import React, { FunctionComponent, useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    listUsers,
    deleteUser,
    getUserDetails,
    updateUser,
} from '../../actions/userActions';
import { createBrowserHistory } from 'history';
import { RootState } from '../../types';
import { Link } from 'react-router-dom';

interface OwnProps {
    id: string;
}

type Props = OwnProps;

const UserEditPage: FunctionComponent<Props> = ({ id }) => {
    console.log('id pre', id);
    const history = createBrowserHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state: RootState) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state: RootState) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: 'USER_UPDATE_RESET' });
            history.push('/admin/userlist');
        } else {
            // if (!user.name || user._id !== id) {
            console.log('user', user);
            console.log(Object.keys(user).length === 0);
            if (id && Object.keys(user).length === 0) {
                console.log('id', id);
                dispatch(getUserDetails(id));
            }
        }
    }, [dispatch, history, id, user, successUpdate]);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(updateUser({ _id: id, name, email, isAdmin }));
    };

    return (
        <div>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <h1>Edit User</h1>
                        {loadingUpdate && <p>Loading...</p>}
                        {errorUpdate && <p>{errorUpdate}</p>}
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={e =>
                                            setName(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={e =>
                                            setEmail(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="isadmin">
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Admin"
                                        checked={isAdmin}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setIsAdmin(e.target.checked)
                                        }></Form.Check>
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

export { UserEditPage };
