import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';

const LocationData = ({ id }) => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/locations/${id}`)
            .then(res => setLocation(res.data))
            .catch(err => toast.error(err.message))
    }, [id])

    if (!location) {
        return null;
    }

    return (
        <div>{location.line}-{location.sector}-{location.level}</div>
    );
};

export default LocationData;