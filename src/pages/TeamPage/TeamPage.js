import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';
import style from './TeamPage.module.scss';

const TeamPage = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/users?_expand=level`)
            .then(res => setUsers(res.data))
            .catch(err => toast.error(err.message))
    }, [])

    if (!users) {
        return null;
    }

    const usersListElement = users.map(user => {
        return (
            <li key={user.id}>
                <Link className='link' to={`/user/${user.id}`}>
                    <div className={style.userCase}>
                        <span>{user.name} {user.surname}</span>
                        <span className={style.userRole}>{user.level.role}</span>
                    </div>
                </Link>
            </li>
        );
    });

    return (
        <Container>
            <div className={style.teamWrapper}>
                <ul className={`list ${style.teamList}`}>{usersListElement}</ul>
            </div>
        </Container>
    );
};

export default TeamPage;