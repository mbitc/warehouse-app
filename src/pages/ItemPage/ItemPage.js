import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';

const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/products/${id}?_embed=storages`)
            .then(res => setItem(res.data))
            .catch(err => console.log(err))
    }, [id])

    if (!item) {
        return null;
    }

    const storageListElement = item.storages.map(storage => {
        return (
        <li key={storage.id}>{storage.qty} unit</li>
        );
    });

    return (
        <Container>
            <h2>{item.name}</h2>
            <img src={item.img} alt={item.name} />
            <p>{item.description}</p>
            <span>{item.code}</span>
            <span>{item.qty} unit</span>
            <span>{item.price} Eur</span>
            <ul>{storageListElement}</ul>
        </Container>
    );
};

export default ItemPage;