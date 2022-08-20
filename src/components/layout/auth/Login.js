import { Button, TextField } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './auth.css';

const Login = () => {
    const {login} = useContext(AuthContext);
    const userRef= useRef('');
    const pasRef = useRef('');

    const onLogin = () => {
        let userID = userRef.current.value;
        let pass = pasRef.current.value;

        login(userID, pass);
    }
    return ( 
        <>
            <div className='username'>
                <TextField variant='outlined' label="username" inputRef={userRef}></TextField>
            </div>
            <div className='password'>
                <TextField variant='outlined' label="password" type={'password'} inputRef={pasRef}></TextField>
            </div>
            <div>
                <Button variant='contained' onClick={onLogin}>Login</Button>
            </div>

            <div>
                <Link to={'/app/layout/auth/signup'}>Click here to register</Link>
            </div>

        </>
     );
}
 
export default Login;