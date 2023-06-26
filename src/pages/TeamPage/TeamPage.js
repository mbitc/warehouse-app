import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';
import { Link } from 'react-router-dom';

const TeamPage = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/users?_expand=level`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err.message))
    }, [])

    if (!users) {
        return null;
    }

    const usersListElement = users.map(user => {
        return (
            <li key={user.id}>
                <Link className='link' to={`/user/${user.id}`}>
                    <div className='test'>
                    <span>{user.name} {user.surname}</span>
                    <span>{user.level.role}</span>
                    </div>
                </Link>
            </li>
        );
    });

    return (
        <Container>
            <ul className='list'>{usersListElement}</ul>
        </Container>
    );
};

export default TeamPage;