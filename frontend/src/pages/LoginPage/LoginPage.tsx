import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { login } from '../../actions/userActions';
import * as H from 'history';
import { RootState } from '../../types';

interface OwnProps {
    location: H.Location;
    history: H.History;
}

type Props = OwnProps;

const LoginPage: FunctionComponent<Props> = ({ history, location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Sign In</h1>
                    {error && <p>{error}</p>}
                    {loading && <p>Loading...</p>}
                    <Form onSubmit={submitHandler}>
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

                        <Button type="submit" variant="primary">
                            Sign In
                        </Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            New Customer?{' '}
                            <Link
                                to={
                                    redirect
                                        ? `/register?redirect=${redirect}`
                                        : '/register'
                                }>
                                Register
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export { LoginPage };
