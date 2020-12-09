import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

interface Product {
    image: string;
    name: string;
    price: number;
}

interface OwnProps {
    image: string;
    name: string;
    price: number;
}

type Props = OwnProps;

const ProductCard: FunctionComponent<Props> = ({ image, name, price }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Img src={image} variant="top" />

            <Card.Body>
                <Card.Title as="div">
                    <strong>{name}</strong>
                </Card.Title>

                <Card.Text as="h3">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export { ProductCard };
export type { Product };
