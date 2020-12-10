import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

// interface Product {
//     image: string;
//     name: string;
//     price: number;
// }

interface OwnProps {
    image: string;
    name: string;
    price: number;
    size: number;
}

type Props = OwnProps;

const ProductCard: FunctionComponent<Props> = ({
    image,
    name,
    price,
    size,
}) => {
    return (
        <Card className="my-3 p-3 rounded" style={{ width: `${size}px` }}>
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
// export type { Product };
