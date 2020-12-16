import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Rating } from '../Rating/Rating';

interface OwnProps {
    id: string;
    image: string;
    title: string;
    size: number;
    rating: number;
    numReviews: number;
}

type Props = OwnProps;

const BookCard: FunctionComponent<Props> = ({
    id,
    image,
    title,
    size,
    rating,
    numReviews,
}) => {
    return (
        <Card className="my-3 p-3 rounded" style={{ width: `${size}px` }}>
            <Link to={`/book/${id}`}>
                <Card.Img src={image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/book/${id}`}>
                    <Card.Title as="div">
                        <strong>{title}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating value={rating} number={numReviews} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export { BookCard };
