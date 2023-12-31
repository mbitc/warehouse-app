import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL, ROOT_PATH } from '../../config';
import Container from '../../components/Container/Container';
import SignInForm from '../../components/SignInForm/SignInForm';
import style from './UserPage.module.scss';

const UserPage = () => {
    const { id } = useParams();
    const navigation = useNavigate();
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/users/${id}?_expand=level`)
            .then(res => setUser(res.data))
            .catch(err => toast.error(err.message))
    }, [id, modal])

    if (!user) {
        return null;
    }

    const deleteUserHandler = () => {
        axios.delete(`${API_URL}/users/${id}`)
            .then(res => {
                toast.info(`User ${user.name} ${user.surname} is deleted ${res.statusText}`)
                navigation(`${ROOT_PATH}team`)
            })
            .catch(err => toast.error(err.message))
    };

    const editUserHandler = () => setModal(true);
    const closeModalHandler = () => setModal(false);

    const { name, surname, phone, email } = user;

    return (
        <Container>
            <div className={style.userWrapper}>
                <div className={style.userCase}>
                    <h2 className={style.userCaseTitle}>{name} {surname}</h2>
                    <span><a className='link' href={`tel://${phone}`}>{phone}</a></span>
                    <span><a className='link' href={`mailto://${phone}`}>{email}</a></span>
                    <span className={style.userCaseRole}>{user.level.role}</span>
                    <div className={style.useCaseBtn}>
                        <button className='edit' onClick={editUserHandler} />
                        <button className='delete' onClick={deleteUserHandler} />
                    </div>
                </div>
            </div>
            <SignInForm show={modal} data={user} onCloseModal={closeModalHandler} />
        </Container>
    );
};

export default UserPage;