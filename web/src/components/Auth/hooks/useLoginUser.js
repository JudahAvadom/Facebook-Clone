import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from '../../../services/AuthService';
import { UserContext, UIContext } from '../../../App'

const useLoginUser = (userData = null) => {
    const { uiDispatch } = useContext(UIContext)
    const { userDispatch } = useContext(UserContext)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [initialState, setInitialState] = useState({
        email: '',
        password: '',
    });
    useEffect(() => {
        setInitialState({ ...initialState, email: userData ? userData.email : '' })
        return () => {}
    }, [])
    const handleEmailChange = (e) => {
        setInitialState({ ...initialState, email: e.target.value })
        setError({ ...error, email: '' })
    }
    const handlePasswordChange = (e) => {
        setInitialState({ ...initialState, password: e.target.value })
        setError({ ...error, password: '' })
    }
    async function handleLoginUser(e) {
        e.preventDefault()
        console.log("hola");
        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/login`, initialState)
            localStorage.setItem('token', JSON.stringify(data.data.token))
            const me = await fetchCurrentUser()
            setLoading(false);
            userDispatch({ type: 'SET_CURRENT_USER', payload: me.data.user });
            uiDispatch({
                type: 'SET_MESSAGE',
                payload: { color: 'success', display: true, text: data.message },
            });
            navigate('/home')
        } 
        catch (err) {
            setLoading(false);
            console.log(err);
            if (err && err.response) {
                if (err.response.status === 422) {
                    setError({ ...err.response.data.error })
                }
                if (err.response.status === 400) {
                    uiDispatch({
                        type: 'SET_MESSAGE',
                            payload: {
                            color: 'error',
                            display: true,
                            text: err.response.data.error,
                        },
                    })
                }
            }
        }
    }
    return {
        loading,
        error,
        handleEmailChange,
        handlePasswordChange,
        handleLoginUser
    }
}

export default useLoginUser