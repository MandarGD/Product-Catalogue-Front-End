
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LayoutRouter from './components/router/LayoutRouter';
import { useContext, useEffect, useState } from 'react';
import Home from './components/layout/home/Home';
import ProductInfo from './components/layout/productinfo/ProductInfo';
import { AuthContext } from './components/context/AuthContext';
import Login from './components/layout/auth/Login';
import { Tab, Tabs } from '@mui/material';

function App() {

  const {user} = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("loaded")
  }, [])

  return (
    <div className="App">
     {user? ( <Tabs value={value} onChange={handleChange}>
        <Tab onClick={() => navigate('/app/layout/home')} label="Products">Products</Tab>
        <Tab onClick={() => navigate('/app/layout/addproduct')} label="Add Product"></Tab>
      </Tabs>) : null}
      <LayoutRouter></LayoutRouter>
      
    </div>
  );
}

export default App;
