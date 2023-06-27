import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';

const SignInForm = ({ show, onCloseModal, data }) => {
    const userObj = {
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        passwordRepeat: '',
        levelId: 3
    };

    const [newUser, setNewUser] = useState(userObj);
    const [levels, setLevels] = useState(null);

    useEffect(() => {
        if (data) {
            setNewUser(data)
        }
        axios.get(`${API_URL}/levels`)
            .then(res => setLevels(res.data))
            .catch(err => toast.error(err.message))
    }, [data, show])

    if (!levels) {
        return null;
    }

    const manageUserHandler = e => {
        e.preventDefault()
        if (data) {
            axios.patch(`${API_URL}/users/${newUser.id}`, (newUser))
                .then(res => toast.success(`User ${newUser.name} is updated ${res.statusText}`))
                .catch(err => toast.error(err.message))
            closeModalHandler()
        } else {
            axios.get(`${API_URL}/users?q=${newUser.email}`)
                .then(res => {
                    if (res.data.length === 0 || res.data[0].email !== newUser.email) {
                        if (newUser.password === newUser.passwordRepeat) {
                            delete newUser.passwordRepeat
                            axios.post(`${API_URL}/users`, newUser)
                                .then(res => toast.success(`User ${newUser.name} is ${res.statusText}`))
                                .catch(err => toast.error(err.message))
                            closeModalHandler()
                        } else {
                            toast.error('not much password')
                        }
                    } else {
                        toast.error('User has')
                    }
                })
                .catch(err => toast.error(err.message))
        }
    };

    const inputsHandler = e => {
        const { value, name } = e.target;
        if (name === 'levelId') {
            setNewUser(prevState => ({ ...prevState, [name]: Number(value) }))
        } else {
            setNewUser(prevState => ({ ...prevState, [name]: value }))
        }
    };

    const closeModalHandler = () => {
        onCloseModal()
        setNewUser(userObj)
    };

    const passwordElement = data
        ? null
        : (
            <>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password-sign-in' name='password' value={newUser.password} onChange={inputsHandler} />
                </div>
                <div className='form-control'>
                    <label htmlFor='password-repeat'>Repeat Password</label>
                    <input type='password' id='password-repeat' name='passwordRepeat' value={newUser.passwordRepeat} onChange={inputsHandler} />
                </div>
            </>
        );

    const levelsOptionElement = levels.map(level => {
        return (
            <option key={level.id} value={level.id}>{level.role}</option>
        )
    });

    const levelSeletElement = data
        ? (
            <>
                <div className='form-control'>
                    <label htmlFor='levelId'>Role</label>
                    <select type='levelId' id='levelId' name='levelId' value={newUser.levelId} onChange={inputsHandler}>
                        {levelsOptionElement}
                    </select>
                </div>
            </>
        )
        : null;

    return (
        <dialog className='form-modal' open={show}>
            <h2>{data ? 'Edit User' : 'Sign In'}</h2>
            <form>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' value={newUser.name} onChange={inputsHandler} />
                </div>
                <div className='form-control'>
                    <label htmlFor='surname'>Surname</label>
                    <input id='surname' name='surname' value={newUser.surname} onChange={inputsHandler} />
                </div>
                <div className='form-control'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='tel' id='phone' name='phone' value={newUser.phone} onChange={inputsHandler} />
                </div>
                <div className='form-control'>
                    <label htmlFor='email-sign-in'>Email</label>
                    <input type='email' id='email-sign-in' name='email' value={newUser.email} onChange={inputsHandler} />
                </div>
                {levelSeletElement}
                {passwordElement}
                <button className='btn' type='submit' onClick={manageUserHandler}>{data ? 'Save' : 'Sign In'}</button>
            </form>
            <button className='btn' onClick={closeModalHandler}>Close</button>
        </dialog>
    );
};

export default SignInForm;
