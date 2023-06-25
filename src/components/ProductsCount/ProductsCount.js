import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config';

const ProductsCount = () => {
    const [products, setProducts] = useState(false);
    const [productsQty, setProductsQty] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err.message))
    }, [])

    
    useEffect(() => {
        if (products) {
            const qtyArr = [];
            products.forEach(product => {
                qtyArr.push(product.qty)
            })
            setProductsQty(prevState => [...prevState, ...qtyArr])
        }
    }, [products])
    
    const initValue = 0;
    const coutentProducts = productsQty.reduce(
        (acc, currValue) => acc + currValue,
        initValue
    );

    return (
        <div>{coutentProducts}</div>
    );
};
export default ProductsCount;