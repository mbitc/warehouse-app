import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';
import LocationData from '../../components/LocationData/LocationData';
import style from './ItemPage.module.scss';

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
            <div key={storage.id} className={style.locationQty}>
                <span>{storage.qty} unit</span>
                <LocationData id={storage.id} />
            </div>
        );
    });

    return (
        <Container>
            <div className={style.itemWrapper}>
                <div className={style.itemCase}>
                    <h2 className={style.itemTitle}>{item.name}</h2>
                    <img src={item.img} alt={item.name} />
                    <p className={style.itemDescription}>{item.description}</p>
                    <div className={style.itemData}>
                        <span>{item.code}</span>
                        <span>{item.qty} unit</span>
                        <span>{item.price} Eur</span>
                        {storageListElement}
                        <Link className='link' to={`/catalog/${item.catalogId}`}>
                            <span className={style.backLink}>back to products list</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ItemPage;