import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import ProductsCount from '../../components/ProductsCount/ProductsCount';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [loged, setLoged] = useState(false);

    const browserDataLoged = localStorage.getItem('loged');

    useEffect(() => {
        setLoged(browserDataLoged)
    }, [browserDataLoged])

    if (!loged) {
        navigate('/')
    }

    return (
        <Container>
            <h2>Dashboard</h2>
            <span>In Warehouse Items</span>
            <ProductsCount />
        </Container>
    );
};

export default DashboardPage;