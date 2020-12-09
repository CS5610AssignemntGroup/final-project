import React, { FunctionComponent } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = props => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" style={{ height: '7vh' }}>
                <Container>
                    <Navbar.Brand href="/">AceBook</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link>
                            <i className="fas fa-shopping-cart" /> Cart
                        </Nav.Link>
                        <Nav.Link>
                            <i className="fas fa-user" /> Sign In
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
};

export { Header };
