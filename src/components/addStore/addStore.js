import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';

const AddStore = ({pname, bname}) => {
    const {API} = useContext(AuthContext);
    const snameRef = useRef('');
    const slocationRef = useRef('');
    const typeRef = useRef('');

    const addStore = () => {
        let sname = snameRef.current.value;
        let slocation = slocationRef.current.value;
        let price = typeRef.current.value;
        axios.post(`${API}stores/insert`, {sname, slocation, pname, bname, price});
    }


    return ( 
        <div>
            <TextField variant='outlined' inputRef={snameRef} label="Store Name"></TextField>
            <TextField variant='outlined' inputRef={slocationRef} label="Store location"></TextField>
            <TextField variant='outlined' inputRef={typeRef} label="Price"></TextField>
            <Button variant='contained' onClick={addStore}>Add</Button>
        </div>
     );
}
 
export default AddStore;