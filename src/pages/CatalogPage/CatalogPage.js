import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';
import style from './CatalogPage.module.scss';

const CatalogPage = () => {
    const catalogObj = { name: '' };
    const [catalog, setCatalog] = useState(catalogObj);
    const [catalogs, setCatalogs] = useState(null);
    const [addCatalogInput, setAddCatalogInput] = useState(false);
    const [editCatalogInput, setEditCatalogInput] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/catalogs?_embed=products`)
            .then(res => setCatalogs(res.data))
            .catch(err => toast.error(err.message))
    }, [editCatalogInput])

    if (!catalogs) {
        return null;
    }

    const createCatalogHandler = () => {
        if (addCatalogInput) {
            axios.post(`${API_URL}/catalogs`, catalog)
                .then(res => {
                    setCatalogs(prevState => [...prevState, res.data])
                    toast.success(`Category ${catalog.name} is ${res.statusText}`)
                })
                .catch(err => toast.error(err.message))
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
            .catch(err => toast.error(err.message))
    };

    const saveCatalogHandler = () => {
        axios.patch(`${API_URL}/catalogs/${catalog.id}`, catalog)
            .then(res => {
                toast.success(`Category ${catalog.name} updated ${res.statusText}`)
                setEditCatalogInput(false)
                setAddCatalogInput(false)
                setCatalog(catalogObj)
            })
            .catch(err => toast.error(err.message))
    };

    const deleteCatalogHandler = id => {
        axios.delete(`${API_URL}/catalogs/${id}`)
            .then(res => {
                const catalogIndex = catalogs.findIndex(catalog => catalog.id === Number(id));
                setCatalogs(prevState => prevState.toSpliced(catalogIndex, 1))
                toast.info(`Category ${catalog.name} is deleted ${res.statusText}`)
                setAddCatalogInput(false)
                setEditCatalogInput(false)
            })
            .catch(err => toast.error(err.message))
    };


    const inputHandler = e => {
        const { name, value } = e.target;
        setCatalog(prevState => ({ ...prevState, [name]: value }))
    };

    const catalogListElement = catalogs.map(catalog => {
        return (
            <li key={catalog.id} className={style.categoryList}>
                <button className='delete' onClick={() => deleteCatalogHandler(catalog.id)} />
                <button className='edit' onClick={() => editCatalogHandler(catalog.id)} />
                <Link className='link' key={catalog.id} to={`/warehouse-app/catalog/${catalog.id}`}>
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
            {!editCatalogInput && <button className='btn long' onClick={createCatalogHandler}>{addCatalogInput ? 'Add' : 'Create Catalog'}</button>}
            {editCatalogInput && <button className='btn long' onClick={saveCatalogHandler}>Save</button>}
            <div className={style.categoryWrapper}>
                <ul className='list'>{catalogListElement}</ul>
            </div>
        </Container>
    );
};

export default CatalogPage;