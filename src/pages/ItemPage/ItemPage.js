import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL, ROOT_PATH } from '../../config';
import Container from '../../components/Container/Container';
import LocationData from '../../components/LocationData/LocationData';
import style from './ItemPage.module.scss';

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}?_embed=storages`)
      .then((res) => setItem(res.data))
      .catch((err) => toast.error(err));
  }, [id]);

  if (!item) {
    return null;
  }

  const storageListElement = item.storages.map((storage) => {
    return (
      <div key={storage.id} className={style.locationQty}>
        <span>{storage.qty} unit</span>
        <LocationData id={storage.locationId} />
      </div>
    );
  });

  return (
    <Container>
      <div className={style.itemWrapper}>
        <div className={style.itemCase}>
          <h2 className={style.itemTitle}>{item.name}</h2>
          <img
            className={style.photoBg}
            src={item.img}
            alt={item.name}
            width='350px'
          />
          <p className={style.itemDescription}>{item.description}</p>
          <div className={style.itemData}>
            <span>{item.code}</span>
            <span>{item.qty} unit</span>
            <span className={style.price}>€ {item.price}</span>
            {storageListElement}
            <Link className='link' to={`${ROOT_PATH}catalog/${item.catalogId}`}>
              <span className={style.backLink}>back to products list</span>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ItemPage;
