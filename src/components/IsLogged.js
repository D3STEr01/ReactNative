import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const NaoLogado = () => {
    const { currentUser } = useContext(AuthContext)
    console.log("testando")
    
    return (
        currentUser ? <Navigate to='/Home'/> : ""
    )
}

export const Logado = () => {
    const { currentUser } = useContext(AuthContext)
    console.log("testando")
    console.log(currentUser)
    return (
        currentUser ? "" : <Navigate to='/'/>
    )
}