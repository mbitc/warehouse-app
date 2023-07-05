import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL, ROOT_PATH } from '../../config';
import Container from '../../components/Container/Container';
import SignInForm from '../../components/SignInForm/SignInForm';
import style from './LoginPage.module.scss';

const LoginPage = () => {
    const userObj = { email: '', password: '' }
    const [user, setUser] = useState(userObj);
    const [userData, setUserData] = useState(null);
    const [loged, setLoged] = useState(false);
    const [modal, setModal] = useState(false);
    localStorage.clear()

    const navigate = useNavigate();

    useEffect(() => {
        if (loged) {
            localStorage.setItem('loged', loged)
            localStorage.setItem('userLevel', JSON.stringify(userData))
            navigate(`${ROOT_PATH}dashboard`)
        }
    }, [loged, navigate, userData])

    const inputHandler = e => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }))
    };

    const loginSubmitHandler = e => {
        e.preventDefault()
        axios.get(`${API_URL}/users?q=${user.email}&_expand=level`)
            .then(res => {
                if (res.data[0]) {
                    const { email, password } = res.data[0];
                    if (user.password === password && user.email === email) {
                        setLoged(true)
                        setUserData(res.data[0])
                    } else if (user.email === email) {
                        toast.error('wrong password')
                        setLoged(false)
                    } else {
                        toast.error('wrong email')
                        setLoged(false)
                    }
                }
            })
            .catch(err => console.log(err.message))
    };

    const signInFormHandler = () => setModal(true);
    const closeModalHandler = () => setModal(false);

    return (
        <Container>
            <div className={style.formContainer}>
                <div>
                    <form onSubmit={loginSubmitHandler}>
                        <div className='form-control'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email' value={user.email} onChange={inputHandler} />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' name='password' suggested='current-password' autoComplete='password' value={user.password} onChange={inputHandler} />
                        </div>
                        <button className='btn' type='submit'>Login</button>
                    </form>
                    <div>
                        <input className={style.signInBtn} type='button' value='Sign in' onClick={signInFormHandler} />
                    </div>
                </div>
            </div>
            <SignInForm show={modal} onCloseModal={closeModalHandler} />
        </Container>
    );
};

export default LoginPage;