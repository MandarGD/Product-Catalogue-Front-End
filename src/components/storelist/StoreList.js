import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AuthContext } from '../context/AuthContext';
import { Button, Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody } from '@mui/material';
import '../storelist/Storelist.css'
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    icon : {
        verticalAlign: "middle"
    }
}))

const StoreList = ({pname, bname}) => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const {API} = useContext(AuthContext)

    const classes = useStyles();

    //const API = 'http://localhost:5000/store'
    
    useEffect(() => {
        const fetchStores = () => {
            axios.post(API + "store/availableAt", {pname, bname}).then(result => {
                setStores(result.data);
                setLoading(false);
            })
        }

        fetchStores();
    }, [])

    return ( 
        <>
        <div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <ShoppingCartIcon className={classes.icon}></ShoppingCartIcon>
                                Store Name
                            </TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stores.map(c => (
                            <TableRow key={c.s_name + c.s_location} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{c.s_name}</TableCell>
                                <TableCell>{c.s_location}</TableCell>
                                <TableCell>{"$" + c.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <div>
            <Button variant='contained'>Add Store</Button>
        </div>
        </>
     );
}
 
export default StoreList;