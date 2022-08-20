import { Button, TextField } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './auth.css';

const SignUp = () => {
    const {signup} = useContext(AuthContext);
    
    const userRef= useRef('');
    const pasRef = useRef('');

    const onSignUp = () => {
        let userID = userRef.current.value;
        let pass = pasRef.current.value;

        signup(userID, pass);
    }
    return ( 
        <>
            <div className='username'>
                <TextField variant='outlined' label="username" inputRef={userRef}></TextField>
            </div>
            <div className='password'>
                <TextField variant='outlined' label="password" inputRef={pasRef}></TextField>
            </div>
            <div>
                <Button variant='contained' onClick={onSignUp}>Sign Up</Button>
            </div>

        </>
     );
}
 
export default SignUp;