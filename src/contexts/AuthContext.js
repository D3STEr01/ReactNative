import { createContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=> {
    const [currentUser, setCurrentUser] = useState(JSON.parse(parseInt(AsyncStorage.getItem('user')) || null))

    const login = async (inputs) => {
        const res = await axios.post("/api/login", inputs)
        const userData = res.data;
        
        if (userData.use_lastDesktop !== null) {
            const use_id = userData.use_id
            const des_id = userData.use_lastDesktop
            const res = await axios.get(`/api/Home/${use_id}/${des_id}`)
            const uda_id = res.data[0].uda_id
            const per_id = res.data[0].per_id
            const newUserData = { ...userData, uda_id: uda_id, per_id: per_id }
            await setCurrentUser(newUserData)
        } else {
            await setCurrentUser(userData)
        }
    }

    const logout = async (inputs) => {
        await axios.post("/api/logout")
        await setCurrentUser(null)
    }

    const handleDesktop = async (inputs) => {
        const use_id = currentUser?.use_id
        const des_id = inputs

        let newUserData

        if (des_id) {
            const res = await axios.get(`/api/desktop/${use_id}/${des_id}`)
            const uda_id = res.data[0].uda_id
            const per_id = res.data[0].per_id
            newUserData = { ...currentUser, use_lastDesktop: des_id, uda_id: uda_id, per_id: per_id}
        } else {
            newUserData = {...currentUser, use_lastDesktop: null, uda_id: null, per_id: null}
        }
        await setCurrentUser(() => newUserData)
    }

    const checkUserPermission = async (inputs) => {
        const use_id = currentUser?.use_id
        const des_id = inputs

        try {
            const res = await axios.get(`/api/desktop/${use_id}/${des_id}`)
            const data = res.data

            if (data === null || data.length === 0 || !data.length) {
            console.log("Usuário não autorizado a acessar a página.")
            return false
            } else {
            console.log("Usuário autorizado a acessar a página.")
            return true
            }
        } catch (err) {
            return false
        }
        
      }

    useEffect(() => {
      AsyncStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser, checkUserPermission, handleDesktop }}>{children}</AuthContext.Provider>
    )
}