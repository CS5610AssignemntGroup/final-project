import React, { FunctionComponent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ProductCard } from '../../components/ProductCard/ProductCard';
// import { Product } from '../../components/ProductCard/ProductCard';

interface OwnProps {}

type Props = OwnProps;

const GET_PRODUCTS = gql`
    query products {
        getAllProducts {
            name
            image
            price
        }
    }
`;

const HomePage: FunctionComponent<Props> = props => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h1>Latest Products</h1>
            <div className="product-container">
                {data.getAllProducts.map(
                    (product: {
                        name: string;
                        image: string;
                        price: number;
                    }) => (
                        <ProductCard
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            size={300}
                        />
                    )
                )}
            </div>
        </div>
    );

    //test without graphql
    // const product = {
    //     name: 'abook',
    //     image:
    //         'data:image/jpeg;base64,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',
    //     price: 1,
    // };
    // const products = [product];
    //
    // return (
    //     <div>
    //         <h1>Latest Products</h1>
    //         <Row>
    //             {products.map(product => (
    //                 <Col sm={12} md={6} lg={4}>
    //                     <ProductCard product={product} />
    //                 </Col>
    //             ))}
    //         </Row>
    //     </div>
    // );
};

export { HomePage };
