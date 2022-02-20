import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const useSignupUser = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [initialState, setInitialState] = useState({
        name: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate()
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
    async function handleSignupUser(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/signup`, initialState)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err && err.response) {
                if (err.response.status === 422) {
                    setError({ ...err.response.data.error })
                }
            }
        }
    }
    return {
        loading,
        error,
        handleSignupUser,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange
    }
}

export default useSignupUser