import React, { FunctionComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';

interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = props => {
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
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <i className="fas fa-user" /> Sign In
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
};

export { Header };
