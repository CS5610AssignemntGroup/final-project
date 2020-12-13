import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Rating } from '../Rating/Rating';

// interface Product {
//     image: string;
//     name: string;
//     price: number;
// }

interface OwnProps {
    id: string;
    image: string;
    name: string;
    price: number;
    size: number;
    rating: number;
    rateNum: number;
}

type Props = OwnProps;

const ProductCard: FunctionComponent<Props> = ({
    id,
    image,
    name,
    price,
    size,
    rating,
    rateNum,
}) => {
    return (
        <Card className="my-3 p-3 rounded" style={{ width: `${size}px` }}>
            <Link to={`/product/${id}`}>
                <Card.Img src={image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${id}`}>
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating value={rating} number={rateNum} />
                </Card.Text>

                <Card.Text as="h3">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export { ProductCard };
// export type { Product };
