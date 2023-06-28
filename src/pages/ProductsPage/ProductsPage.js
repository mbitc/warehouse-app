import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';
import ItemForm from '../../components/ItemForm/ItemForm';
import style from './ProductsPage.module.scss';

const ProductsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/catalogs/${id}?_embed=products`)
            .then(res => setProducts(res.data.products))
            .catch(err => toast.error(err.message))
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
            .then(res => {
                const productIndex = products.findIndex(product => product.id === Number(id));
                setProducts(prevState => prevState.toSpliced(productIndex, 1))
                toast.info(`Product ${product.name} is deleted ${res.statusText}`)
            })
            .catch(err => toast.error(err.message))
    };

    const productsListElement = products.map(product => {
        return (
            <li key={product.id} className={style.productList}>
                <button className='edit' onClick={() => editItemHandler(product)} />
                <button className='delete' onClick={() => deleteItemHandler(product.id)} />
                <Link className='link' to={`/warehouse-app/catalog/item/${product.id}`}>
                    {product.name}: {product.qty}
                </Link>
            </li>
        )
    });

    const showModalHandler = () => setModal(true);
    const closeModalHandler = () => setModal(false);

    return (
        <Container>
            <button className='btn long' onClick={showModalHandler}>Add Item</button>
            <div className={style.productListWrapper}>
                <ul className='list'>{productsListElement}</ul>
            </div>
            <ItemForm show={modal} onCloseModal={closeModalHandler} data={product} />
        </Container>
    );
};

export default ProductsPage;