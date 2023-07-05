import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import ProductsCount from '../../components/ProductsCount/ProductsCount';
import { ROOT_PATH } from '../../config';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [loged, setLoged] = useState(false);

    const browserDataLoged = localStorage.getItem('loged');

    useEffect(() => {
        setLoged(browserDataLoged)
    }, [browserDataLoged])

    if (!loged) {
        navigate(`${ROOT_PATH}`)
    }

    return (
        <Container>
            <h2>Dashboard</h2>
            <div>
                <ProductsCount />
                <span className='test'>At The Warehouse are Items</span>
            </div>
        </Container>
    );
};

export default DashboardPage;