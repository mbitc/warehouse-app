import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';

const CatalogPage = () => {
    const [catalogs, setCatalogs] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/catalogs?_embed=products`)
            .then(res => setCatalogs(res.data))
            .catch(err => console.log(err))
    }, [])

    if(!catalogs) {
        return null;
    }

    const catalogListElement = catalogs.map(catalog => {
        return (
            <Link key={catalog.id} to={`/catalog/${catalog.id}`}>
            <li>{catalog.name}: {catalog.products.length}</li>
            </Link>
        )
    });

    return (
        <>
        <ul>{catalogListElement}</ul>
        </>
    );
};

export default CatalogPage;