import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';

const ProductsPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/catalogs/${id}?_embed=products`)
            .then(res => setProducts(res.data.products))
            .catch(err => console.log(err))
    }, [id])

    if (!products) {
        return null;
    }

    const productsListElement = products.map(product => {
        return (
            <Link key={product.id} to={`/catalog/item/${product.id}`}>
                <li>{product.name}: {product.qty}</li>
            </Link>
        )
    });
    return (
        <Container>
            <ul>{productsListElement}</ul>
        </Container>
    );
};

export default ProductsPage;