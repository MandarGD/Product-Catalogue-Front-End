import { TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useContext, useRef } from 'react';
import {AuthContext} from '../../context/AuthContext';
import './MakeReview.css'

const MakeReview = ({pname, bname, onInsert}) => {
    const {API, user} = useContext(AuthContext);

    // const API = 'http://localhost:5000/reviews'
    const insertReview = async() => {
        let rating = ratRef.current.value;
        let desc = descRef.current.value;
        axios.post(API + "reviews/insert", {pname, bname,rating, desc, userID : user})
    }

    const helperInsert = () => {
        onInsert(ratRef.curremt.value, descRef.current.value)
    }

    const ratRef = useRef('');
    const descRef = useRef('');

    return ( 
        <div className='makereview'>
            <div className='rating'>
                <TextField variant='outlined' label="Rating" inputRef={ratRef}></TextField>
            </div>
            <div className='description'>
                <TextField variant='outlined' label="Description" inputRef={descRef} multiline maxRows={4}></TextField>
            </div>
            <div>
                <Button variant='contained' onClick={insertReview}>Send</Button>
            </div>
        </div>

     );
}
 
export default MakeReview;