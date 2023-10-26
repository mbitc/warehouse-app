import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import ProductsCount from '../../components/ProductsCount/ProductsCount';
import { ROOT_PATH } from '../../config';
import style from './DashboardPage.module.scss';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loged, setLoged] = useState(false);

  const browserDataLoged = localStorage.getItem('loged');

  useEffect(() => {
    setLoged(browserDataLoged);
  }, [browserDataLoged]);

  if (!loged) {
    navigate(`${ROOT_PATH}`);
  }

  return (
    <Container>
      <div className={style.dashboardWrapper}>
        <ProductsCount />
        <span>At The Warehouse are Items</span>
      </div>
    </Container>
  );
};

export default DashboardPage;
