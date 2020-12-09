import React, { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

interface OwnProps {}

type Props = OwnProps;

const HomePage: FunctionComponent<Props> = props => {
    const product = {
        name: 'one',
    };
    const products = [product];
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6}>
                        <h3>{product.name}</h3>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export { HomePage };
