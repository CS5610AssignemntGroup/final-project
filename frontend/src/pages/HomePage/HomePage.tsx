import React, { FunctionComponent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import style from './style.module.css';
// import { Product } from '../../components/ProductCard/ProductCard';

interface OwnProps {}

type Props = OwnProps;

const GET_PRODUCTS = gql`
    query products {
        getAllProducts {
            name
            image
            price
            _id
        }
    }
`;

const HomePage: FunctionComponent<Props> = props => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h1>Latest Products</h1>
            <div className={style.productContainer}>
                {data.getAllProducts.map(
                    (product: {
                        _id: string;
                        name: string;
                        image: string;
                        price: number;
                        rating: number;
                        rateNum: number;
                    }) => (
                        <ProductCard
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            rating={4.1}
                            rateNum={10}
                            size={300}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export { HomePage };
