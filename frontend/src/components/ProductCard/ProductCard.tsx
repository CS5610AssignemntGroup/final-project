import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

interface Product {
    image: string;
    name: string;
    price: number;
}

interface OwnProps {
    product: Product;
}

type Props = OwnProps;

const ProductCard: FunctionComponent<Props> = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Img src={product.image} variant="top" />

            <Card.Body>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>

                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export { ProductCard };
export type { Product };