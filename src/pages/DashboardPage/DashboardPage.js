import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';

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
        
    </Container>
  );
};

export default DashboardPage;