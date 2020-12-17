import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { RootState } from '../../types';
import * as H from 'history';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';

interface OwnProps {
    location: H.Location;
    history: H.History;
}

type Props = OwnProps;

const ProfilePage: FunctionComponent<Props> = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state: RootState) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(
        (state: RootState) => state.userUpdateProfile
    );
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // @ts-ignore
            setMessage('Passwords do not match');
        } else {
            const newUser = { id: user._id, name, email, password };
            dispatch(updateUserProfile(newUser));
        }
    };

    return (
        <div>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <h2>User Profile</h2>
                    {message && <p>{message}</p>}
                    {}
                    {success && <p>Profile Updated</p>}
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

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e =>
                                        setPassword(e.target.value)
                                    }></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={e =>
                                        setConfirmPassword(e.target.value)
                                    }></Form.Control>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Form>
                    )}
                </Col>
                <Col md={3}></Col>
            </Row>
        </div>
    );
};

export { ProfilePage };
