import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useContext, useRef } from 'react';
import {AuthContext} from '../../context/AuthContext';
import './AddProduct.css';

const useStyles = makeStyles((theme) => ({
    button : {
        height : "56px"
    }
}))

const AddProduct = () => {
    const prodRef = useRef('');
    const brandRef = useRef('');
    const catRef = useRef('');
    const descRef = useRef('');

    const {API, user} = useContext(AuthContext);

    //const API = 'http://localhost:5000/products';

    const classes = useStyles();

    const insertProduct = async () => {
        let pname = prodRef.current.value;
        let bname = brandRef.current.value;
        let categories = catRef.current.value;
        let desc = descRef.current.value;

        categories = categories.split(",");
        console.log(categories);

        axios.post(API + "products/insert", {pname, bname, desc ,categories, userID : user})
    }

    return ( 
        <>
            <div>
                <div className='textbox'>
                    <TextField variant='outlined' label='Product Name' inputRef={prodRef}></TextField>
                </div>
                <div className='textbox'>
                    <TextField variant='outlined' label='Brand Name' inputRef={brandRef}></TextField>
                </div>
                <div className='textbox'>
                    <TextField variant='outlined' label='Categories' inputRef={catRef}></TextField>
                </div>

                <div className='textbox'>
                    <TextField variant='outlined' label='Description' inputRef={descRef}></TextField>
                </div>
                
                
                
                <Button variant='contained' className={classes.button} onClick={insertProduct}>Add Product</Button>
            </div>
        </>
     );
}
 
export default AddProduct;