import { Button, Card, CardContent, TextField, Typography, CardActions } from '@mui/material';
import {makeStyles} from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import './Home.css';
import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'

const useStyles = makeStyles((theme) =>({
    searchbar : {
        height: "56px"
    },
    searchButton : {
        height : "56px",
    }
})) 


const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setloading] = useState(true);
    const {user, API} = useContext(AuthContext);

    const navigate = useNavigate();
    //const API = 'http://localhost:5000/products'

    useEffect(() => {
        console.log("here");
        const fetchProducts = async() => {
            axios.get(`${API}products`).then(result => {
                setProducts(result.data.results);
                console.log(result);
                setloading(false);
            })
        }


        if(products.length === 0) {
            fetchProducts();
        }
        // if(query !== ""){
        //     fetchSearch();
        // }
        
    }, []);

    const classes = useStyles();
    const valueRef = useRef('');
    const brandRef = useRef('');
    const catRef = useRef('');
    //const ratRef = useRef('');

    const navProdInfo = (pname, bname) => {
        navigate('/app/layout/productinfo', {state:{pname, bname}, replace:false})
    }

    // const searchByName = async(e) => {
        
    //     axios.get(API + '/getbyname/' + e.target.value).then(result => {
    //         setProducts(result.data.results);
    //     })
    // }

    // const setSearch = () => {
    //    setQuery(valueRef.current.value);
    //    setloading(true);
    // }

    const fetchSearch = async() => {
        let pname = valueRef.current.value;
        let bname = brandRef.current.value;
        let rating = "";
        let catname = catRef.current.value;


        if(pname ==="" && bname ==="" && rating === "" && catname === ""){
            axios.get(API + "products").then(result => {
                setProducts(result.data.results);
                console.log(result);
                setloading(false);
            })
        }
        else{
            axios.post(`${API}products/getbyname`, {pname, bname, rating, catname}).then(result => {
                console.log(result.data)
                setProducts(result.data);
                setloading(false);
            })
        }   
        
    }
    
    if(loading){
        return (
            <div>
                LOADDING
            </div>
        )
    }

    return ( 

        <div className='products'>
            <div className='searchBar'>
                <TextField variant='outlined' label='Product Name' size='large' className={classes.searchbar} inputRef={valueRef}/>
                <TextField variant='outlined' label='Brand Name' size='large' className={classes.searchbar} inputRef={brandRef}/>
                <TextField variant='outlined' label='Category' size='large' className={classes.searchbar} inputRef={catRef}/>
                <div className='searchB'>
                    <Button variant="contained" startIcon={<SearchIcon />} className={classes.searchButton} onClick={fetchSearch}>
                        Search
                    </Button>
                </div>
            </div>

            <div className='product-list'>
                {products.length == 0? (<div>No Matches</div>) : products.map((x) => (
                    <Card key={x.prod_name + x.brand_name} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {x.brand_name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {x.prod_name}
                            </Typography>
                            <Typography variant="body2">
                                {x.prod_description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size='small' onClick={() => navProdInfo(x.prod_name, x.brand_name)}>See Reviews</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
     );
}
 
export default Home;
