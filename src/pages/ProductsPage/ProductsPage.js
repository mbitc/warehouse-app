import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';
import ItemForm from '../../components/ItemForm/ItemForm';

const ProductsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/catalogs/${id}?_embed=products`)
            .then(res => setProducts(res.data.products))
            .catch(err => console.log(err))
    }, [id, modal])

    if (!products) {
        return null;
    }

    const editItemHandler = product => {
        setProduct(product)
        setModal(true)
    };

    const deleteItemHandler = id => {
        axios.delete(`${API_URL}/products/${id}`)
            .then(() => {
                const productIndex = products.findIndex(product => product.id == Number(id));
                setProducts(prevState => prevState.toSpliced(productIndex, 1))
            })
            .catch(err => console.log(err.message))
    };

    const productsListElement = products.map(product => {
        return (
            <li key={product.id} >
                <button onClick={() => editItemHandler(product)}>Edit</button>
                <button onClick={() => deleteItemHandler(product.id)}>Delete</button>
                <Link to={`/catalog/item/${product.id}`}>
                    {product.name}: {product.qty}
                </Link>
            </li>
        )
    });

    const showModalHandler = () => setModal(true);
    const closeModalHandler = () => setModal(false);

    return (
        <Container>
            <button onClick={showModalHandler}>Add Item</button>
            <ul>{productsListElement}</ul>
            <ItemForm show={modal} onCloseModal={closeModalHandler} data={product} />
        </Container>
    );
};

export default ProductsPage;