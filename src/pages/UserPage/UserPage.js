import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';
import SignInForm from '../../components/SignInForm/SignInForm';

const UserPage = () => {
    const { id } = useParams();
    const navigation = useNavigate();
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/users/${id}?_expand=level`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err.message))
    }, [id, modal ])

    if (!user) {
        return null;
    }

    const deleteUserHandler = () => {
        axios.delete(`${API_URL}/users/${id}`)
            .then(() => navigation('/team'))
            .catch(err => console.log(err.message))
    };

    const editUserHandler = () => setModal(true);
    const closeModalHandler = () => setModal(false);

    const { name, surname, phone, email } = user;

    return (
        <Container>
            <div>
                <h2>{name} {surname}</h2>
                <span>{phone}</span>
                <span>{email}</span>
                <span>{user.level.role}</span>
                <button onClick={editUserHandler}>Edit</button>
                <button onClick={deleteUserHandler}>Delete</button>
            </div>
            <SignInForm show={modal} data={user} onCloseModal={closeModalHandler}/>
        </Container>
    );
};

export default UserPage;