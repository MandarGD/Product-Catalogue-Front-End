import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState("");
    const API = 'http://localhost:5000/';
    const navigate = useNavigate();

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            API,
            login : async (userID, password) => {
                axios.post(`${API}auth/login`, {userID, password}).then(result => {
                    if(result.data){
                        setUser(userID)
                        navigate('/app/layout/home')
                    }
                })
            },
            signup : async (userID, password) => {
                axios.post(`${API}auth/signup`, {userID, password}).then(result => {
                    if(result.data.auth){
                        setUser(userID)
                        navigate('/app/layout/home')
                    }
                })
            }
        }}>
            {children}

        </AuthContext.Provider>
    )
}