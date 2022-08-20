import React, { useContext } from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../layout/auth/Login';
import SignUp from '../layout/auth/Signup';
import Home from '../layout/home/Home';
import AddProduct from '../layout/insert-products/AddProduct';
import ProductInfo from '../layout/productinfo/ProductInfo';

const LayoutRouter = () => {
    const {user} = useContext(AuthContext);
    return ( 
        <>
            <Routes>
                <Route exact path='/' element={user? <Navigate to="/app/layout/home"></Navigate> : <Navigate to="/app/layout/auth/login"/>}></Route>
                <Route exact path='/app/layout/home' element={<Home></Home>} />
                <Route exact path='/app/layout/productinfo' element={<ProductInfo></ProductInfo>} />
                <Route exact path='/app/layout/addproduct' element={<AddProduct></AddProduct>} />
                <Route exact path='/app/layout/auth/login' element={<Login></Login>}/>
                <Route exact path='/app/layout/auth/signup' element={<SignUp></SignUp>}/>
            </Routes>
        </>
     );
}
 
export default LayoutRouter;