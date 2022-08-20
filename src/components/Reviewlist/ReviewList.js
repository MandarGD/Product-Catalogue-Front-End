import { Card, CardContent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ReviewList = ({pname, bname}) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const API = 'http://localhost:5000/reviews'

    useEffect(() => {
        const fetchReviews = async () => {
            axios.post(API, {pname, bname}).then(result => {
                setReviews(result.data.results)
                setLoading(false);
            })
        }

        fetchReviews();

    }, [])


    return ( 
        <div>
            {reviews.map(c => (
                <Card key={c.rating + c.rev_description + c.user_id}>
                    <CardContent>
                    Rating : {c.rating + "/10"}
                    <br/>
                    Description :{c.rev_description}
                    <br/>
                    uploaded by : {c.user_id}
                
                    </CardContent>
                </Card>
            ))}
        </div>
     );
}
 
export default ReviewList;