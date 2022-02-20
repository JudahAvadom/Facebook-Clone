import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const useSignupUser = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSignupUser(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/signup`)
        }
        catch (err) {

        }
    }
    return {
        loading,
        handleSignupUser
    }
}

export default useSignupUser