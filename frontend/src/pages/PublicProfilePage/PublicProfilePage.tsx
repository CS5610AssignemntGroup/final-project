import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import { RootState } from '../../types';
import { getUserPublicProfile } from '../../actions/userActions';
import { createBrowserHistory } from 'history';

interface OwnProps {
    id: string;
}

type Props = OwnProps;

const PublicProfilePage: FunctionComponent<Props> = ({ id }) => {
    const history = createBrowserHistory();

    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userPublicProfile = useSelector(
        (state: RootState) => state.userPublicProfile
    );
    const { loading, error, user } = userPublicProfile;

    useEffect(() => {
        dispatch(getUserPublicProfile(id));
    }, [id]);

    return (
        <div>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <h2>User Profile</h2>
                    {message && <p>{message}</p>}
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    {!user ? (
                                        'no info'
                                    ) : (
                                        <div>
                                            <b>User Name:</b>
                                            <p>
                                                {user.name
                                                    ? user.name
                                                    : 'no info'}
                                            </p>
                                            <b>User Email:</b>
                                            <p>
                                                {user.email
                                                    ? user.email
                                                    : 'no info'}
                                            </p>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )}
                </Col>
                <Col md={3}></Col>
            </Row>
        </div>
    );
};

export { PublicProfilePage };
