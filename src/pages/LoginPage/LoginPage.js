import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import Container from '../../components/Container/Container';

const LoginPage = () => {
    const userObj = { email: '', password: '' }
    const [user, setUser] = useState(userObj);
    const [userData, setUserData] = useState(null);
    const [loged, setLoged] = useState(false);

    const navigate = useNavigate();

    const inputHandler = e => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }))
    };

    const loginSubmitHandler = e => {
        e.preventDefault()
        axios.get(`${API_URL}/users?q=${user.email}&_expand=level`)
            .then(res => {
                const {email, password} = res.data[0];
                if (res.data[0]) {
                    if (user.password === password && user.email === email) {
                        setLoged(true)
                        setUserData(res.data[0])
                    } else  if (user.email === email) {
                        console.log('wrong password')
                        setLoged(false)
                    } else {
                        console.log('wrong email')
                        setLoged(false)
                    }
                }
            })
            .catch(err => console.log(err.message))
    };

    if (loged) {
        localStorage.setItem('loged', loged)
        localStorage.setItem('userLevel', JSON.stringify(userData))
        navigate('/dashboard')
    }

    return (
        <Container>
            <form onSubmit={loginSubmitHandler}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={user.email} onChange={inputHandler} />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={user.password} onChange={inputHandler} />
                </div>
                <button type='submit'>Login</button>
            </form>
        </Container>
    );
};

export default LoginPage;