import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ReviewList from '../../Reviewlist/ReviewList';
import StoreList from '../../storelist/StoreList';
import MakeReview from '../insert-review/MakeReview';
import './ProductInfo.css';

const ProductInfo = () => {
    const location = useLocation();
    const [categories, setCat] = useState([])
    const [reviews, setReviews] = useState(false)
    const {API, user} = useContext(AuthContext);

    const mock = {
        pname : location.state.pname,
        bname : location.state.bname,
    }

    const insertReview = async(rating, desc) => {
        axios.post(API + "reviews/insert", {pname : mock.pname, bname : mock.bname,rating, desc, userID : user})
        setReviews(true)
    }


    useEffect(() => {
        const getCategories = () => {
            axios.post(API + "products/getByInfo", {pname : mock.pname, bname : mock.bname}).then(result => {
                setCat(result.data);
            })
        }

        getCategories();
    }, [])
    
    return ( 
        <div>
            <h1>
                Product Name: {mock.pname}
            </h1>

            <h2>
                Brand Name: {mock.bname}
            </h2>
            <div className='categories'>
            <h2>Categories: </h2>
            {categories.map(c => (
                <h2 key={c.cat_name}>{c.cat_name},</h2>
            ))}

            </div>

            <div className='storelist'>
                <StoreList pname={mock.pname} bname={mock.bname}></StoreList>
            </div>
            <h3>
                Write a Review
            </h3>
            <div className='makeReview'>
                
                <MakeReview pname={mock.pname} bname={mock.bname}></MakeReview>
            </div>
            <div className='reviewlist'>
                <h3>
                    Product Reviews
                </h3>
                <ReviewList pname={mock.pname} bname={mock.bname}></ReviewList>
            </div>
        </div>
     );
}
 
export default ProductInfo;