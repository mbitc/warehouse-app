import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Container from '../../components/Container/Container'
import { API_URL } from '../../config';
import style from './LocationPage.module.scss';

const LocationPage = () => {
    const placeObj = { line: '', sector: '', level: '' };
    const storageObj = { locationId: '', productId: '', qty: '' };
    const [location, setLocation] = useState(null);
    const [products, setProducts] = useState(null);
    const [place, setPlace] = useState(placeObj);
    const [addLocationInput, setAddLocationInput] = useState(false);
    const [editLocationInput, setEditLocationInput] = useState(false);
    const [addItemsInput, setAddItemsInput] = useState(false);
    const [storage, setStorage] = useState(storageObj);

    useEffect(() => {
        axios.get(`${API_URL}/locations?_embed=storages`)
            .then(res => setLocation(res.data))
            .catch(err => toast.error(err.message))
    }, [place])

    useEffect(() => {
        axios.get(`${API_URL}/products`)
            .then(res => setProducts(res.data))
            .catch(err => toast.error(err.message))
    }, [])

    if (!location || !products) {
        return null;
    }

    const inputLocationHandler = e => {
        const { name, value } = e.target;
        if (name === 'sector' || name === 'level') {
            setPlace(prevState => ({ ...prevState, [name]: Number(value) }))
        } else {
            setPlace(prevState => ({ ...prevState, [name]: value }))
        }
    };

    const inputLocationElement = addLocationInput || editLocationInput ?
        <div>
            <div className='form-control'>
                <label htmlFor='line'>Location Line</label>
                <input type='text' id='line' name='line' value={place.line} onChange={inputLocationHandler} />
            </div>
            <div className='form-control'>
                <label htmlFor='sector'>Location Sector</label>
                <input type='number' id='sector' name='sector' value={place.sector} onChange={inputLocationHandler} />
            </div>
            <div className='form-control'>
                <label htmlFor='level'>Location Level</label>
                <input type='number' id='level' name='level' value={place.level} onChange={inputLocationHandler} />
            </div>
        </div>
        : null;

    const locationOptionsElement = location.map(place => {
        return (
            <option key={place.id} value={place.id}>{place.line}-{place.sector}-{place.level}</option>
        )
    });

    const productsOptionsElement = products.map(product => {
        return (
            <option key={product.id} value={product.id}>{product.name}: {product.qty}</option>
        )
    });

    const inputProductsHandler = e => {
        const { name, value } = e.target;
        setStorage(prevState => ({ ...prevState, [name]: Number(value), }))
    };

    const inputStackingElement = addItemsInput ?
        <div>
            <div className='form-control'>
                <label htmlFor='locationId'>Location</label>
                <select type='number' id='locationId' name='locationId' value={storage.locationId} onChange={inputProductsHandler}>
                    <option value='' disabled>select location</option>
                    {locationOptionsElement}
                </select>
            </div>
            <div className='form-control'>
                <label htmlFor='productId'>Items</label>
                <select type='number' id='productId' name='productId' value={storage.productId} onChange={inputProductsHandler}>
                    <option value='' disabled>select product</option>
                    {productsOptionsElement}
                </select>
            </div>
            <div className='form-control'>
                <label htmlFor='qty'>Qty</label>
                <input type='number' id='qty' name='qty' value={storage.qty} onChange={inputProductsHandler} />
            </div>
        </div>
        : null;

    const locationListElement = location.map(place => {
        return (
            <li key={place.id} className={style.locationList}>
                <button className='delete' onClick={() => deleteLocationHandler(place.id)} />
                <button className='edit' onClick={() => editLocationHandler(place.id)} />
                <span>{place.line}-{place.sector}-{place.level}</span>
            </li>
        )
    });

    const createLocationHandler = () => {
        if (addLocationInput) {
            axios.post(`${API_URL}/locations`, place)
                .then(res => {
                    setLocation(prevState => [...prevState, res.data])
                    toast.success(`Location ${place.line}-${place.sector}-${place.level} is ${res.statusText} `)
                })
                .catch(err => toast.error(err.message))
                setAddLocationInput(false)
                setPlace(placeObj)
            } else {
                setAddLocationInput(true)
            }
        };
        
        const editLocationHandler = id => {
            axios.get(`${API_URL}/locations/${id}`)
            .then(res => {
                setPlace(prevState => ({ ...prevState, ...res.data }))
                setEditLocationInput(true)
            })
            .catch(err => toast.error(err.message))
        };
        
        const saveLocationHandler = () => {
            axios.patch(`${API_URL}/locations/${place.id}`, place)
            .then(res => {
                toast.success(`Location ${place.line}-${place.sector}-${place.level} is ${res.statusText} `)
                setEditLocationInput(false)
                setAddLocationInput(false)
                setPlace(placeObj)
            })
            .catch(err => toast.error(err.message))
        };
        
        const deleteLocationHandler = id => {
            axios.delete(`${API_URL}/locations/${id}`)
            .then(res => {
                const locationIndex = location.findIndex(place => place.id === Number(id));
                setLocation(prevState => prevState.toSpliced(locationIndex, 1))
                toast.info(`Location ${place.line}-${place.sector}-${place.level} is deleted ${res.statusText} `)
                setAddLocationInput(false)
                setEditLocationInput(false)
            })
            .catch(err => console.log(err.message))
    };

    const stackingItemsHandler = () => {
        if (addItemsInput) {
            axios.post(`${API_URL}/storages`, storage)
            .then(res => toast.success(`Items stakcking is ${res.statusText} `))
                .catch(err => toast.error(err.message))
            setAddItemsInput(false)
            setStorage(storageObj)
        } else {
            setAddItemsInput(true)
        }
    };

    return (
        <Container>
            {inputStackingElement}
            {inputLocationElement}
            {!editLocationInput && <button className='btn long' onClick={createLocationHandler}>{addLocationInput ? 'Add' : 'Create Location'}</button>}
            {editLocationInput && <button className='btn long' onClick={saveLocationHandler}>Save</button>}
            <button className='btn long' onClick={stackingItemsHandler}>{addItemsInput ? 'Stacking' : 'Stack Items'}</button>
            <div className={style.locationListWrapper}>
                <ul className='list'>{locationListElement}</ul>
            </div>
        </Container>
    );
};

export default LocationPage;