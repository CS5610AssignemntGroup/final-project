import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { RootState } from '../../types';

interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = props => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" style={{ height: '7vh' }}>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/">AceBook</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart" /> Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
};

export { Header };
