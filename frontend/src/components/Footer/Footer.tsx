import React, { FunctionComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface OwnProps {}

type Props = OwnProps;

const Footer: FunctionComponent<Props> = props => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col
                        className="text-center py-3"
                        style={{ fontSize: '10px' }}>
                        Copyright &copy; AceBook
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export { Footer };
