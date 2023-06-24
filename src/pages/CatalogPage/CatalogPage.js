import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';

const CatalogPage = () => {
    const catalogObj = { name: '' };
    const [catalog, setCatalog] = useState(catalogObj);
    const [catalogs, setCatalogs] = useState(null);
    const [addCatalogInput, setAddCatalogInput] = useState(false);
    const [editCatalogInput, setEditCatalogInput] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/catalogs?_embed=products`)
            .then(res => setCatalogs(res.data))
            .catch(err => console.log(err))
    }, [editCatalogInput])

    if (!catalogs) {
        return null;
    }
    
    const createCatalogHandler = () => {
        if (addCatalogInput) {
            axios.post(`${API_URL}/catalogs`, catalog)
            .then(res => setCatalogs(prevState => [...prevState, res.data]))
            .catch(err => console.log(err.message))
            setAddCatalogInput(false)
            setCatalog(catalogObj)
        } else {
            setAddCatalogInput(true)
        }
    };
    
    const editCatalogHandler = id => {
        axios.get(`${API_URL}/catalogs/${id}`)
            .then(res => {
                setEditCatalogInput(true)
                setCatalog(prevState => ({ ...prevState, ...res.data }))
            })
    };

    const saveCatalogHandler = () => {
        axios.patch(`${API_URL}/catalogs/${catalog.id}`, catalog)
        .then(() => {
            setEditCatalogInput(false)
            setAddCatalogInput(false)
            setCatalog(catalogObj)
        })
        .catch(err => console.log(err.message))
    };

    const deleteCatalogHandler = id => {
        axios.delete(`${API_URL}/catalogs/${id}`)
            .then(() => {
                const catalogIndex = catalogs.findIndex(catalog => catalog.id === Number(id));
                setCatalogs(prevState => prevState.toSpliced(catalogIndex, 1))
                setAddCatalogInput(false)
                setEditCatalogInput(false)
            })
            .catch(err => console.log(err.message))
    };
    
    
    const inputHandler = e => {
        const { name, value } = e.target;
        setCatalog(prevState => ({ ...prevState, [name]: value }))
    };

    const catalogListElement = catalogs.map(catalog => {
        return (
            <li key={catalog.id}>
                <button onClick={() => editCatalogHandler(catalog.id)}>Edit</button>
                <button onClick={() => deleteCatalogHandler(catalog.id)}>Delete</button>
                <Link key={catalog.id} to={`/catalog/${catalog.id}`}>
                    {catalog.name}: {catalog.products ? catalog.products.length : '0'}
                </Link>
            </li>
        )
    });
    
    const inputElement = addCatalogInput || editCatalogInput ?
        <div className='form-control'>
            <label htmlFor='name'>Catalog Name</label>
            <input type='text' id='name' name='name' value={catalog.name} onChange={inputHandler} />
        </div>
        : null;

    return (
        <Container>
            {inputElement}
            {!editCatalogInput && <button onClick={createCatalogHandler}>{addCatalogInput ? 'Add' : 'Create Catalog'}</button>}
            {editCatalogInput && <button onClick={saveCatalogHandler}>Save</button>}
            <ul>{catalogListElement}</ul>
        </Container>
    );
};

export default CatalogPage;