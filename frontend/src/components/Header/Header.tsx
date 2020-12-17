import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { RootState } from '../../types';
import { SearchBox } from '../../components';
import style from './style.module.css';

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
            <Navbar bg="primary" variant="dark" style={{ height: '7vh' }}>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/">AceBook</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className={style.searchBox}>
                            <Route
                                render={({ history }) => (
                                    <SearchBox history={history} />
                                )}
                            />
                        </div>

                        <Nav className="ml-auto">
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
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
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/booklist">
                                        <NavDropdown.Item>
                                            Books
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export { Header };
