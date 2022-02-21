import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { UIContext, UserContext } from '../../../App';
import { fetchCurrentUser } from '../../../services/AuthService';

const useSignupUser = () => {
    const { uiDispatch } = useContext(UIContext)
    const { userDispatch } = useContext(UserContext)
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [initialState, setInitialState] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleNameChange = (e) => {
        setError({ ...error, name: '' })
        setInitialState({ ...initialState, name: e.target.value })
    }
    const handleEmailChange = (e) => {
        setError({ ...error, email: '' })
        setInitialState({ ...initialState, email: e.target.value })
    }
    const handlePasswordChange = (e) => {
        setInitialState({ ...initialState, password: e.target.value })
        setError({ ...error, password: '' })
    }
    async function handleSignupUser(e){
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/signup`, initialState)
            localStorage.setItem('token', JSON.stringify(data.data.token))
            const me = await fetchCurrentUser()
            console.log(me);
            setLoading(false)
            userDispatch({ type: 'SET_CURRENT_USER', payload: me.data.user })
            uiDispatch({
                type: 'SET_MESSAGE',
                payload: { color: 'success', display: true, text: data.message },
            })
            navigate('/home')
        }
        catch (err) {
            setLoading(false)
            console.log(err)
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
    }}
    return { loading, error, handleSignupUser, handleNameChange, handleEmailChange, handlePasswordChange}
}

export default useSignupUser;